const Products = require("./../models/product.model");

//create and save products
function Product(req, res) {

    const {
        name,
        category,
        price,
        description,
        manufacturer,
        availableItems,
        imageURL,

    } = req.body;

    const newProduct = new Products({
        name,
        category,
        price,
        description,
        manufacturer,
        availableItems,
        imageURL,

    });

    // Save Product in the database
    const filter = { name: name }
    Products.findOneAndUpdate(filter, { useFindAndModify: false })
        .then(data => {
            {
                newProduct.save((err, user) => {
                    if (err)
                        return res.status("400").send(err.message || "some error occurred");


                    res.status(200).send(user);
                });
            }

        })
};

//Search Product
async function getAllProducts(req, res) {
    if (!req.query.category && !req.query.name) {
        let products = await Products.find().sort('_id');
        res.send(products);
        return;
    }
    const direction = req.query.direction === "ASC" ? +1 : -1;
    let products = await Products.find().or([{ name: req.query.name }, { category: req.query.category }])
        .sort({ price: direction });
    res.send(products);
}

//Get Product Categories 
async function getProductCategory(req, res) {
    const products = await Products.find().select("category").distinct("category");
    res.send(products);
}

//get product by Id
async function getProductById(req, res) {
    const product = await Products.findById(req.params.id);

    if (!product)
        return res.status(404).send(`No Product found for ID ${req.params.id}`);
    res.send(product);
}

//Update Product Details by id
async function updateProductDetails(req, res) {
    const product = await Products.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            imageURL: req.body.imageURL,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
        },
        { new: true }
    );
    if (!product){
        return res.status(404).send("No Product found for ID - <id>!");
    }
        else{
    res.send({
        productId: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        manufacturer: product.manufacturer,
        availableItems: product.availableItems,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    
    })};
}

//Delete Product by id
async function deleteProduct(req, res) {
    const product = await Product.findByIdAndRemove(req.params.id);

    
    res
    .status(200)
    .send(product);
    if (!product){
        return res.status(404).send("The product with the given ID was not found.");
      }
        else{
          return res.status(404).send("Product with ID - <id> deleted successfully!");
        }
}
module.exports = { Product, getAllProducts, getProductCategory, getProductById, updateProductDetails, deleteProduct };
