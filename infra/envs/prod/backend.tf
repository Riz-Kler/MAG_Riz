terraform {
  backend "s3" {
    bucket         = "magriz-tf-state-prod"
    key            = "envs/prod/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "magriz-tf-locks"
    encrypt        = true
  }
}
