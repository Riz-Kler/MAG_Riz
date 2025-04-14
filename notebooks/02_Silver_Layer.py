df_bronze = spark.read.format("delta").load("/mnt/airportdata/bronze/trips")

df_silver = df_bronze.filter(
    (df_bronze.origin.isin("MAN", "STN", "BHX")) &
    (df_bronze.destination.isin("MAN", "STN", "BHX"))
)

df_silver.write.format("delta").mode("overwrite").save("/mnt/airportdata/silver/trips")

df_silver = df_silver.dropna().dropDuplicates(["trip_id"])

spark.sql("CREATE TABLE IF NOT EXISTS silver_trips USING DELTA LOCATION '/mnt/airportdata/silver/trips'")

df_silver.createOrReplaceTempView("silver_view")
spark.sql("SELECT * FROM silver_view LIMIT 5").show()
