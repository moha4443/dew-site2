# DEW Contact Form - Neon Database Setup Guide

This guide will help you set up the contact form with Neon PostgreSQL database on Vercel.

## 📋 Overview

The contact form is now configured to:
- ✅ Submit form data to a Vercel API route (`/api/contact`)
- ✅ Store submissions in Neon PostgreSQL database
- ✅ Include form validation and user feedback
- ✅ Protected submissions viewer endpoint (`/api/submissions`)

## 🚀 Setup Steps

### Step 1: Create a Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up (free tier available)
2. Create a new project (e.g., "dew-contact-form")
3. Copy the **Connection String** - it looks like:
   ```
   postgresql://username:password@ep-xyz.region.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Create the Database Table

1. In your Neon dashboard, go to **SQL Editor**
2. Copy and paste the contents of `schema.sql` from this project
3. Click **Run** to create the `contact_submissions` table

### Step 3: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your Neon connection string | Production, Preview, Development |
| `SUBMISSIONS_API_KEY` | Generate a random string (e.g., `dew-api-key-xxxx-yyyy`) | Production, Preview |

**To generate a secure API key:**
```bash
# In terminal (Mac/Linux)
openssl rand -hex 32

# Or use any password generator for a 32+ character string
```

### Step 4: Deploy to Vercel

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add contact form with Neon database integration"
   git push
   ```

2. Vercel will automatically deploy the changes

### Step 5: Test the Form

1. Visit your production site's `/contact` page
2. Submit a test enquiry
3. Check your Neon database to see the submission

## 📊 Viewing Submissions

### Option 1: Neon Dashboard (Recommended for now)
1. Go to your Neon dashboard
2. Navigate to **SQL Editor**
3. Run:
   ```sql
   SELECT * FROM contact_submissions ORDER BY submitted_at DESC;
   ```

### Option 2: API Endpoint (For external tools/dashboards)
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://your-site.vercel.app/api/submissions
```

### Option 3: Query with Pagination
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-site.vercel.app/api/submissions?page=1&limit=20"
```

## 🔧 File Structure

```
dew-site/
├── api/
│   ├── contact.ts       # Form submission endpoint
│   └── submissions.ts   # View submissions (protected)
├── schema.sql           # Database schema
├── src/
│   └── pages/
│       └── Contact.tsx  # Updated contact form
└── NEON-SETUP.md        # This file
```

## 🛡️ Security Features

- **Input Validation**: Server-side validation for all fields
- **SQL Injection Prevention**: Using parameterized queries
- **API Protection**: Submissions endpoint requires API key
- **IP Logging**: Tracks submission source for spam prevention

## 📈 Future Enhancements (Phase 2)

Once the database is stable, you can add:
- [ ] Email notifications via Resend
- [ ] Admin dashboard for viewing submissions
- [ ] Spam detection with rate limiting
- [ ] Auto-response emails to clients

## 🐛 Troubleshooting

### Form says "Submission Failed"
- Check Vercel Function Logs for errors
- Verify `DATABASE_URL` is set correctly
- Ensure the database table exists

### Can't view submissions
- Verify `SUBMISSIONS_API_KEY` is set
- Check the Authorization header format: `Bearer YOUR_KEY`

### 500 Error on Submit
- Check Neon connection string is correct
- Verify the table was created with the correct schema
- Check Vercel logs for detailed error messages

---

## 📞 Support

If you encounter any issues, check:
1. Vercel Function Logs: Project → Functions → contact → Logs
2. Neon Dashboard: Check connection status
3. Browser Console: Check for network errors

