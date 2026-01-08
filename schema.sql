-- Neon PostgreSQL Schema for DEW Contact Form Submissions
-- Run this SQL in your Neon dashboard to create the table

-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    newsletter_consent BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address VARCHAR(45),
    user_agent TEXT,
    status VARCHAR(50) DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);

-- Create an index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submitted_at ON contact_submissions(submitted_at DESC);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);

-- Optional: Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Optional: Create a trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Status values you can use:
-- 'new' - Just submitted
-- 'read' - Viewed by team
-- 'contacted' - Response sent
-- 'closed' - Resolved
-- 'spam' - Marked as spam
