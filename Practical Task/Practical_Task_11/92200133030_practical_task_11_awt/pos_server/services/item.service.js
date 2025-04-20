const Item = require('../models/item.model');

exports.getAllItems = async () => {
  return await Item.findAll();
};

exports.searchItems = async (keyword) => {
  return await Item.findAll({
    where: {
      name: {
        [require('sequelize').Op.like]: `%${keyword}%`
      }
    }
  });
};

exports.getItemById = async (id) => {
  return await Item.findByPk(id);
};