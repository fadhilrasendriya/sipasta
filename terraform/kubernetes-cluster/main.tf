provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    encrypt = true
    region = "us-east-1"
    bucket = "sipasta-tfstate"
    key = "kubernetes-cluster/terraform.tfstate"
  }
}

resource "aws_security_group" "kube-control-plane-security-group" {

  name        = "kube-control-plane-sg"
  description = "Security group for control plane"
  vpc_id      = data.terraform_remote_state.vpc_prod_state.outputs.vpc_prod_id

  ingress {
    cidr_blocks = [ data.terraform_remote_state.vpc_prod_state.outputs.cidr_block ]
    from_port = 0
    protocol = "all"
    to_port = 0
  } 

  ingress {
    cidr_blocks = [ "0.0.0.0/0"]
    from_port = 80
    protocol = "tcp"
    to_port = 80
  } 

  ingress {
    cidr_blocks = [ "0.0.0.0/0"]
    from_port = 443
    protocol = "tcp"
    to_port = 443
  } 

  ingress {
    cidr_blocks = [ "0.0.0.0/0"]
    from_port = 22
    protocol = "tcp"
    to_port = 22
  }

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port = 0
    protocol = "all"
    to_port = 0
  } 
}

resource "aws_security_group" "kube-worker-nodes-security-group" {

  name        = "kube-worker-nodes-sg"
  description = "Security group for control plane"
  vpc_id      = data.terraform_remote_state.vpc_prod_state.outputs.vpc_prod_id

  ingress {
    cidr_blocks = [ data.terraform_remote_state.vpc_prod_state.outputs.cidr_block ]
    from_port = 0
    protocol = "all"
    to_port = 0
  } 

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port = 0
    protocol = "all"
    to_port = 0
  }
}
