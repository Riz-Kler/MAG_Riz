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

## 🧰 Tech Stack

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
├── backend/           # Node.js + TypeScript backend API
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
├── python-service/    # Flask microservice
│   ├── app.py
│   └── Dockerfile
├── db/                # SQL init script for PostgreSQL
│   └── init.sql
├── docker-compose.yml
└── README.md
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

---
