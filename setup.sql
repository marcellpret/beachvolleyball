DROP TABLE IF EXISTS courts;


 CREATE TABLE courts(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    foto VARCHAR,
    lat DECIMAL NOT NULL,
    lng DECIMAL NOT NULL,
    rating INTEGER NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 INSERT INTO courts (name, description, lat, lng, rating) VALUES ('Testing Court', 'Just trying to add in the DB a new court and marker', 52.44736443826476, 13.38636231186827, 5);