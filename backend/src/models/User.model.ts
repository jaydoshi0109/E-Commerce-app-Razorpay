import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },   
}, {timestamps: true}  )

export const User = mongoose.model('User', userSchema);