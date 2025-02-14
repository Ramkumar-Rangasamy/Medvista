import React, { useEffect, useRef, useState } from "react";
import './admincreateblog.css';
import Admineditor from "./Admineditor";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const SupplierBlogUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    // supplierName: "",
    categories: "",
    // selectedConditions: [], // Ensure this is always an array
    hashtags: "",
    priority: "",
    description: "",
    image: null,
    authorId: ""
  });

  const [suppliers, setSuppliers] = useState([]);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [conditions, setConditions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/supplier-blog`, {
          withCredentials: true,
        });
        console.log("Response:", response.data);
  
        const supplierData = response.data?.suppliers || [];
        // const adminData = response.data.admin ? [{ _id: response.data.admin._id, name: response.data.admin.name }] : [];
        console.log(supplierData[0]._id);
        
        setConditions(supplierData);
        setSuppliers(supplierData);
      } catch (error) {
        console.error("Error during fetchSuppliers:", error);
        toast.info("Failed to fetch suppliers.");
      }
    };
  
    fetchSuppliers();
  }, []);
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleAddClick = () => {
    setFormData({
      title: "",
      supplierName: "",
      categories: "",
      hashtags: "",
      priority: "",
      description: "",
      image: null,
      authorId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plainTextDescription = formData.description.replace(/<[^>]*>/g, "").trim();
    if (!plainTextDescription) {
      toast.error("Please fill in the description to publish the blog.");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload an image to publish the blog.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
    
      console.log(`${process.env.REACT_APP_BASE_URL}/admin/supplier-blog-upload`); // Debug URL
    
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/supplier-blog-upload`, formDataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
    
      if (res.data) {
        toast.success("Blog published successfully!");
        handleAddClick();
      } else {
        toast.error("Failed to publish blog.");
      }
    } catch (error) {
      toast.error("An error occurred while publishing the blog.");
      console.error(error);
    }
    
  };

  const categories = ["Technology", "Health", "Business", "Logistics", "Food", "Lifestyle"];

  return (
    <>
      <ToastContainer />
      <div className="admin-create-blog">
        <h2 className="admin-create-blog-title">Create Blog</h2>
        <div className="admin-create-blog-form-container">
          <form className="admin-create-blog-form-gap" onSubmit={handleSubmit}>
            <div className="admin-create-blog-header">
              <input
                type="text"
                value={formData.title}
                name="title"
                className="admin-create-blog-input"
                onChange={handleChange}
                required
              />
              <p className="admin-create-blog-placeholder">
                Title
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="admin-create-blog-header">
              <select
                value={formData.categories}
                name="categories"
                className="admin-create-blog-input"
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Choose Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="admin-create-blog-placeholder">
                Category
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            {/* <div className="publish-blog-header">
              <p className="publish-blog-placeholder">
                Conditions
                <span style={{ color: "red" }}> *</span>
              </p>
              <select
                value={formData.selectedConditions}
                className="publish-blog-input"
                multiple  
                onChange={(e) => {
                  const value = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({ ...formData, selectedConditions: value });
                }}
                required
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
            </div> */}

            <div className="admin-create-blog-header">
              <input
                type="text"
                value={formData.hashtags}
                name="hashtags"
                className="admin-create-blog-input"
                onChange={handleChange}
                required
              />
              <p className="admin-create-blog-placeholder">
                Hashtags (separated with a comma)
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="admin-create-blog-header">
              <p className="admin-create-blog-placeholder-status">
                Priority
                <span style={{ color: "red" }}> *</span>
              </p>
              <div className="admin-create-blog-check-hilo">
                <div className="admin-create-blog-radio-input-header">
                  <input
                    type="radio"
                    id="check-high"
                    name="priority"
                    value="high"
                    checked={formData.priority === "high"}
                    onChange={() => setFormData({ ...formData, priority: "high" })}
                    required
                  />
                  <label
                    htmlFor="check-high"
                    className="admin-create-blog-radio-radio-label"
                  >
                    High
                  </label>
                </div>
                <div className="admin-create-blog-radio-input-header">
                  <input
                    type="radio"
                    id="check-low"
                    name="priority"
                    value="low"
                    checked={formData.priority === "low"}
                    onChange={() => setFormData({ ...formData, priority: "low" })}
                    required
                  />
                  <label
                    htmlFor="check-low"
                    className="admin-create-blog-radio-radio-label"
                  >
                    Low
                  </label>
                </div>
              </div>
            </div>

            <div className="admin-create-blog-header">
              <select
                value={formData.authorId}
                name="authorId"
                className="admin-create-blog-input"
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Assign a Author
                </option>
                {Array.isArray(suppliers) && suppliers.map((supplier, index) => (
                  <option key={index} value={supplier._id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              <p className="admin-create-blog-placeholder">
                Assign Author
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="admin-create-blog-editor-and-file-container">
              <div className="admin-create-blog-editor-box">
              <Admineditor
                  defaultText="Description"
                  onTextChange={(content) => setFormData({ ...formData, description: content })}
                />
              </div>

              <div className="admin-create-blog-header-file">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="admin-create-blog-file-input"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  required
                />
                <p className="admin-create-blog-file-name">{formData?.image?.name}</p>

                <div
                  className="choose-file-admin-create-blog"
                  onClick={() => fileInputRef.current.click()}
                >
                  <span>Choose File</span>
                </div>
                <p className="admin-create-blog-placeholder">
                Image size less than 2MB
                  <span style={{ color: "red" }}> *</span>
                </p>
              </div>
            </div>

            <div className="preview-toggle">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="toggle-preview-button"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>

            {showPreview && (
              <div className="blog-preview">
                <h3>Preview</h3>
                {formData.image && (
                  <div>
                    <strong>Image:</strong>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Blog"
                      className="preview-image"
                    />
                  </div>
                )}
                <h2>{formData.title || "Blog Title"}</h2>
                {/* <p><strong>Author:</strong> {formData.author || "Author Name"}</p> */}
                <p><strong>Category:</strong> {formData.categories || "Category"}</p>
                <p>
                  <strong>Conditions:</strong>{" "}
                  {Array.isArray(formData.selectedConditions) && formData.selectedConditions.length > 0
                    ? formData.selectedConditions.join(", ")
                    : "No Conditions Selected"}
                </p>
                <p><strong>Tags:</strong> {formData.hashtags || "#tags"}</p>
                <p><strong>Priority:</strong> {formData.priority || "Low"}</p>
                <div>
                  <strong>Description:</strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formData.description || "<p>No description provided.</p>",
                    }}
                  />
                </div>
             
              </div>
            )}
            <div className="admin-create-blog-button">
              <button type="submit" className="admin-create-blog-button-inside">
                Publish Blog
              </button>
              <div className="admin-create-blog-button-inside" onClick={handleAddClick}>
                <span>Cancel</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SupplierBlogUploadForm;
