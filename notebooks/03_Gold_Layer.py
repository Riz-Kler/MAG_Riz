df_gold = df_silver.groupBy("origin", "destination").count()

df_gold.write.format("delta").mode("overwrite").save("/mnt/airportdata/gold/route_counts")

from pyspark.sql.functions import avg, max, min, round

df_gold = df_silver.groupBy("origin", "destination").agg(
    count("*").alias("total_trips"),
    round(avg("ticket_price"), 2).alias("avg_price"),
    round(max("ticket_price"), 2).alias("max_price"),
    round(min("ticket_price"), 2).alias("min_price")
)

spark.sql("CREATE TABLE IF NOT EXISTS gold_route_counts USING DELTA LOCATION '/mnt/airportdata/gold/route_counts'")

df_gold.createOrReplaceTempView("gold_view")
spark.sql("SELECT * FROM gold_view ORDER BY total_trips DESC").show()
