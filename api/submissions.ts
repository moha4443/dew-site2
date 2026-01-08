import { neon } from '@neondatabase/serverless';

// Vercel Serverless Function to view submissions (protected)
export default async function handler(req: Request): Promise<Response> {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            {
                status: 405,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    // Simple API key protection - you should set this in Vercel Environment Variables
    const authHeader = req.headers.get('authorization');
    const apiKey = process.env.SUBMISSIONS_API_KEY;

    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    try {
        // Connect to Neon database
        const sql = neon(process.env.DATABASE_URL!);

        // Get query parameters for pagination
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '50');
        const offset = (page - 1) * limit;

        // Fetch submissions with pagination
        const submissions = await sql`
      SELECT 
        id,
        full_name,
        company,
        email,
        phone,
        message,
        newsletter_consent,
        submitted_at,
        ip_address,
        status
      FROM contact_submissions
      ORDER BY submitted_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

        // Get total count
        const countResult = await sql`
      SELECT COUNT(*) as total FROM contact_submissions
    `;
        const total = parseInt(countResult[0]?.total || '0');

        return new Response(
            JSON.stringify({
                success: true,
                data: submissions,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Error fetching submissions:', error);

        return new Response(
            JSON.stringify({
                error: 'Failed to fetch submissions',
                details: process.env.NODE_ENV === 'development' ? String(error) : undefined
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

export const config = {
    runtime: 'edge',
};
