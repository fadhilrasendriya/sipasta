output "vpc_prod_id" {
    value = module.vpc-prod.vpc_id
}

output "private_subnet_ids" {
    value = module.vpc-prod.private_subnets
}

output "public_subnet_ids" {
    value = module.vpc-prod.public_subnets
}

output "database_subnet_ids" {
    value = module.vpc-prod.database_subnets
}

output "default_sg_id" {
    value = module.vpc-prod.default_security_group_id
}

output "cidr_block" {
    value = module.vpc-prod.vpc_cidr_block
}
