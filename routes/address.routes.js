const { address } = require("../controllers/address.controller");
const auth = require("../middleware/auth");
const app = require("./../app");


app.post("/addresses", auth, address);

module.exports = app;