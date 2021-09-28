const { Product } = require("./../controllers/product.controller");
const app = require("./../app");


app.post("/products",  Product);

module.exports = app;