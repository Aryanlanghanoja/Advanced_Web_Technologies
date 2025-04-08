const BlogModel = require("../blog/blog.model");

exports.createBlog = async (title, description, author) => {
  const blog = new BlogModel({
    title,
    description,
    author,
  });
  return await blog.save();
};

exports.findAllBlogs = async () => {
  return await BlogModel.find();
};

exports.findBlogsByTitle = async (title) => {
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  return await BlogModel.find(condition);
};

exports.findBlogById = async (id) => {
  return await BlogModel.findById(id);
};

exports.updateBlog = async (id, updateData) => {
  return await BlogModel.findByIdAndUpdate(id, updateData, {
    useFindAndModify: false,
  });
};

exports.deleteBlog = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
};
