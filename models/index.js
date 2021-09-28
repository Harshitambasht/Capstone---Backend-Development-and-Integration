const mongoose = require("mongoose") 
const db ={};
db.mongoose = mongoose;
db.addresses = require("./address.model")(mongoose);
// db.order = require("./order.model")(mongoose);
db.products = require("./product.model")(mongoose);
db.users = require("./user.model")(mongoose);

module.exports = db;