-- Drop any existing triggers that might be causing issues
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create a more robust function for manual profile creation
CREATE OR REPLACE FUNCTION create_profile_manually(
  user_id UUID,
  first_name TEXT DEFAULT '',
  last_name TEXT DEFAULT '',
  display_name TEXT DEFAULT NULL,
  role TEXT DEFAULT 'user'
)
RETURNS BOOLEAN AS $
BEGIN
  -- If display_name is NULL, create one from first_name and last_name
  IF display_name IS NULL THEN
    display_name := TRIM(first_name || ' ' || last_name);
    IF display_name = '' THEN
      display_name := 'User';
    END IF;
  END IF;

  -- Insert the profile
  INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    display_name,
    role
  )
  VALUES (
    user_id,
    first_name,
    last_name,
    display_name,
    role::user_role
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error creating profile: %', SQLERRM;
  RETURN FALSE;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION create_profile_manually TO authenticated;
GRANT EXECUTE ON FUNCTION create_profile_manually TO anon;
GRANT EXECUTE ON FUNCTION create_profile_manually TO service_role;

-- Function to check if a profile exists
CREATE OR REPLACE FUNCTION check_profile_exists(user_id UUID)
RETURNS BOOLEAN AS $
DECLARE
  profile_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM public.profiles WHERE id = user_id) INTO profile_exists;
  RETURN profile_exists;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION check_profile_exists TO authenticated;
GRANT EXECUTE ON FUNCTION check_profile_exists TO anon;
GRANT EXECUTE ON FUNCTION check_profile_exists TO service_role;

-- Disable RLS on profiles table temporarily
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Create a new trigger function that's more robust
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
  BEGIN
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
    EXCEPTION WHEN OTHERS THEN
      -- Log the error but don't fail the transaction
      RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
  END;
  
  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();
