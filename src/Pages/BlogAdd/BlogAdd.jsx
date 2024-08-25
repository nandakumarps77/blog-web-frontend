import { useState } from "react";
import axios from "axios";
import "./blogadd.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import OptionalTags from "../../component/BlogAdd/OptionalTags";

const BlogAdd = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    content: "",
    image: null,
    tags: [], 
  });
 
  
  const onInput = (e, name) => {
    setData({ ...data, [name]: e.target.value });
  };
  const onImageChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };
  const handleTagsChange = (tags) => {
    setData({ ...data, tags });
    console.log("daataaa: ", data);
  };

  const onRegister = async () => {
    try {
      const formdata = new FormData();

      formdata.append("title", data.title);
      formdata.append("content", data.content);
      formdata.append("image", data.image);
      formdata.append("tags", JSON.stringify(data.tags));

      console.log(formdata);
      const response = await axios.post(
        "http://localhost:5555/api/blog/createBlog",
        formdata,
        {
          withCredentials: true,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("posted successfully");
      setData({
        title: "",
        content: "",
        image: null,
        tags: null,
      });
    } catch (e) {
      console.log(e);
    }
    console.log(data);
  };

  const updateBlogById = async () => {
    try {
      const formdata = new FormData();

      formdata.append("title", data.title);
      formdata.append("content", data.content);
      if (data.image) {
        formdata.append("image", data.image);
      }
      formdata.append("tags", JSON.stringify(data.tags)); // Append tags

      const response = await axios.put(
        `http://localhost:5555/api/blog/updateByid/${id}`,
        formdata,
        {
          withCredentials: true,
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

 

  return (
    <>
      <div className="blog">
        <div className="blog3">
          <div className="blog2">
            <h3>BLOG ADD</h3>
            <TextField
              className="tex"
              id="filled-basic"
              label="Title"
              variant="filled"
              onChange={(e) => {
                onInput(e, "title");
              }}
              value={data.title} // Update value
            />
            <TextField
              className="tex"
              id="filled-basic"
              label="Content"
              variant="filled"
              onChange={(e) => {
                onInput(e, "content");
              }}
              value={data.content} // Update value
            />
            <input
              type="file"
              placeholder="Image"
              onChange={(e) => {
                onImageChange(e);
              }}
            />
            <OptionalTags
              tags={data.tags}
              handleTagsChange={handleTagsChange}
            />
            <button className="btn" onClick={id ? updateBlogById : onRegister}>
              {id ? "Edit" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogAdd;
