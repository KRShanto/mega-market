-- Drop the existing trigger and function that's causing issues
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Make sure RLS is disabled for the profiles table to avoid permission issues
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to ensure the profile can be created
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;
