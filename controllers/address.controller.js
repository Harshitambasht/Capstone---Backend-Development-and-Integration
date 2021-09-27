const Addresses = require("./../models/address.model");
exports.address = (req, res) =>  {
const {
    name,
    city,
    state,
    street,
    contactNumber,
    landmark,
    zipcode,

} = req.body;

const newAddress= new Addresses({
    name,
    city,
    state,
    street,
    contactNumber,
    landmark,
    zipcode,
  
});


const filter={name:name}
Addresses.findOneAndUpdate(filter,{ useFindAndModify: false })
.then(data=>{
   {
        newAddress.save((err, user) => {
if (err)
              return res.status("400").send(err.message || "some error occurred");
            
              
            res.status(200).send(user);
          });
    }
   
})
};
