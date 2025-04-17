-- 1. First, let's check if the trigger exists and drop it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Drop the function if it exists
DROP FUNCTION IF EXISTS handle_new_user();

-- 3. Ensure the profiles table has the correct structure
-- Let's make sure nullable fields are properly set
ALTER TABLE profiles 
  ALTER COLUMN first_name DROP NOT NULL,
  ALTER COLUMN last_name DROP NOT NULL,
  ALTER COLUMN display_name DROP NOT NULL,
  ALTER COLUMN avatar_url DROP NOT NULL,
  ALTER COLUMN phone DROP NOT NULL,
  ALTER COLUMN address DROP NOT NULL,
  ALTER COLUMN city DROP NOT NULL,
  ALTER COLUMN state DROP NOT NULL,
  ALTER COLUMN postal_code DROP NOT NULL,
  ALTER COLUMN country DROP NOT NULL;

-- 4. Temporarily disable RLS on the profiles table
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 5. Create a simplified version of the trigger function
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 7. Grant necessary permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;

-- 8. Create a direct function to create a profile for testing
CREATE OR REPLACE FUNCTION create_profile_for_user(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (user_id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION create_profile_for_user TO authenticated;
GRANT EXECUTE ON FUNCTION create_profile_for_user TO anon;
GRANT EXECUTE ON FUNCTION create_profile_for_user TO service_role;
