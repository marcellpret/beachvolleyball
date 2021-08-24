const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/beachvolleyball"
);

module.exports.createCourt = ({ name, geoJSON }) => {
    return db.query(
        "INSERT INTO courts (name, geoJSON) VALUES($1, ($2)::jsonb) RETURNING *",
        [name, JSON.stringify(geoJSON)]
    );
};

module.exports.getMarkers = () => {
    return db.query(`SELECT * FROM courts`);
};
