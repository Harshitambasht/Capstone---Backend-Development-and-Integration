const { Product, getAllProducts, getProductCategory, getProductById, updateProductDetails, deleteProduct } = require("./../controllers/product.controller");
const app = require("./../app");


app.post("/products",  Product.Product);
app.get("/products",  getAllProducts);
app.get("/products/categories",  getProductCategory);
app.get("/products/:id", getProductById);
app.put("/products/:id", updateProductDetails);
app.delete("/products/:id", deleteProduct);

module.exports = app;