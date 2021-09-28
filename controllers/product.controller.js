const Products = require("./../models/product.model");

//create and save products
exports.Product = (req, res) => {

    const {
        name,
        category,
        price,
        description,
        manufacturer,
        availableItems,
        imageURL,
    
    } = req.body;
    
    const newProduct= new Products({
        name,
        category,
        price,
        description,
        manufacturer,
        availableItems,
        imageURL,
      
    });
  
    // Save Course in the database
    const filter={name:name}
    Products.findOneAndUpdate(filter,{ useFindAndModify: false })
.then(data=>{
   {
    newProduct.save((err, user) => {
if (err)
              return res.status("400").send(err.message || "some error occurred");
            
              
            res.status(200).send(user);
          });
    }
   
})
  };

