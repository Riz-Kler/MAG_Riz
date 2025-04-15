# generate_sample_data.py

from databricks import dbutils

# Define sample CSV data
sample_data = """trip_id,origin,destination,passenger_count,ticket_price
1,MCR,LHR,180,150.0
2,LHR,IBZ,160,200.5
3,IBZ,MCR,200,175.0
"""

# Write to mounted location
dbutils.fs.mkdirs("/mnt/airportdata/raw")
dbutils.fs.put("/mnt/airportdata/raw/trips_raw.csv", sample_data, overwrite=True)
