provider "aws" {
  region = local.region
}

terraform {
  backend "s3" {
    encrypt = true
    region = "us-east-1"
    bucket = "sipasta-tfstate"
    key = "vpc-prod/terraform.tfstate"
  }
}

locals {
  name   = "vpc-prod"
  region = "us-east-1"
}

module "vpc-prod" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.18.1"

  name = local.name
  cidr = "10.0.0.0/16"

  azs = ["us-east-1a", "us-east-1b", "us-east-1c"]
  database_subnets = ["10.0.0.0/19", "10.0.32.0/19", "10.0.64.0/19"]
  private_subnets = ["10.0.96.0/19", "10.0.128.0/19", "10.0.160.0/19"]
  public_subnets = ["10.0.192.0/20", "10.0.208.0/20", "10.0.224.0/20"]

  enable_nat_gateway = false

  tags = {
    Terraform       = "true"
    Environment     = "production"
    ProductDomain   = "inf"
  }

  private_subnet_tags = {
  	"Tier" = "app"
  }

  database_subnet_tags = {
  	"Tier" = "data"
  }

  public_subnet_tags = {
  	"Tier" = "pub"
  }
}
