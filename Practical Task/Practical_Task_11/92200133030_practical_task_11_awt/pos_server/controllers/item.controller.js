const itemService = require('../services/item.service');

exports.getItems = async (req, res) => {
  const items = await itemService.getAllItems();
  res.json(items);
};

exports.searchItems = async (req, res) => {
  const { keyword } = req.query;
  const results = await itemService.searchItems(keyword || '');
  res.json(results);
};