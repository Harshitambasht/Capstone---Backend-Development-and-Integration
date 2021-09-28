const auth = require("../middleware/auth");
const app = require("./../app");
const orders = require("./../controllers/order.controller");


app.post("/orders", auth, orders);

module.exports = app;