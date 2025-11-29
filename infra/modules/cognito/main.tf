resource "aws_cognito_user_pool" "this" {
  name = "${var.name}-user-pool"
}

resource "aws_cognito_user_pool_client" "app_client" {
  name         = "${var.name}-client"
  user_pool_id = aws_cognito_user_pool.this.id

  generate_secret                      = false
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["implicit", "code"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  supported_identity_providers         = ["COGNITO"]
  callback_urls                        = ["https://example.com/callback"] # change
  logout_urls                          = ["https://example.com/logout"]   # change
}
