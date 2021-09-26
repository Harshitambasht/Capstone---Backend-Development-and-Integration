const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
const token = req.headers['x-access-token'] || req.headers['authorization'];

if(!token) return res.status(401).send("Access denied");
try{
jwt.verify(token, "myprivatekey");
next();
}catch(exception){
    res.status(400).send("Invalid token");
}

};