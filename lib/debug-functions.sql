-- Create a function to check if a user exists in auth.users
CREATE OR REPLACE FUNCTION check_auth_user(email_to_check TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_info JSONB;
BEGIN
  SELECT 
    jsonb_build_object(
      'exists', COUNT(*) > 0,
      'created_at', MAX(created_at),
      'confirmed_at', MAX(confirmed_at),
      'last_sign_in_at', MAX(last_sign_in_at),
      'email_confirmed', MAX(email_confirmed)
    )
  INTO user_info
  FROM auth.users
  WHERE email = email_to_check;
  
  RETURN user_info;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION check_auth_user TO authenticated;
GRANT EXECUTE ON FUNCTION check_auth_user TO anon;
GRANT EXECUTE ON FUNCTION check_auth_user TO service_role;

-- Let's also check the profiles table structure
CREATE OR REPLACE FUNCTION debug_table_info(table_name TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  table_info JSONB;
BEGIN
  SELECT 
    jsonb_build_object(
      'column_info', (
        SELECT jsonb_agg(
          jsonb_build_object(
            'column_name', column_name,
            'data_type', data_type,
            'is_nullable', is_nullable,
            'column_default', column_default
          )
        )
        FROM information_schema.columns
        WHERE table_name = debug_table_info.table_name
        AND table_schema = 'public'
      ),
      'constraints', (
        SELECT jsonb_agg(
          jsonb_build_object(
            'constraint_name', constraint_name,
            'constraint_type', constraint_type
          )
        )
        FROM information_schema.table_constraints
        WHERE table_name = debug_table_info.table_name
        AND table_schema = 'public'
      ),
      'row_count', (
        SELECT COUNT(*)
        FROM information_schema.tables
        WHERE table_name = debug_table_info.table_name
        AND table_schema = 'public'
      )
    )
  INTO table_info;
  
  RETURN table_info;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION debug_table_info TO authenticated;
GRANT EXECUTE ON FUNCTION debug_table_info TO anon;
GRANT EXECUTE ON FUNCTION debug_table_info TO service_role;
