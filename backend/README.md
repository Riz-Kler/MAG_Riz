## Build & Run (Docker) from /MAG_Riz/backend  ### ONLY RUN IF NOT RUN from README.md script ###   e.g for testing
```bash
docker build -t magriz-backend .
docker run --rm -p 5000:000 \
  --network mag_riz_default \
  -e KAFKA_BOOTSTRAP_SERVERS=kafka:9093 \
  -e DB_HOST=postgres -e DB_PORT=5432 \
  -e DB_USER=mag -e DB_PASSWORD=magpass -e DB_NAME=magdb \
  --name magriz-backend magriz-backend