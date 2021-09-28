const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({


    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    name: {
        type: String,

    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 20,
    },
    contactNumber: {
        type: String,
        required: true,
        min: 10,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    token: {
        type: String,
    },
    isAuthenticated: {
        type: Boolean
    },
    name: String,
    isAdmin: {
        type: Boolean,
    }



}, { timestamps: true })

userSchema.pre("save", function (next) {
    this.name = this.firstName + " " + this.lastName;
    next();
})


const Users = mongoose.model("users", userSchema);

module.exports = Users;