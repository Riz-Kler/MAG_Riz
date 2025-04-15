# MAG Airport System

This repo contains a Node.js backend, a Python microservice for delay prediction, and PostgreSQL database — all containerized with Docker Compose.

## Getting Started

```bash
docker-compose up --build
```

- Node.js API: http://localhost:3000
- Python delay prediction: http://localhost:5000/predict-delay

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
