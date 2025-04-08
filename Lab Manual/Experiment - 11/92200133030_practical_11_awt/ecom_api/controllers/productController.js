const Product = require('../models/Product');
const { Op } = require('sequelize');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }   
};

// Get all products with optional filters
exports.getProducts = async (req, res) => {
    try {
        const { name, brand, category, minPrice, maxPrice, tags } = req.query;

        let filters = {};

        if (name) filters.name = { [Op.like]: `%${name}%` };
        if (brand) filters.brand = { [Op.like]: `%${brand}%` };
        if (category) filters.category = category;
        if (minPrice || maxPrice) filters.price = {};
        if (minPrice) filters.price[Op.gte] = parseFloat(minPrice);
        if (maxPrice) filters.price[Op.lte] = parseFloat(maxPrice);
        if (tags) {
            filters.tags = { [Op.like]: `%${tags}%` };
        }

        const products = await Product.findAll({ where: filters });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
