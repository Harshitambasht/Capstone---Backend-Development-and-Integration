const Users = require("../models/user.model");
const Addresses = require("./../models/address.model");
const Orders = require("./../models/order.model");
const Products = require("./../models/product.model");

 async function orders(req,res){
   
     const product = await Products.findById(req.body.productId)
     if (!product)
       return res
         .status(400)
         .send(`No Product found for ID - ${req.body.productId}!`);
     const address = await Addresses.findById(req.body.addressId)
     if (!address)
     return res
       .status(400)
       .send(`No Address found for ID - ${req.body.addressId}!`);
       if (product.availableItems === 0)
       return res
         .status(400)
         .send(
           `Product with ID - ${req.body.productId} is currently out of stock!`
         );
     const name = address.name

     const user = await Users.findOne({name:name})
     
        var order= new Orders({
          product:product,
          address:address,
          quantity:req.body.quantity,
          user:user,
          amount:req.body.quantity * product.price
        })

        order.save((err,user)=>{
            if(err) throw err;
            res
            .status(200)
            .send(user);
        })
}

module.exports=orders;