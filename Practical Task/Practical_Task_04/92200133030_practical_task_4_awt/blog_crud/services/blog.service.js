const Blog = require('../models/blog.model');

const getAllBlogs = () => Blog.findAll();
const getBlogById = (id) => Blog.findByPk(id);
const createBlog = (data) => Blog.create(data);
const updateBlog = (id, data) => Blog.update(data, { where: { id } });
const deleteBlog = (id) => Blog.destroy({ where: { id } });

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
