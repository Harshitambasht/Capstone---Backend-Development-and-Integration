const Users = require("./../models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt=require("jsonwebtoken");

  function signUp(req,res) {
      
    const {
      email,
      firstName,
      lastName,
      contactNumber,
      password
    } = req.body
    parts = email.split("@");
    domain = parts[1].split(".");
   // console.log(email,parts,domain);

    const newUser = new Users({
      password :bcrypt.hashSync(password,salt),
      email:email,
      firstName,
      lastName,
      contactNumber,
      
      
      
    });
      
    //----How bycrypt works-----
    // // const password = req.body.password;
    // // const hash = bcrypt.hashSync((password), salt);
    // // console.log(hash);    // hash = encrypted password

    // email validation       1.regex     2.length
    var isEmail = function(str) {
        return typeof str==='string' && /[a-zA-Z0-9.-]+[@]+[a-zA-Z0-9.-]+[.]+[a-z]/g.test(str);
      }


    const inValid = function(){
        if(parts[0].length <1|| domain[0].length <1){
          return true;
        }
       if(domain[1].length<2 || domain[1].length>=7) return true;
      }

      
      if(!isEmail(email)){
      res.status(400).send("Invalid email-id format!")}

      // contact number validation
      if(!validator.isMobilePhone(req.body.contactNumber) || (req.body.contactNumber).length !== 10){
           res.status(400).send("Invalid contact number!");
           }

      else if(inValid()){
      res.status(400).send("Invalid email-id format!");}
      
      else{
      Users.findOne({ email: email }, (err, user) => {
        if (err || user === null) {

        // if user not exist
          newUser.save((err, user) => {
            if (err)
              return res.status("400").send(err.message || "some error occurred");
            
              
            res.status(200).send(user);
          });
        } else {
          // email exists in db
          res.status(400).send("Try any other email, this email is already registered!");
        }
      })
}


  }

  function login(req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const filter = {$and:[{email:email},{password:password}]};
   
 
  Users.findOneAndUpdate(filter, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: "This email has not been registered!"
      });
    } else{          
     
      const token = jwt.sign({_id: data.id}, "myprivatekey");
     data.token=token;
      data.isAuthenticated = true;
      const secret={email:data.email,name:data.firstName+" "+data.lastName,isAuthenticated:data.isAuthenticated}           
     res.send(secret);
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating."
    });
  });
}



  

module.exports = {signUp,login};