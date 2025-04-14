from pyspark.sql import SparkSession
from pyspark.sql.functions import col

# Create Spark session
spark = SparkSession.builder \
    .appName("GDPR Delete Job") \
    .getOrCreate()

# Simulated passenger data
data = [
    ("Alice Smith", "alice@example.com", "FlightA", "2025-04-10"),
    ("Bob Jones", "bob@example.com", "FlightB", "2025-04-10"),
    ("Charlie Doe", "charlie@example.com", "FlightC", "2025-04-11"),
    ("Alice Smith", "alice@example.com", "FlightD", "2025-04-12"),
	("Eve Listener", "eve@example.com", "FlightE", "2025-04-12"),
    ("Riz Kler", "Riz@example.com", "FlightF", "2025-04-12"),
]

columns = ["name", "email", "flight", "date"]

df = spark.createDataFrame(data, columns)

print("=== All Passenger Data ===")
df.show()

# Simulate a GDPR deletion request (delete by email)
email_to_delete = "alice@example.com"

df_filtered = df.filter(col("email") != email_to_delete)

print(f"=== After GDPR Deletion: {email_to_delete} ===")
df_filtered.show()

# Optionally write to file or Hudi (next step)
# df_filtered.write.csv("/opt/spark/output/clean_passengers.csv", header=True)

spark.stop()
