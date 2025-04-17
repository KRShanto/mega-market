-- 1. Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- 2. Create an improved trigger function that handles user metadata
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $
DECLARE
  first_name_val TEXT;
  last_name_val TEXT;
  display_name_val TEXT;
BEGIN
  -- Extract name information from user metadata if available
  first_name_val := COALESCE(NEW.raw_user_meta_data->>'first_name', '');
  last_name_val := COALESCE(NEW.raw_user_meta_data->>'last_name', '');
  
  -- Create a display name from the available information
  IF first_name_val != '' OR last_name_val != '' THEN
    display_name_val := TRIM(first_name_val || ' ' || last_name_val);
  ELSE
    display_name_val := COALESCE(NEW.email, 'User');
  END IF;

  -- Insert the profile with the name information
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    display_name, 
    avatar_url, 
    role
  )
  VALUES (
    NEW.id, 
    first_name_val, 
    last_name_val, 
    display_name_val, 
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    'user'
  );
  
  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. Ensure RLS is disabled for now to avoid permission issues
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 5. Grant necessary permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;
