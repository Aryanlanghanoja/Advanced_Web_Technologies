import PropTypes from 'prop-types';

const BlogsTable = ({ blogs, onEdit, onDelete }) => {
  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return <p>No blogs available.</p>;
  }

  return (
    <div>
      <h2>Blogs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author Name</th>
            <th>Content</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog._id}</td>
              <td>{blog.title}</td>
              <td>{blog.author_name}</td>
              <td>{blog.content}</td>
              <td>{new Date(blog.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(blog._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default BlogsTable;