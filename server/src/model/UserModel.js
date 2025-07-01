const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,

    },
    profilePic: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
    versionKey: false,
}
)

const UserModel = mongoose.model("User", DataSchema);

module.exports = UserModel;