const productService = require("../services/productService");

exports.getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
};

exports.getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (product) res.json(product);
  else res.status(404).send("Product not found");
};

exports.updateProduct = async (req, res) => {
  const updated = await productService.updateProduct(req.params.id, req.body);
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(204).send();
};