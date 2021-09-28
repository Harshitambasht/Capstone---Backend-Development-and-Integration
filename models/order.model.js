const mongoose = require("mongoose");
require("mongoose-double")(mongoose)
var SchemaTypes = mongoose.Schema.Types;

let orderSchema = new mongoose.Schema({
   quantity:{
       type:Number,
       required:true,
   },
   address:{
       type:Object,
       required:true,
   },
   product:{
       type:Object,
       required:true,
   },
   user:{
       type:Object,
   },

   orderDate:{
       type:Date,
       default:Date.now(),
   },
   amount:{
       type:SchemaTypes.Double,
   },

},
)


const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;
