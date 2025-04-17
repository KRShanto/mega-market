-- Enable auto-confirmation of emails in Supabase Auth
UPDATE auth.config
SET confirm_email_on_signup = false;
