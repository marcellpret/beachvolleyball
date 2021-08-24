const express = require("express");
const app = express();
const db = require("./db");

const PORT = process.env.PORT || 3001;

app.get("/api/markers", async (req, res) => {
    const { rows } = await db.getMarkers();
    console.log("rows in getMarkers: ", rows);

    res.json(rows[0]);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
