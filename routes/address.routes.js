const { address } = require("../controllers/address.controller");
const app = require("./../app");


app.post("/addresses",  address);

module.exports = app;