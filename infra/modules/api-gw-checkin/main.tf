resource "aws_apigatewayv2_api" "http" {
  name          = "${var.name}-http-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "alb_integration" {
  api_id           = aws_apigatewayv2_api.http.id
  integration_type = "HTTP_PROXY"
  integration_uri  = var.alb_listener_arn

  connection_type = "VPC_LINK"
  connection_id   = var.vpc_link_arn

  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_route" "checkin_post" {
  api_id    = aws_apigatewayv2_api.http.id
  route_key = "POST /checkin"
  target    = "integrations/${aws_apigatewayv2_integration.alb_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http.id
  name        = "$default"
  auto_deploy = true
}
