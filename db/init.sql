CREATE TABLE passengers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  flight_number TEXT,
  gate TEXT,
  destination TEXT
);

INSERT INTO passengers (name, flight_number, gate, destination)
VALUES 
  ('Riz Kler', 'FL001', 'Gate 5', 'Paris'),
  ('Jane Smith', 'FL002', 'Gate 7', 'Berlin');