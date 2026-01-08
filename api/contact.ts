import { neon } from '@neondatabase/serverless';

// Define the expected request body type
interface ContactFormData {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    newsletter: boolean;
}

// Vercel Serverless Function Handler
export default async function handler(req: Request): Promise<Response> {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            {
                status: 405,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    try {
        // Parse the request body
        const body: ContactFormData = await req.json();

        // Validate required fields
        if (!body.fullName || !body.email || !body.message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: fullName, email, and message are required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Connect to Neon database
        const sql = neon(process.env.DATABASE_URL!);

        // Insert the contact submission into the database
        const result = await sql`
      INSERT INTO contact_submissions (
        full_name,
        company,
        email,
        phone,
        message,
        newsletter_consent,
        submitted_at,
        ip_address,
        user_agent
      ) VALUES (
        ${body.fullName},
        ${body.company || null},
        ${body.email},
        ${body.phone || null},
        ${body.message},
        ${body.newsletter || false},
        NOW(),
        ${req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'},
        ${req.headers.get('user-agent') || 'unknown'}
      )
      RETURNING id, submitted_at
    `;

        // Return success response
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Your enquiry has been submitted successfully. We will get back to you soon!',
                submissionId: result[0]?.id,
                submittedAt: result[0]?.submitted_at
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Contact form submission error:', error);

        return new Response(
            JSON.stringify({
                error: 'An unexpected error occurred. Please try again later.',
                details: process.env.NODE_ENV === 'development' ? String(error) : undefined
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Vercel Edge Config (optional - for better performance)
export const config = {
    runtime: 'edge',
};
