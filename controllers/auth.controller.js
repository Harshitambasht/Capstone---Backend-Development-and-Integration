const db = require("./../models");
const User = db.users;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Create and Save a user
exports.signUp = (req, res) => {
    // Validate request
    if (!req.body.email && !req.body.password) {
      res.status(400).send({ message: "Please provide email and password to continue." });
      return;
    }

    const email = req.body.email;
  
    if (email == 'admin1@upgrad.com' || email == 'admin2@upgrad.com') {
      res.status(400).send({ message: "Sorry, You cannot register as ADMIN." });
      return;
    }

    const filter = { email: email };

    //Find user based on the email provided in API req 
    User.findOne(filter, (err, user)=>{
     
      if(err || user === null){
        //If not found

//Encrypt the password

const salt = bcrypt.genSaltSync(10)
const hashPassword = bcrypt.hashSync(req.body.password, salt)

        // Create a User
        const user = new User({
          firstName: req.body.firstName, 
          lastName: req.body.lastName,
          contactno: req.body.contactno,
          email: email,
          password: hashPassword,
          role: req.body.role ? req.body.role : 'user',
          isAdmin : true,   
        });

        user.save((err, user) => {
          if (err)
            return res.status("400").send(err.message || "some error occurred");      
          res.status(200).send(user);
        });
      }else {//User found with same email
        res.status(400).send({
          message: "Try any other email, this email is already registered!"
        });
      }
      
    });

  };

// Retrieve user using the email provided in the req parameter.
// Validate user by matching the password provided in the req parameter.
exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate request
    if (!email && !password) {
      res.status(400).send({ message: "Please provide email and password to continue." });
      return;
    }

    const filter = { email: email };
    User.findOne(filter, (err, user)=>{
     
      if(err || user === null){
        res.status(401).send({
          //better message wrt security. Prevents brute force attacks
          message: "Email or password not correct."
        });
      }else {
        if(bcrypt.compareSync(password, user.password)){
          user.isLoggedIn = true;
            
          User.findOneAndUpdate(filter, user, { useFindAndModify: false })
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

        }else{
          res.status(401).send({
            message: "Invalid Credentials!"
          });
        }
      }
      
    });

  };

// Update isLoggedIn parameter of a User.
exports.logout = (req, res) => {

  // Validate request
  if (!req.body.id) {
    res.status(400).send({ message: "Please provide user Id." });
    return;
  }

  const id = req.body.id;
  const update = { isLoggedIn: false };

  User.findByIdAndUpdate(id, update)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Some error occurred, please try again later."
        });
      } else res.send({ message: "Logged Out successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating."
      });
    });
};