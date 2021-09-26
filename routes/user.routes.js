const app = require("./../app");
const {signUp,login} = require("./../controllers/auth.controller");
const auth = require("./../middleware/auth");


app.post("/users",signUp);
app.post("/auth",auth,login);

module.exports = app,auth;
