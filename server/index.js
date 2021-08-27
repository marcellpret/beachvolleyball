const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const path = require("path");

const PORT = process.env.PORT || 3001;

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/api/markers", async (req, res) => {
    try {
        const { rows } = await db.getMarkers();
        console.log("rows in getMarkers: ", rows[0]);
        res.json(rows);
    } catch (error) {
        console.log("error in getMarkers: ", error);
    }
});

app.post("/api/save-new-court", async (req, res) => {
    try {
        const { name, description, lng, lat, rating, foto } = req.body;

        const { rows } = await db.createCourt(
            name,
            description,
            foto,
            lat,
            lng,
            rating
        );
        res.json({ success: true });
    } catch (error) {
        console.log("error in save new Court: ", error);
    }
});

app.post(
    "/api/uploadPicture",
    uploader.single("file"),
    s3.upload,
    function (req, res) {
        console.log("Here we are!: ");

        if (req.file) {
            console.log("req.file: ", req.file);
            const picture = `https://newimageboardapp.s3.amazonaws.com/${req.file.filename}`;
            console.log("picture: ", picture);

            res.json({
                foto: picture,
            });
        } else {
            res.json({
                success: false,
            });
        }
    }
);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
