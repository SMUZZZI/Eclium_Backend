import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true }, 
    songs: [{ type: String }],
    about: { type: String },
    subscribtions: [{ type: String }],
    icon: { type: String },
}, {
    timestamps: true,
})

export default mongoose.Model('User', UserSchema)