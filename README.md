✈️ MAG _Riz – Airport Operations System (All-in-One Stack)

Designed and maintained by Rizwan Kler — demonstrating end-to-end DevOps & Site Reliability Engineering across Node.js, Python, Kafka, Postgres, Spark and ELK.

🧩 Overview

MAG_Riz is a fully containerised simulation of a modern airport operations platform showing:

Real-time flight data & check-in flows

Weather-based delay prediction (Python microservice)

Kafka + Zookeeper for event streaming

PostgreSQL for data persistence

Spark for analytics tasks

ELK (Elasticsearch / Logstash / Kibana) for observability

Terraform IaC and AWS architecture diagrams for cloud deployment

🚀 One-Line Quick Start

Copy → Paste → Run in PowerShell or bash (from the repo root MAG_Riz)

# 1️⃣ Start core infrastructure (Kafka, Zookeeper, Postgres + Spark)
docker compose down && \
docker compose pull && \
docker compose up -d && \
docker compose ps && \

# 2️⃣ Start optional observability stack (ELK)
docker compose -f observability/docker-compose.yml up -d && \
docker compose -f observability/docker-compose.yml ps && \

# 3️⃣ Build and run the backend API container on the shared network
docker build -t magriz-backend ./backend && \
docker run --rm -p 5000:3000 \
  --network mag_riz_default \
  -e KAFKA_BOOTSTRAP_SERVERS=kafka:9093 \
  -e DB_HOST=postgres -e DB_PORT=5432 \
  -e DB_USER=mag -e DB_PASSWORD=magpass -e DB_NAME=magdb \
  --name magriz-backend magriz-backend


That’s it — the full platform (core → observability → backend) will come online in order.

✅ Access Points
Service	URL	Notes
Backend API	http://localhost:5000
	GET /health → status, POST /predict-delay → JSON prediction
Postgres DB	localhost:5432	user mag, pass magpass, db magdb
Kafka Broker	localhost:9092 (host) / kafka:9093 (containers)	with Zookeeper localhost:2181
Spark Master UI	http://localhost:8080
	(if Spark enabled)
Kibana Dashboard	http://localhost:5601
	(after observability stack starts)
💡 Typical Checks
# Check container health
docker compose ps

# Follow service logs
docker compose logs -f kafka
docker compose logs -f postgres
docker compose -f observability/docker-compose.yml logs -f logstash

# Test backend endpoints
curl http://localhost:5000/health
curl -X POST http://localhost:5000/predict-delay \
  -H "Content-Type: application/json" \
  -d '{"flight":"MAN001","dep_time":"2025-10-23T19:45:00Z"}'

⚙️ Stack Components
Layer	Tech / Tool	Purpose
Backend	Node.js (TypeScript + Express)	Passenger & flight services
Microservice	Python + Flask	Weather / delay prediction
Database	PostgreSQL 15	Persistent data
Streaming	Kafka 7.6.1 + Zookeeper 7.6.1	Event ingest & real-time updates
Analytics	Spark 3.5.2	Batch / stream processing
Observability	ELK 8.15 (Filebeat → Logstash → Elasticsearch → Kibana)	Central logging & metrics
IaC	Terraform (AWS VPC, ECS, RDS, S3, CloudWatch)	Cloud provisioning reference
🔐 Security & GDPR

Data pseudonymised and encrypted at rest (KMS/TDE TLS 1.3)

IAM roles / Security Groups for segmentation

Secrets handled via AWS Secrets Manager in cloud deploys

Logs sanitised in Logstash (filters mask email / phone)

🧠 Project Status

✅ Local stack running
✅ Validated Docker refactor and ELK integration
🔜 Next: Deploy to AWS ECS + RDS using Terraform

🧪 Recent Refactors

Replaced deprecated Bitnami images with Confluent 7.6.1 (Kafka/ZK) + Postgres 15 + Spark 3.5.2

Corrected depends_on array syntax and removed obsolete version: keys

Standardised startup order and network (mag_riz_default)

Verified multi-service startup on clean machine

Added health endpoint for backend container

## Stack

- Node.js + TypeScript + Express
- Python + Flask
- PostgreSQL
- Docker Compose
- Jest for testing

0# MAG_Riz Airport Medallion Pipeline ✈️

A simulated data lakehouse architecture using **Azure Databricks, PySpark, Delta Lake**, and **Azure Storage**.  
It models passenger journeys between 3 UK airports (MAN, STN, BHX) using the **Bronze → Silver → Gold** medallion pattern.

