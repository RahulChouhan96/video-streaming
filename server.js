require("./server/models/Video");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const Video = mongoose.model("Video");

function validateURL(req, res, next) {
    let url = req.body.url;
    if (url == url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)[0])
        next();
    else
        res.status(404).json({ message: "Invalid URL" });
}

app.get("/", (req, res) => {
    try {
        const query = filterQuery();

        Video.find(query).skip((req.query.page - 1) * 20).limit(20).exec((error, videos) => {
            if (error)
                res.status(500).json({ message: "Error while getting docs", error });
            else
                res.status(200).json(videos);
        });

        function filterQuery() {
            let constructQuery = {};

            if (req.query.public)
                constructQuery = { isPrivate: false };
            if (req.query.mostlyViewed)
                constructQuery.timesViewed = { $gt: 42 };

            return constructQuery;
        }
    } catch (error) {
        res.status(500).json({ message: "Some error occurred", error });
    }
});

app.post("/video", validateURL, (req, res) => {
    try {
        Video.create(req.body)
            .then(videoObj => res.status(200).json(videoObj))
            .catch(error => res.status(500).json({ message: "Error while creating a video", error }));
    } catch (error) {
        res.status(500).json({ message: "Some error occurred", error });
    }
});

app.put("/video/:videoId", validateURL, (req, res) => {
    try {
        Video.findByIdAndUpdate(req.params.videoId, { $set: req.body }, { new: true }).exec((error, videoObj) => {
            if (error)
                res.status(500).json({ message: "Error while updating a doc", error });
            else
                res.status(200).json(videoObj);
        });
    } catch (error) {
        res.status(500).json({ message: "Some error occurred", error });
    }
});

app.delete("/video/:videoId", (req, res) => {
    try {
        Video.findByIdAndDelete(req.params.videoId).exec((error, videoObj) => {
            if (error)
                res.status(500).json({ message: "Error while updating a doc", error });
            else
                res.status(200).json({ deleted: true, videoObj });
        });
    } catch (error) {
        res.status(500).json({ message: "Some error occurred", error });
    }
});

mongoose.connect("mongodb://localhost:27017/practice", (error) => {
    if (!error)
        console.log("DB Connected!");
})

app.listen(5100, () => console.log("Server Connected at 5100!"));