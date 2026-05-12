# 🏗️ BuildRight

<div align="center">

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Backend-SpringBoot-green?style=for-the-badge&logo=springboot)
![AWS](https://img.shields.io/badge/Cloud-AWS-orange?style=for-the-badge&logo=amazonaws)
![Terraform](https://img.shields.io/badge/IaC-Terraform-purple?style=for-the-badge&logo=terraform)

### 🚀 Full-Stack Cloud-Native Architecture Management Platform

BuildRight is a cloud-enabled full-stack web application for managing architectural projects, galleries, plans, and client inquiries with a secure admin dashboard and scalable AWS infrastructure.

</div>

---

# ✨ Features

- 🔐 JWT-based Authentication
- 🏢 Project & Gallery Management
- 📩 Client Inquiry System
- 📱 Responsive UI
- ☁️ AWS Cloud Infrastructure
- ⚡ CI/CD using CodePipeline & CodeBuild
- 🏗️ Infrastructure as Code with Terraform

---

# 🛠️ Tech Stack

| Frontend | Backend | Cloud & DevOps | Database |
|----------|----------|----------------|-----------|
| React + Vite | Spring Boot | AWS | MySQL |
| Nginx | Spring Security | Docker | AWS RDS |
| Axios | JWT Auth | Terraform |  |

---

# 🏗️ Architecture

```text
User → ALB → EC2 
                 ├── Frontend (React + Nginx)
                 └── Backend (Spring Boot API)
                           │
                           ├── AWS RDS
                           └── AWS S3
```

📌 Architecture Diagram:

```text
docs/BuildRight_Arch_Diag.png
```

---

# 📂 Project Structure

```text
BuildRight/
├── backend/       # Spring Boot Backend
├── frontend/      # React Frontend
├── terraform/     # AWS Infrastructure
├── scripts/       # Deployment Scripts
└── docs/          # Architecture Diagram
```

---

# ⚙️ Local Setup

## Backend

```bash
cd backend
./mvnw spring-boot:run
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# ☁️ Terraform Setup

```bash
cd terraform

terraform init
terraform plan
terraform apply
```

---

# 🔄 CI/CD

AWS services used:
- CodePipeline
- CodeBuild
- EC2
- S3

Buildspec files:
- `backend-buildspec.yml`
- `frontend-buildspec.yml`

---

# 🔐 Security

- JWT Authentication
- Spring Security
- IAM Roles
- VPC & Security Groups

---

# 📄 License

This project is licensed under the MIT License.