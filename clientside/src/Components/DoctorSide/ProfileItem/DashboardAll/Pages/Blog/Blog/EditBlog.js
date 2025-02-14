
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Editor from "../AddBlog/Editor";
const EditBlog = ({ blog, onCancel, loadBlogs }) => {
  const [loading, setLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    category: "",
    selectedConditions: [],
    hashtags: "",
    priority: "",
    description: "",
    image: null,
    save: false,
  });
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [conditions, setConditions] = useState([]);

  const [subCategories, setSubCategories] = useState({
    Technology: ["AI", "Blockchain", "Cybersecurity"],
    Health: ["Nutrition", "Mental Health", "Fitness"],
    Travel: ["Adventure", "Culture", "Guides"],
    Food: ["Recipes", "Reviews", "Nutrition"],
    Lifestyle: ["Fashion", "Home Decor", "Wellness"],
  });

  const categories = Object.keys(subCategories);
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/blog`);
        if (response.data && response.data.conditions) {
          setConditions(response.data.conditions); 
        } else {
          toast.info("Failed to fetch conditions");
        }
      } catch (error) {
        
        toast.info("Error fetching conditions from server");
      }
    };
    
    fetchConditions();
  }, []); 

  useEffect(() => {
    if (blog) {
      setNewBlog((prev) => ({
        ...prev,
        title: blog.title || "",
        author: blog.author || "",
        category: blog.category || "",
        selectedConditions: blog.selectedConditions || [],
        hashtags: blog.hashtags.join(',') || "",
        priority: blog.priority || "low",
        description: blog.description || "",
        image: blog.image || null,
        save: false,
      }));
      setLoading(false);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Blog submitted:", newBlog);
  };
  const handlePublish = async () => {
     toast.info("Blog Published");
    console.log("Blog submitted:", newBlog);
    try {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("author", newBlog.author);
      formData.append("category", newBlog.category);
      formData.append("selectedConditions", JSON.stringify(newBlog.selectedConditions));
      formData.append("hashtags", newBlog.hashtags);
      formData.append("priority", newBlog.priority);
      formData.append("description", newBlog.description);
      if (newBlog.image) {
        formData.append("image", newBlog.image);
      }
  
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/blogs/edit/${blog._id}`, 
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res);
      if (res.data) {
        console.log("Blog updated successfully:", res.data);
        loadBlogs();
        onCancel();
         toast.info("Blog updated successfully!");
      } else {
        console.error("Failed to update Blog:", res.data);
        toast.info("Failed to update Blog.");
      }
    } catch (e) {
      console.log(e);
      toast.info("An error occurred while updating the blog.");
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="publish-blog-container">
      <ToastContainer />
      <h2 className="blog-title">Edit Blog</h2>
      <form className="publish-blog-gap" onSubmit={handleSubmit}>
        <div className="publish-blog-header">
          <input
            type="text"
            value={newBlog.title}
            className="publish-blog-input"
            onChange={(e) =>
              setNewBlog({ ...newBlog, title: e.target.value })
            }
            required
          />
          <p className="publish-blog-placeholder">
         Title
            <span style={{ color: "red" }}> *</span>
          </p>
        </div>

        {/* <div className="publish-blog-header">
          <input
            type="text"
            value={newBlog.author}
            className="publish-blog-input"
            onChange={(e) =>
              setNewBlog({ ...newBlog, author: e.target.value })
            }
            required
          />
          <p className="publish-blog-placeholder">
            Author Name
            <span style={{ color: "red" }}> *</span>
          </p>
        </div> */}

        <div className="publish-blog-header">
          <select
            value={newBlog.category}
            className="publish-blog-input"
            onChange={(e) =>
              setNewBlog({ ...newBlog, category: e.target.value, subcategories: "" })
            }
            required
          >
            <option value="" disabled hidden>
              Choose  Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p className="publish-blog-placeholder">
         Category
            <span style={{ color: "red" }}> *</span>
          </p>
        </div>

        <div className="publish-blog-header">
  <p className="publish-blog-placeholder">
    Select Conditions
    <span style={{ color: "red" }}> *</span>
  </p>
  <select
    value={newBlog.selectedConditions}
    className="publish-blog-input"
    onChange={(e) => {
      const value = Array.from(e.target.selectedOptions, option => option.value);
      setNewBlog({ ...newBlog, selectedConditions: value });
    }}
  >
    <option value="" disabled hidden>
      Choose Conditions
    </option>
    {conditions.length > 0 ? (
      conditions.map((condition, index) => (
        <option key={index} value={condition.name}>
          {condition.name}
        </option>
      ))
    ) : (
      <option disabled>No conditions available</option>
    )}
  </select>
  <p className="publish-blog-placeholder">
   Conditions
  </p>
</div>

        <div className="publish-blog-header">
          <input
            type="text"
            value={newBlog.hashtags}
            className="publish-blog-input"
            onChange={(e) =>
              setNewBlog({ ...newBlog, hashtags: e.target.value })
            }
            required
          />
          <p className="publish-blog-placeholder">
            Tags (separated with a comma)
            <span style={{ color: "red" }}> *</span>
          </p>
        </div>

        <div className="publish-blog-header">
          <p className="publish-blog-placeholder-status">
       priority
            <span style={{ color: "red" }}> *</span>
          </p>
          <div className="publish-blog-check-aina">
            <div className="radio-input-label">
              <input
                type="radio"
                id="check-high"
                className="checkbox"
                checked={newBlog.priority === "high"}
                onChange={() =>
                  setNewBlog({
                    ...newBlog,
                    priority: "high",
                  })
                }
              />
              <label htmlFor="check-high" className="radio-label">
                High
              </label>
            </div>
            <div className="radio-input-label">
              <input
                type="radio"
                id="check-low"
                className="checkbox"
                checked={newBlog.priority === "low"}
                onChange={() =>
                  setNewBlog({
                    ...newBlog,
                    priority: "low",
                  })
                }
              />
              <label htmlFor="check-low" className="radio-label">
                Low
              </label>
            </div>
          </div>
        </div>

        <div className="editor-and-file-container">
        <div className="editor-box">
        <Editor
  ref={quillRef}
  value={newBlog.description}
  defaultText="Description"
  onTextChange={(content) => {
    setNewBlog({ ...newBlog, description: content });
  }}
/>

      </div>
      <div className="description-preview" style={{ marginTop: '20px' }}>
        <h3>Description Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: newBlog.description }} />
      </div>
          <div className="publish-blog-header-file">
            <input
              type="file"
              ref={fileInputRef}
              className="publish-file-input"
              onChange={(e) =>
                setNewBlog({ ...newBlog, image: e.target.files[0] })
              }
            />
            <p className="publish-file-name">{newBlog?.image?.name || "No file chosen"}</p>

            <div 
              className="choose-file-publish" 
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: "pointer" }}
            >
              <span>Choose File</span>
            </div>
            <p className="publish-blog-placeholder">
              Image
              <span style={{ color: "red" }}> *</span>
            </p>
          </div>
        </div>

        <div className="publish-button">
          <button 
            type="button" 
            className="publish-button-inside" 
            onClick={handlePublish}
          >
            <span>Request Publish</span>
          </button>
          <button 
            type="button" 
            className="publish-button-inside" 
            onClick={onCancel}
            style={{ background: "#3334480D", color: "black" }}
          >
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
