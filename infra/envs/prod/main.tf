######################
# VPC
######################

module "vpc" {
  source = "../../modules/vpc"

  name              = "magriz-prod"
  cidr_block        = "10.0.0.0/16"
  public_subnets    = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets   = ["10.0.11.0/24", "10.0.12.0/24"]
  availability_zones = ["eu-west-2a", "eu-west-2b"]
}

######################
# ALB
######################

module "alb" {
  source = "../../modules/alb"

  name             = "magriz-prod"
  vpc_id           = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  health_check_path = "/health"
}

######################
# ECS Service (checkin)
######################

variable "checkin_image" {
  type        = string
  description = "ECR image for checkin service"
}

module "ecs_checkin" {
  source = "../../modules/ecs-service"

  name               = "magriz-checkin-prod"
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  container_image    = var.checkin_image
  container_port     = 3000
  target_group_arn   = module.alb.target_group_arn
}

######################
# RDS
######################

variable "db_username" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}

module "rds" {
  source = "../../modules/rds"

  name              = "magriz-prod"
  vpc_id            = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  db_username       = var.db_username
  db_password       = var.db_password
}

######################
# S3 secure (boarding passes)
######################

module "s3_boarding" {
  source = "../../modules/s3-secure"

  bucket_name   = "magriz-boarding-prod" # must be globally unique
  kms_key_alias = "alias/magriz-boarding-prod"
  tags = {
    Environment = "prod"
    Project     = "magriz"
  }
}

######################
# Cognito
######################

module "cognito" {
  source = "../../modules/cognito"

  name = "magriz-prod"
}

######################
# API Gateway (checkin)
######################

resource "aws_apigatewayv2_vpc_link" "this" {
  name = "magriz-prod-vpclink"

  subnet_ids = module.vpc.private_subnet_ids

  security_group_ids = [] # optional
}

module "api_gw_checkin" {
  source = "../../modules/api-gw-checkin"

  name             = "magriz-checkin-prod"
  vpc_link_arn     = aws_apigatewayv2_vpc_link.this.arn
  alb_listener_arn = module.alb.listener_arn
}

output "checkin_api_endpoint" {
  value = module.api_gw_checkin.api_endpoint
}
