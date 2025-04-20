const db = require("../models");

exports.getAllProducts = async () => {
  return await db.Product.findAll();
};

exports.createProduct = async (data) => {
  return await db.Product.create(data);
};

exports.getProductById = async (id) => {
  return await db.Product.findByPk(id);
};

exports.updateProduct = async (id, data) => {
  const product = await db.Product.findByPk(id);
  if (product) {
    return await product.update(data);
  }
  return null;
};

exports.deleteProduct = async (id) => {
  const product = await db.Product.findByPk(id);
  if (product) {
    await product.destroy();
  }
};