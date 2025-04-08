import axios from "axios";
import React, { useEffect, useState } from "react";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, title: "test", author: "unknown", description: "pata nahi" },
  ]);
  useEffect(() => {
    fetchData();

    // return () => {
    //   second
    // }
  }, []);
  function fetchData() {
    axios
      .get("http://localhost:3000/api/blog/")
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateBlog = (blog) => {
    console.log("Update Blog Clicked", blog.id);

    // Prompt the user for new blog details
    const updatedTitle = prompt("Enter new title:", blog.title);
    const updatedAuthor = prompt("Enter new author:", blog.author);
    const updatedDescription = prompt("Enter new description:", blog.description);

    if (updatedTitle && updatedAuthor && updatedDescription) {
      axios
        .put(`http://localhost:3000/api/blog/${blog.id}`, {
          title: updatedTitle,
          author: updatedAuthor,
          description: updatedDescription,
        })
        .then((response) => {
          console.log("Blog updated:", response.data);
          fetchData();  // Refresh the list after updating
        })
        .catch((error) => {
          console.error("Error updating blog:", error);
        });
    }
  };

  // ✅ Delete Blog Function
  const deleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://localhost:3000/api/blog/${id}`)
        .then(() => {
          console.log(`Blog with ID ${id} deleted`);
          setBlogs(blogs.filter((blog) => blog.id !== id)); // Remove deleted blog from UI
        })
        .catch((error) => {
          console.error("Error deleting blog:", error);
        });
    }
  };
  

  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
       
        {blogs.map((blog) => {
            return (
                <tr key={blog.id}>
                    <td>{blog.title}</td>
                    <td>{blog.author}</td>
                    <td>{blog.description}</td>
                    <td>
                        <button onClick={() => updateBlog(blog)}>Edit</button>
                        <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                    </td>
                </tr>
            );
        })}

        </tbody>
      </table>
    </div>
  )
}

export default ListBlog
