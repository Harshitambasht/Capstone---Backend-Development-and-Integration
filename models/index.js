const mongoose = require("mongoose") 
const db ={};
db.mongoose = mongoose;
// db.adresse = require("./address.model")(mongoose);
// db.order = require("./order.model")(mongoose);
// db.product = require("./product.model")(mongoose);
db.users = require("./user.model")(mongoose);

module.exports = db;