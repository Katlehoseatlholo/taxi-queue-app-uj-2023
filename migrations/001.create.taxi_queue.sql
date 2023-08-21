create table if NOT EXISTS taxi_queue (
    id integer PRIMARY KEY AUTOINCREMENT,
    passenger_queue_count integer,
    taxi_queue_count integer
);