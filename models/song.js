import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    audio: { type: String, required: true },
    title: { type: String, required: true }, 
    author: { type: String, required: true },
    authorLink: [{ type: String, required: true }],
    icon: { type: String },
    genres: [{ type: String }]
}, {
    timestamps: true,
})

export default mongoose.Model('Song', SongSchema)