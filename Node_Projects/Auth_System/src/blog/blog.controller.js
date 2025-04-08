const blogService = require("../blog/blog.services");

exports.create = async (req, res) => {
  const { title, description, author } = req.body;
  if (!title || !description || !author) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const blog = await blogService.createBlog(title, description, author);
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const blogs = await blogService.findAllBlogs();
    res.send({ message: "Blogs data", blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findAllByTitle = async (req, res) => {
  const title = req.query.title;
  try {
    const blogs = await blogService.findBlogsByTitle(title);
    res.send({ message: "Blogs data", blogs });
  } catch (err) {
    console.error("Error fetching blogs by title:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogService.findBlogById(id);
    if (!blog) {
      return res.status(400).json({ message: "No blog found with id: " + id });
    }
    res.json({ message: "Data found", blog });
  } catch (err) {
    console.error("Error fetching blog by id:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const result = await blogService.updateBlog(id, updateData);
    if (!result) {
      return res.status(400).json({ message: "No blog found with id: " + id });
    }
    res.json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await blogService.deleteBlog(id);
    if (!result) {
      return res.status(400).json({ message: "No blog found with id: " + id });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
