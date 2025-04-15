# 01_Bronze_Layer.py

from pyspark.sql.functions import current_timestamp

# Step 0 - Clear out Bronze folder
dbutils.fs.rm("/mnt/airportdata/bronze/trips", recurse=True)

# Step 1: Load raw CSV from storage (with header + infer schema)
df_raw = (
    spark.read
    .option("header", True)
    .option("inferSchema", True)
    .csv("/mnt/airportdata/raw/trips_raw.csv")
)

# Step 2: Add ingestion timestamp
df_raw = df_raw.withColumn("ingest_ts", current_timestamp())

# Step 3: Save as Delta format in Bronze folder
df_raw.write.format("delta").mode("overwrite").save("/mnt/airportdata/bronze/trips")

# Step 4: Register Delta table for SQL
df_raw.createOrReplaceTempView("bronze_view")

# Step 5: Create a temp view for quick exploration
df_raw.createOrReplaceTempView("bronze_view")

# Step 6: Preview the Bronze data
spark.sql("SELECT * FROM bronze_view LIMIT 5").show()
