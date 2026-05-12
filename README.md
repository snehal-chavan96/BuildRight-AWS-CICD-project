# BuildRight

BuildRight is a full-stack, cloud-enabled web application designed for managing architectural projects, plans, galleries, and client inquiries with a modern admin dashboard and a scalable CI/CD pipeline using AWS services.

The platform enables architecture and construction businesses to showcase projects, manage content efficiently, and streamline deployment using containerization and Infrastructure as Code (IaC).

---

# Features

## User Features
- Browse architectural projects and galleries
- View project details and plans
- Contact/inquiry form for clients
- Responsive modern UI

## Admin Features
- Secure admin authentication using JWT
- Manage projects, gallery items, and plans
- Upload and manage media files
- Dashboard-based content management

## Cloud & DevOps Features
- Dockerized frontend and backend
- CI/CD pipeline using AWS CodePipeline & CodeBuild
- Infrastructure provisioning using Terraform
- AWS deployment with:
  - EC2
  - RDS
  - S3
  - Application Load Balancer (ALB)
  - IAM
  - VPC & Security Groups

---

# Tech Stack

## Frontend
- React
- Vite
- Nginx
- Axios
- HTML/CSS/JavaScript

## Backend
- Java Spring Boot
- Spring Security
- JWT Authentication
- Maven
- REST APIs

## Database
- MySQL / AWS RDS

## DevOps & Cloud
- Docker
- Terraform
- AWS EC2
- AWS S3
- AWS RDS
- AWS ALB
- AWS IAM
- AWS CodeBuild
- AWS CodePipeline

---

# Project Structure

```text
BuildRight/
│
├── backend/                  # Spring Boot backend
├── frontend/                 # React frontend
├── terraform/                # Infrastructure as Code
├── scripts/                  # Deployment scripts
├── docs/                     # Architecture diagrams/docs
│
├── appspec.yml
├── backend-buildspec.yml
├── frontend-buildspec.yml
│
└── README.md