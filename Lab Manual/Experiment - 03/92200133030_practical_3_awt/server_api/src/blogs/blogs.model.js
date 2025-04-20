const db = require('../config/db.config');

class Blog {
  
  static create(blog, callback) {
    const query = `
      INSERT INTO blogs (id, title, author_name, content , date)
      VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [blog.id, blog.title, blog.author_name, blog.content , blog.date || new Date()], callback);
  }

  static findAll(callback) {
    const query = 'SELECT * FROM blogs';
    db.query(query, callback);
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM blogs WHERE id = ?';
    db.query(query, [id], callback);
  }

  static update(id, blog, callback) {
    const query = `
      UPDATE blogs
      SET title = ?, author_name = ?, content = ?, date = ?
      WHERE id = ?`;

    db.query(query, [blog.title, blog.author_name, blog.content, blog.date || new Date().split('T')[0], id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM blogs WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Blog;
