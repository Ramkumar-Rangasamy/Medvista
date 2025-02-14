import React, { useState, useEffect } from "react";
import { IoArrowUndo } from "react-icons/io5";

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

const Comment = ({ comments }) => {
  const [commentImages, setCommentImages] = useState({});

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
          images[comment.id] = base64String;
        }
      });
      setCommentImages(images);
    };

    if (Array.isArray(comments) && comments.length > 0) {
      convertImages();
    }
  }, [comments]);

  return (
    <div className="Adminviewblog-comments-read">
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="Adminviewblog-style-comment-cnt">
            <div className="Adminviewblog-comment-header-text">
              <img
                src={commentImages[comment.id] || ""}
                alt="profile-icon"
                className="Adminviewblog-profile-img"
              />
              <div className="Adminviewblog-comment">
                <p className="Adminviewblog-comment-title">{comment.username}</p>
                <p className="Adminviewblog-comment-time-txt">
                  {timeAgo(comment.date)}
                </p>
                <p className="Adminviewblog-comment-txt">{comment.comment}</p>
              </div>
            </div>
            <div className="Adminviewblog-replay-btn">
              <IoArrowUndo />
              <span>Reply</span>
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default Comment;
