# 02_Silver_Layer.py

# Step 1: Read from Bronze
df_bronze = spark.read.format("delta").load("/mnt/airportdata/bronze/trips")

# Step 2: Filter for valid airport routes (MAN, STN, BHX)
df_silver = df_bronze.filter(
    (df_bronze.origin.isin("MAN", "STN", "BHX")) &
    (df_bronze.destination.isin("MAN", "STN", "BHX"))
)

# Step 3: Clean the data (remove nulls and duplicates)
df_silver = df_silver.dropna().dropDuplicates(["trip_id"])

# Step 4: Write cleaned data to Silver Delta folder
df_silver.write.format("delta").mode("overwrite").save("/mnt/airportdata/silver/trips")

# Step 5: Register Silver Delta as a SQL Table
spark.sql("CREATE TABLE IF NOT EXISTS silver_trips USING DELTA LOCATION '/mnt/airportdata/silver/trips'")

# Step 6: Explore with SQL
df_silver.createOrReplaceTempView("silver_view")
spark.sql("SELECT * FROM silver_view LIMIT 5").show()
