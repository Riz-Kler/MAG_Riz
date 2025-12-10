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

/* --- New table for mobile check-in reservations --- */
CREATE TABLE IF NOT EXISTS reservations (
    id             SERIAL PRIMARY KEY,
    passenger_name TEXT NOT NULL,
    flight_id      TEXT NOT NULL,
    seat           TEXT NOT NULL CHECK (seat IN ('Window', 'Middle', 'Aisle')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_res_flight_seat UNIQUE (flight_id, seat),
    CONSTRAINT uq_res_passenger UNIQUE (passenger_name)
);


ALTER TABLE reservations
  ADD CONSTRAINT reservations_unique_flight_seat
    UNIQUE (flight_id, seat);

ALTER TABLE reservations
  ADD CONSTRAINT reservations_unique_flight_passenger
    UNIQUE (flight_id, passenger_name);
