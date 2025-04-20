const blogService = require('./blogs.services');

exports.createBlog = (req, res) => {
  const blog = req.body;

  blogService.createBlog(blog, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error creating blog', error: err });
    } else {
      res.status(201).send({ message: 'Blog created', data: result });
    }
  });
};

exports.getAllBlogs = (req, res) => {
  blogService.getAllBlogs((err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching blogs', error: err });
    } else {
      res.status(200).send(results);
    }
  });
};

exports.getBlogById = (req, res) => {
  const id = req.params.id;

  blogService.getBlogById(id, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching blog', error: err });
    } else {
      res.status(200).send(result[0]);
    }
  });
};

exports.updateBlog = (req, res) => {
  const id = req.params.id;
  const blog = req.body;

  blogService.updateBlog(id, blog, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: 'Error updating blog', error: err });
    } else {
      console.log("Blog Updated")
      res.status(200).send({ message: 'Blog updated successfully' });
    }
  });
};

exports.deleteBlog = (req, res) => {
  const id = req.params.id;

  blogService.deleteBlog(id, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting blog', error: err });
    } else {
      res.status(200).send({ message: 'Blog deleted successfully' });
    }
  });
};
