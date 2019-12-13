require 'test_helper'

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get admin_users_url
    assert_response :success
  end

  test 'should get new' do
    get new_admin_user_url
    assert_response :success
  end

  test 'should get edit' do
    user = create(:user)
    get edit_admin_user_url user.id
    assert_response :success
  end
end
