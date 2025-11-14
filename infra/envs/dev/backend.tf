terraform {
  backend "s3" {
    bucket         = "magriz-tf-state-dev"
    key            = "envs/dev/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "magriz-tf-locks"
    encrypt        = true
  }
}
