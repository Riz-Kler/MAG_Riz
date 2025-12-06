variable "aws_region" {}
variable "name" {}
variable "vpc_cidr" {}

# TODO: call modules here (vpc, alb, ecs-service, rds, iam)

terraform {
  required_version = ">= 1.6.0"
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source = "../../modules/vpc"

  name            = "mag-riz-dev"
  cidr            = var.vpc_cidr
  azs             = var.azs
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets
  tags            = { env = "dev" }
}

module "alb" {
  source = "../../modules/alb"

  name              = "mag-riz-dev"
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  sg_id             = var.alb_sg_id          # or create SG in this file
  target_port       = 80
  acm_cert_arn      = var.acm_cert_arn

  oidc_authorization_endpoint = var.oidc_auth_endpoint
  oidc_token_endpoint         = var.oidc_token_endpoint
  oidc_user_info_endpoint     = var.oidc_userinfo_endpoint
  oidc_client_id              = var.oidc_client_id
  oidc_client_secret          = var.oidc_client_secret
  oidc_issuer                 = var.oidc_issuer
}

module "ecs_checkin" {
  source = "../../modules/ecs_service"

  name              = "mag-riz-checkin-dev"
  region            = var.region
  image             = var.checkin_image
  container_port    = 80
  private_subnet_ids = module.vpc.private_subnet_ids
  sg_id             = var.ecs_sg_id
  target_group_arn  = module.alb.target_group_arn
  execution_role_arn = var.ecs_exec_role_arn
  task_role_arn      = var.ecs_task_role_arn
  log_group_name     = "/mag-riz/dev/checkin"
  cpu                = 256
  memory             = 512
  desired_count      = 1
}

module "rds" {
  source = "../../modules/rds"

  name              = "mag-riz-dev"
  private_subnet_ids = module.vpc.private_subnet_ids
  sg_id             = var.db_sg_id
  engine_version    = "15.3"
  master_username   = var.db_user
  master_password   = var.db_password
  database_name     = "mag_riz"
  kms_key_id        = var.kms_key_id
}

module "boarding_pass_s3" {
  source = "../../modules/s3_boarding_pass"

  name      = "mag-riz"
  env       = "dev"
  kms_key_id = var.kms_key_id
}
