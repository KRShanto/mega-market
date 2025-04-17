-- Let's check if there are any constraints or triggers that might be causing issues
SELECT 
  trigger_name, 
  event_manipulation, 
  action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'auth'
  AND event_object_table = 'users';

-- Let's also check if there are any RLS policies on the auth.users table
SELECT 
  pol.polname AS policy_name,
  pol.polpermissive,
  pol.polroles,
  pol.polqual,
  pol.polwithcheck
FROM pg_policy pol
JOIN pg_class cls ON pol.polrelid = cls.oid
JOIN pg_namespace ns ON cls.relnamespace = ns.oid
WHERE ns.nspname = 'auth'
  AND cls.relname = 'users';

-- Let's create a function to help with manual profile creation
CREATE OR REPLACE FUNCTION public.create_profile_manually(
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
GRANT EXECUTE ON FUNCTION public.create_profile_manually TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_profile_manually TO anon;
GRANT EXECUTE ON FUNCTION public.create_profile_manually TO service_role;

-- Let's also create a function to check if a profile exists
CREATE OR REPLACE FUNCTION public.check_profile_exists(user_id UUID)
RETURNS BOOLEAN AS $
DECLARE
  profile_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM public.profiles WHERE id = user_id) INTO profile_exists;
  RETURN profile_exists;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.check_profile_exists TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_profile_exists TO anon;
GRANT EXECUTE ON FUNCTION public.check_profile_exists TO service_role;
