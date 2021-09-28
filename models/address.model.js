const mongoose = require("mongoose");

let addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    contactNumber: {
        type: Number,
        min:10,
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
        required:true,
    },
    user: {
        type: Object,
    },


},
{ timestamps: true },
)


const Addresses = mongoose.model("addresses", addressSchema);

module.exports = Addresses;