## Architecture

- **Bronze Layer**: Raw flight data ingested from CSV → Delta
- **Silver Layer**: Filtered to retain only 3-airport journeys
- **Gold Layer**: (Planned) Aggregated insights for analysis

## Technologies Used

- 🔹 Azure Databricks
- 🔹 Delta Lake (Bronze, Silver, Gold)
- 🔹 PySpark & SQL
- 🔹 Azure Data Lake (ADLS Gen2)
- 🔹 GitHub + Markdown Documentation

## Current Status

✅ Bronze and Silver implemented  
🟨 Gold layer working with price metrics + ADF pipeline orchestration planned  
🧪 Testing limited due to Azure quota — pipeline logic verified via notebook mockups

## Notebooks

- `01_Bronze_Layer.py`: Ingests raw trip CSV, writes to Bronze
- `02_Silver_Layer.py`: Filters for valid airport routes, outputs to Silver
- `03_Gold_Layer.py`: Coming soon!

## Demo Users

- **Alice**, **Bob**, **Eve**, **Riz** simulate realistic passenger trips.

## TODO

Replace sample data with realistic airline test datasets

Full ADF pipeline orchestration for each layer

Add Delta Live Tables (DLT) support (optional)

Use Secrets API or Databricks-backed secret scopes

CI/CD with GitHub Actions

Add performance benchmarking (vs Parquet or CSV)

Support for new UK/EU airport expansions

**Update (Oct 2025):** Terraform IaC structure cleaned and validated in `terraform/`. 
Older configs archived in `terraform_old/`. AWS resources will be reintroduced next phase.

terraform_old reintroduced

This repo demonstrates Terraform IaC, NiFi data flows, and AWS architecture design for the MAG_Riz system — created as part of recent interview preparation.

### 🔄 Recent Updates
- Refactored Docker Compose configuration to replace deprecated Bitnami images.
- Pinned stable versions:
  - Confluent Kafka/Zookeeper 7.6.1
  - Postgres 15
  - Spark 3.5.2
- Validated full stack startup and removed obsolete Docker warnings.


👨‍💻 Author

Rizwan Kler — passionate about cloud, DevOps, and data-driven systems for real-world operations.
📍 Manchester • 2025

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




## Additional Info ##

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

## NB USE SCRIPTS SUPPLIED ABOVE  ###
-----------------------------------------------------------------------------------------------------------------------------------

## ⚙️ Running Locally (Dev Environment) /MAG_Riz/backend

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

docker compose -f docker-compose.yml up -d

# view logstash /MAG_Riz/observability

docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs -f logstash
-------------------------------------------------------------------------------------------------------------------------------------



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
✅ Deployed backend to ECS and connected to RDS

## 📱 Next Phase – Mobile Check-In & Reservations

The next milestone for **MAG_Riz** is a mobile-friendly check-in and reservations experience that runs on top of the existing backend, Kafka events, and AWS IaC.

### Mobile App Approach

- **Frontend:** Responsive React SPA (or PWA) served via **S3 + CloudFront**, optimised for mobile browsers so it can be demoed directly on a phone.
- **Auth:** OAuth2/OIDC sign-in using **Amazon Cognito / Microsoft Entra ID**, issuing JWTs.
- **Edge Security:** Internet traffic terminates at an **AWS ALB with OIDC authentication**. Only validated JWT traffic is forwarded to private ECS services.
- **Backend Flow:**
  - `POST /reservations` – create a reservation in **Aurora/RDS**
  - `GET /reservations/{id}` – retrieve reservation details
  - Optional: publish `ReservationCreated` events to **Kafka** for downstream processing.

### Observability & SRE Hooks

- **CloudWatch Logs:** ECS tasks and ALB send structured logs (including `reservationId`, `userId`, `flightId`) to dedicated log groups to trace bookings end-to-end.
- **CloudWatch Metrics:** Custom metrics such as `ReservationsCreated` and `ReservationsFailed` to monitor booking success rates.
- **(Planned) Tracing:** AWS X-Ray / ADOT to visualise the full path:
  `Client → CloudFront → ALB → ECS (check-in service) → RDS/Kafka`.

This mobile layer will sit on top of the existing Docker, Kafka, Postgres, Spark, and Terraform stack, turning MAG_Riz into a fully demonstrable, cloud-native airport system that can be exercised live from a phone during interviews or demos.

---


