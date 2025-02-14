import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserBlogComments.css';

// Function to calculate time difference as a human-readable string
const timeAgo = (date) => {
  const now = new Date();
  const commentDate = new Date(date);

  const diff = now - commentDate; // Difference in milliseconds
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
};

const Comment = ({ comments, BlogPageData }) => {
  const [commentImages, setCommentImages] = useState({});
  const [replyText, setReplyText] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [visibleComments, setVisibleComments] = useState(2); // Show only 3 comments initially
  const [isSaving, setIsSaving] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({}); // Track visible replies per comment


  // Function to convert buffer to base64
  const bufferToBase64 = (buffer) => {
    if (typeof buffer === "string") {
      return `data:image/jpeg;base64,${buffer}`;
    } else if (buffer?.type === "Buffer" && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return `data:image/jpeg;base64,${btoa(binary)}`;
    } else {
      console.error("Unexpected buffer type:", typeof buffer);
      return "";
    }
  };

  // Convert images when comments change
  useEffect(() => {
    const convertImages = () => {
      const images = {};
      comments.forEach((comment) => {
        if (comment.profilePicture?.data) {
          const base64String = bufferToBase64(comment.profilePicture.data);
          images[comment._id] = base64String;
        } else {
          images[comment._id] = "/default-profile.png"; // Fallback image
        }

        // Handle reply user images
        if (comment.replies) {
          comment.replies.forEach((reply) => {
            if (reply.profilePicture?.data) {
              const base64String = bufferToBase64(reply.profilePicture.data);
              images[reply.id] = base64String;
            } else {
              images[reply.id] = "/default-profile.png";
            }
          });
        }
      });
      setCommentImages(images);
    };

    if (Array.isArray(comments) && comments.length > 0) {
      convertImages();
    }
  }, [comments]);
  
  // Submit a reply
  const handleReplySubmit = async (commentId) => {
    // console.log(`Posting reply to: /patient/blogs/comment/${BlogPageData._id}/reply/${commentId}`);
    // console.log("Reply text:", replyText[commentId]);
    
    setIsSaving(true); 
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/patient/blogs/comment/${BlogPageData._id}/reply/${commentId}`,
        { reply: replyText[commentId] },  // Ensure this matches the expected payload
        { withCredentials: true }
      );
      
      // console.log("Reply response:", response);
      
      if (response.status === 200) {
        // Clear reply input and set replyingTo to null after successful post
        setReplyText((prevState) => ({ ...prevState, [commentId]: "" }));
        setReplyingTo(null);

        window.location.reload(); 
        // Reload the page after 3 seconds
        setTimeout(() => {
          setIsSaving(false);  // Reset saving state after the process is done
          window.location.reload();
        }, 3000);  // 3000 milliseconds = 3 seconds

      }


    } catch (error) {
      console.error("Error submitting reply:", error.response ? error.response.data : error.message);
      setIsSaving(false);
    }
  };
   // Function to load more comments
   const handleLoadMoreReplies = (commentId) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [commentId]: (prevVisibleReplies[commentId] || 0) + 2, // Show 2 more replies
    }));
  };
  
  return (
    <div className="UserBlog-comments-cnt">
    {/* Display existing comments */}
    {Array.isArray(comments) && comments.length > 0 ? (
      <>
        {comments.slice(0, visibleComments).map((comment) => (
          <div key={comment._id} className="UserBlog-style-comment-cnt">
            <div className="UserBlog-comment-header-text">
              <div className="UserBlog-comment-content">
                <div className="UserBlog-comment-header">
                  <span className="UserBlog-comment-title">{comment.username}</span>
                  <span className="UserBlog-comment-time-txt">{timeAgo(comment.timestamp)}</span>
                </div>
                <p className="UserBlog-comment-txt">{comment.comment}</p>
                <div className="UserBlog-comment-actions">
                  <span
                    className="UserBlog-reply-btn"
                    onClick={() =>
                      setReplyingTo(replyingTo === comment._id ? null : comment._id)
                    }
                  >
                    Reply
                  </span>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="UserBlog-replies-section">
                    {comment.replies.slice(0, visibleReplies[comment._id] || 0).map((reply) => (
                      <div key={reply.id} className="UserBlog-reply-comment">
                        <div className="UserBlog-reply-content">
                          <div className="UserBlog-reply-header">
                            <span className="UserBlog-reply-username">{reply.username}</span>
                            <span className="UserBlog-reply-time">{timeAgo(reply.timestamp)}</span>
                          </div>
                          <p className="UserBlog-reply-text">{reply.reply}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Load more replies for this comment */}
                {comment.replies && comment.replies.length > (visibleReplies[comment._id] || 0) && (
                  <button className="UserBlog-load-more-btn" onClick={() => handleLoadMoreReplies(comment._id)}>
                    Load More Replies
                  </button>
                )}

                {replyingTo === comment._id && (
                  <div className="UserBlog-reply-input-section">
                    <input
                      type="text"
                      value={replyText[comment._id] || ""}
                      onChange={(e) =>
                        setReplyText((prevState) => ({
                          ...prevState,
                          [comment._id]: e.target.value,
                        }))
                      }
                      placeholder="Add a reply..."
                      className="UserBlog-reply-input"
                    />
                    <button
                      className="UserBlog-reply-submit-btn"
                      type="submit"
                      onClick={() => handleReplySubmit(comment._id)}
                      disabled={isSaving}
                    >
                      <span className="savebutton-text">Post</span>
                      {isSaving && (
                        <div className="UserBlog-spinner-overlay">
                          <div className="UserBlog-small-spinner"></div>
                        </div>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Load More button for comments */}
        {comments.length > visibleComments && (
          <button className="UserBlog-reply-submit-btn" onClick={() => setVisibleComments(visibleComments + 2)}>
            Load More CommentsUserBlog-load-more-btn
          </button>
        )}
      </>
    ) : (
      <p>No comments yet</p>
    )}
  </div>

  );
};

export default Comment;
