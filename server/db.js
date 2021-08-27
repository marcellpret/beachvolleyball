const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/beachvolleyball"
);

module.exports.createCourt = (name, description, foto, lat, lng, rating) => {
    return db.query(
        `INSERT INTO courts (name, description, foto, lat, lng,rating) VALUES($1, $2,$3,$4,$5, $6) RETURNING *`,
        [name, description, foto, lat, lng, rating]
    );
};

module.exports.getMarkers = () => {
    return db.query(`SELECT * FROM courts`);
};
