const mongoose = require("mongoose");

let addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    contactNumber: {
        type: Number,
        max:10,
        required:true,
    },
    street: {
        type: String,
        required:true,
    },
    
    landmark: {
        type: String,
    },
    city: {
        type: String,
        required:true,
    },
   
    state: {
        type: String,
        required:true,
    },
   
    zipcode: {
        type: Number,
        min:6,
        max:10,
        required:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },


},
{ timestamps: true },
)


const Addresses = mongoose.model("addresses", addressSchema);

module.exports = Addresses;
