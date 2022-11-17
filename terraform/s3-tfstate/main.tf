provider "aws" {
  region = local.region
}

locals {
  bucket_name = "sipasta-tfstate"
  region      = "us-east-1"
}

module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.6.0"

  bucket = local.bucket_name
  acl    = "private"
}