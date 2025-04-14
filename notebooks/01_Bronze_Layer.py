df_raw = spark.read.option("header", True).csv("/mnt/airportdata/raw/trips_raw.csv")

df_raw.write.format("delta").mode("overwrite").save("/mnt/airportdata/bronze/trips")

spark.sql("CREATE TABLE IF NOT EXISTS bronze_trips USING DELTA LOCATION '/mnt/airportdata/bronze/trips'")

from pyspark.sql.functions import current_timestamp
df_raw = df_raw.withColumn("ingest_ts", current_timestamp())


spark.read.option("header", True).option("inferSchema", True).csv("/mnt/airportdata/raw/trips_raw.csv").write.mode("overwrite").saveAsTable("bronze_trips")

df_raw.createOrReplaceTempView("bronze_view")
spark.sql("SELECT * FROM bronze_view LIMIT 5").show()
