const mongoose = require("mongoose");
require("mongoose-double")(mongoose)
var SchemaTypes = mongoose.Schema.Types;

let productSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    category: {
        type: String,
    },
    price: {
        type:SchemaTypes.Double,
    },
    description: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
   
    availableItems: {
        type:Number,
    },
   
    imageURL: {
        type: String,
    },


},
{ timestamps: true },
)


const Products = mongoose.model("products", productSchema);

module.exports = Products;
