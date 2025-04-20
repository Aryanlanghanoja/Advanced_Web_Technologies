const blogService = require('../services/blog.service');

exports.getAll = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newBlog = await blogService.createBlog(req.body);
    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    await blogService.updateBlog(req.params.id, req.body);
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};
