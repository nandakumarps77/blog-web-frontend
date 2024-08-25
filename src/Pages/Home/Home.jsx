import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [commentsInput, setCommentsInput] = useState({}); // State to manage input for each blog
  const [user, setProfile] = useState({});

  const onInput = (e, id) => {
    setCommentsInput((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const onClickComment = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5555/api/blog/addcomment/${id}`,
        { content: commentsInput[id] }, // Send comment data for the specific blog
        {
          withCredentials: true,
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setCommentsInput((prev) => ({
        ...prev,
        [id]: "",
      }));
    
      fetchBlog();
    } catch (e) {
      console.log(e);
    }
  };

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
      console.log(response.data.data);
      
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const [showComments, setShowComments] = useState({}); // State to manage visibility of comments for each blog

  const handleToggleComments = (id) => {
    setShowComments((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle visibility
    }));
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5555/api/user/getUser",
        {
          withCredentials: true,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setProfile(response.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="col-12 d-flex flex-wrap">
        {blogs.map((item) => (
          <div className="card col-md-6 col-lg-4 mx-0" key={item._id}>
            <div className="card-header">
              <img
                className="im"
                src={`http://localhost:5555/images/${item.coverImage}`}
                alt={`${item.title} cover`}
                crossOrigin="anonymous"
                onError={(e) => (e.target.src = "fallback-image-url.jpg")} // Fallback image URL
              />
            </div>
            <div className="card-body">
              <div className="tags">
                <p>Tag:{item.tags}</p>
              </div>
              <h4>{item.title}</h4>
              <p>{item.content}</p>

              <input
                type="text"
                className="te"
                placeholder="Comment"
                value={commentsInput[item._id] || ""}
                onChange={(e) => onInput(e, item._id)}
              />
              <button
                class="btn btn-success p-1 mb-3"
                onClick={() => onClickComment(item._id)}
              >
                Comment
              </button>

              <button
                className="btn"
                onClick={() => handleToggleComments(item._id)}
              >
                {showComments[item._id] ? "Hide Comments" : "Show Comments"}
              </button>

              {showComments[item._id] && (
                <div className="comments-box box">
                  {item.comments && item.comments.length > 0 ? (
                    user &&
                    item.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <p>
                          <strong>
                          {user.username}: {comment.content}
                          </strong>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
