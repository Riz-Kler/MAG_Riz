> 🌐 Designed and maintained by **Rizwan Kler** — demonstrating end-to-end DevOps & Site Reliability Engineering on AWS.

## ✈️ MAG_Riz – Cloud-Native Airport Operations Architecture

**MAG_Riz** is a real-world simulation of a cloud-based airport management system, designed to demonstrate full-stack Site Reliability Engineering and DevOps principles.  
It showcases an **AWS-provisioned infrastructure (Terraform IaC)** with secure networking (private/public subnets, IAM, Security Groups, NACLs), **GDPR-compliant data flows**, and **real-time flight events** via Kafka.  

Key integrations include:
- **Terraform (IaC):** Builds VPC, RDS, ECS, S3, and CloudWatch alarms for DB CPU utilisation.  
- **NiFi & Kafka:** Ingest, transform, and pseudonymise event data before storage or ELK indexing.  
- **ELK Stack:** Centralised observability — logs, metrics, and dashboards for error rate and latency.  
- **SonarQube & CI/CD:** Continuous Integration quality gates for clean, secure code delivery.  

This project was developed as part of my Site Reliability Engineer interview preparation and refined into a reusable architecture reference for **cloud automation, data reliability, and security compliance**.
#
# ✈️ MAG Airport System – Developer Showcase Project by Rizwan Kler

> A modern, containerized microservice system built around realistic airport operations — inspired by the MAG Software Developer role. Designed with scalability, fault-tolerance, and cloud-readiness in mind.

---

## 📦 Project Overview

This project simulates key airport services:

- 🛬 **Arrivals**
- 🛫 **Departures**
- 🎟️ **Customer Check-in**
- 🚗 **Parking**
- 🌦️ **Weather Delay Prediction** (Python microservice)
- 🧠 Future-ready for AWS ECS, RDS, ECR, and GDPR compliance

---

## 🧱 Architecture

- **Node.js (TypeScript)**: Express backend handling passengers & flight data
- **Python (Flask)**: Microservice that predicts delays based on weather inputs
- **PostgreSQL**: Relational database container for passenger data
- **Docker Compose**: Local orchestration of all services
- **Jest**: Unit testing for backend services

---

## 🧰 Tech Stack (initial)

| Component        | Technology                     |
|------------------|--------------------------------|
| Backend API      | Node.js + Express + TypeScript |
| Delay Prediction | Python + Flask                 |
| Database         | PostgreSQL                     |
| Containerization | Docker, Docker Compose         |
| Testing          | Jest, ts-jest                  |
| Cloud-ready      | AWS ECS, RDS, ECR              |

---

## 📁 Folder Structure

```
MAG_Riz/
│
├── README.md                     # Short project overview
│
├── architecture/
│   ├── MAG_Airport_AWS_Architecture_Diagram_RizKler_4.drawio
│   └── notes-security-layers.md  # optional notes or the comment you wrote
│
├── terraform/
│   ├── versions.tf
│   ├── provider.tf
│   ├── vpc.tf
│   ├── security.tf
│   ├── rds-subnet.tf
│   ├── rds.tf
│   ├── alarms.tf
│   └── variables.tf
│
├── nifi/
│   ├── kafka_to_s3_flow.xml      # or export as .json if using NiFi Registry
│   └── readme-nifi-flow.md       # short summary of flow and controller services
│
├── ci-cd/
│   ├── .gitlab-ci.yml            # or Jenkinsfile if that’s what you’ll demo
│   ├── sonar-project.properties
│   ├── tfsec.yml (optional)
│   └── quality-gate-notes.md
│
└── scripts/
    └── helper-scripts.sh         # placeholder for any bash automation or tf wrapper ## TO DO ##
```

---

## ⚙️ Running Locally (Dev Environment)

1. Ensure Docker is installed and running
2. From project root:

```bash
docker compose up --build
```
Services will be available at:

- Backend API: `http://localhost:3000/api/passengers`
- Delay Predictor: `http://localhost:5000/predict-delay`

---

## Quick Start /MAG_Riz ##

docker compose down
docker compose pull
docker compose up -d
docker compose ps

# check logs

docker compose logs -f zookeeper
docker compose logs -f kafka

## ELK Stack /MAG_Riz/observability ##

docker compose down
docker compose -f docker-compose.yml up -d

# view logstash /MAG_Riz/observability

docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs -f logstash


## 🌐 AWS Deployment Plan

This system is built to deploy to AWS using:

| AWS Service         | Role                                              |
|----------------------|---------------------------------------------------|
| **ECS (Fargate)**    | Run backend and Python microservices as containers |
| **RDS (PostgreSQL)** | Managed, scalable database with secure access     |
| **ECR**              | Docker image storage                              |
| **CloudWatch**       | Logging & monitoring                              |
| **Secrets Manager**  | Manage DB creds & API keys securely               |
| **ALB / API Gateway**| External access (GDPR-compliant logging possible) |

---

## 🔐 GDPR & Security Considerations

- ✅ Passenger data is never stored unencrypted in containers
- ✅ RDS with encryption at rest + backups enabled
- ✅ Secrets stored in AWS Secrets Manager (not hardcoded)
- ✅ Logs centralized but anonymized when needed
- ✅ Minimal data retention per GDPR Article 5

---

## 🧪 Sample Test

```bash
curl -X GET http://localhost:3000/api/passengers
```

Returns:
```json
{ "message": "Passenger service live" }
```

---

## 📈 Status

✅ Local version working  
✅ Architecture mapped for ECS/RDS  
🔜 Next: Deploy backend to ECS and connect to RDS

---

## 👨‍💻 About the Developer

**Rizwan Kler**  
A developer passionate about smart, cloud-ready systems that solve real problems. This project was built out of genuine interest and excitement for the opportunity to contribute to MAG’s digital transformation journey.

📅 March 24, 2025

### 🔄 Recent Updates
- Refactored Docker Compose configuration to replace deprecated Bitnami images.
- Pinned stable versions:
  - Confluent Kafka/Zookeeper 7.6.1
  - Postgres 15
  - Spark 3.5.2
- Validated full stack startup and removed obsolete Docker warnings.


---
