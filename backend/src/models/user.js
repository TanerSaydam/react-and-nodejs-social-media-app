const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    userName: {
        type: String,
        required:true,
        unique: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: Object,
        required: true
    },
    profession: {
        type: String,
        required: true,
        minLength: 3
    },
    about: {
        type: String,
        required: true,
        minLength: 3
    },
    createdDate: Date,
    updatedDate: Date
});

const User = mongoose.model("User", userSchema);

module.exports = User;