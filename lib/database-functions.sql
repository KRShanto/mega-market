-- Function to approve a seller application and create a shop
CREATE OR REPLACE FUNCTION approve_seller_application(request_id UUID, shop_slug TEXT)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
  v_shop_name TEXT;
  v_shop_description TEXT;
  v_reviewer_id UUID;
BEGIN
  -- Get the application details
  SELECT 
    user_id, 
    shop_name, 
    shop_description
  INTO 
    v_user_id, 
    v_shop_name, 
    v_shop_description
  FROM shop_join_requests
  WHERE id = request_id;
  
  -- Get the current user ID (reviewer)
  v_reviewer_id := auth.uid();
  
  -- Update the application status
  UPDATE shop_join_requests
  SET 
    status = 'approved',
    reviewed_by = v_reviewer_id,
    reviewed_at = NOW()
  WHERE id = request_id;
  
  -- Create the shop
  INSERT INTO shops (
    name,
    slug,
    description,
    owner_id,
    status
  ) VALUES (
    v_shop_name,
    shop_slug,
    v_shop_description,
    v_user_id,
    'approved'
  );
  
  -- Update the user role to shop_admin
  UPDATE profiles
  SET role = 'shop_admin'
  WHERE id = v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
