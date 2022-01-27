const { Schema, model } = require("mongoose");

const VideoSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: String,
    isPrivate: { type: Boolean, default: false },
    timesViewed: { type: Number, default: 0 }
});

module.exports = model("Video", VideoSchema);