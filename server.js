const express = require("express");
const DB_URL = require("./config/db.config");
const { address } = require("./controllers/address.controller");
const {signUp,login} = require("./controllers/auth.controller");
const { Product } = require("./controllers/product.controller");
const auth = require("./middleware/auth");
const db  = require("./models/index");
const app = express();
body_parser = require("body-parser");


const port = 8085;

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Welcome");
})

app.post("/users",signUp);
app.post("/auth",auth,login);
app.post("/addresses",auth, address);
app.post("/products", Product);

app.listen(port,()=>{
    console.log(port);
})

db.mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
module.exports = app;