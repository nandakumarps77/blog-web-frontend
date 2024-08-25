import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./userblog.css";
import EditIcon from "@mui/icons-material/Edit";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5555/api/blog/getBlogs",
        {
          withCredentials: true,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/blog/deleteblog/${id}`,  {
          withCredentials: true,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
    );
      fetchBlog();
    } catch (e) {
      console.log("Error deleting:", e);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="col-12 d-flex flex-wrap">
      {blogs.length > 0 ? (
        blogs.map((item) => (
          <div className="card col-md-6 col-lg-4 mx-0" key={item._id}>
            <div className="card-header">
              <img
                className="im"
                src={`http://localhost:5555/images/${item.coverImage}`}
                alt={`${item.title} cover`}
                crossOrigin="anonymous"
              />
            </div>
            <div className="card-body">
              <p>Tags:{item.tags}</p>
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <div className="card-user d-flex justify-content-between w-100">
                <button className="btn" onClick={() => onClickDelete(item._id)}>
                  Delete
                </button>
                <NavLink lassName="bt" to={`/edit-blog/${item._id}`}>
                  <EditIcon
                    fontSize="large"
                    className="text-danger fontSize=large edit border border-danger rounded-circle p-1"
                  />
                </NavLink>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default UserBlog;
