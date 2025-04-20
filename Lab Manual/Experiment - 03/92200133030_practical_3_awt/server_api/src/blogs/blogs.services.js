const Blog = require('./blogs.model');

const createBlog = (data, callback) => {
  Blog.create(data, callback);
};

const getAllBlogs = (callback) => {
  Blog.findAll(callback);
};

const getBlogById = (id, callback) => {
  Blog.findById(id, callback);
};

const updateBlog = (id, data, callback) => {
  Blog.update(id, data, callback);
};

const deleteBlog = (id, callback) => {
  Blog.delete(id, callback);
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
};
