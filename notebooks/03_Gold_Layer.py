# Gold Layer - Final Version

from pyspark.sql.functions import avg, max, min, round, count

# Step 0: Optional cleanup (if needed)
dbutils.fs.rm("/mnt/airportdata/gold/route_counts", recurse=True)

# Step 1: Read from Silver
df_silver = spark.read.format("delta").load("/mnt/airportdata/silver/trips")

# Step 2: Aggregate gold metrics
df_gold = df_silver.groupBy("origin", "destination").agg(
    count("*").alias("total_trips"),
    round(avg("ticket_price"), 2).alias("avg_price"),
    round(max("ticket_price"), 2).alias("max_price"),
    round(min("ticket_price"), 2).alias("min_price")
)

# Step 3: Save to Gold layer
df_gold.write.format("delta").mode("overwrite").save("/mnt/airportdata/gold/route_counts")

## Step 4: Register SQL table (optional)
#spark.sql("""
#CREATE TABLE IF NOT EXISTS gold_route_counts
#USING DELTA
#LOCATION '/mnt/airportdata/gold/route_counts'
#""")

# Step 5: Preview
df_gold.createOrReplaceTempView("gold_view")
spark.sql("SELECT * FROM gold_view ORDER BY total_trips DESC").show()
