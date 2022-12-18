# SiPasta

Pastebin-like project where you could save, clone, and share texts.
Developed for final assignment in Cloud Computing.

## Contents

- `backend`: Backend Application source code
- `sipasta-ui`: Frontend Application source code
- `manifest`: Configuration of application in k8s
- `terraform`: Defines infrastructure in AWS

## Note

Due to limited capabilities of AWS Academy Lab, only VPC definition on `terraform` (`vpc-prod`) are applied for this assignment.

Frontend configuration in `manifest` is not used as the frontend is deployed using vercel for this assignment.