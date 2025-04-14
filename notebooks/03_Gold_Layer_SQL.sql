-- Read from Silver Delta table
CREATE OR REPLACE TEMP VIEW silver_trips AS
SELECT * FROM delta.`/mnt/airportdata/silver/trips`;

-- Aggregate by route
CREATE OR REPLACE TABLE gold_route_counts
USING DELTA
LOCATION '/mnt/airportdata/gold/route_counts'
AS
SELECT
  origin,
  destination,
  COUNT(*) AS total_trips,
  ROUND(AVG(ticket_price), 2) AS avg_price,
  ROUND(MAX(ticket_price), 2) AS max_price,
  ROUND(MIN(ticket_price), 2) AS min_price
FROM silver_trips
GROUP BY origin, destination;

-- Preview
SELECT * FROM gold_route_counts ORDER BY total_trips DESC;
