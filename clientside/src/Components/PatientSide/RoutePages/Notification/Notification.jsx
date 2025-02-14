import React, { useEffect, useState } from 'react';
import './Notification.css';
import { fetchFromPatient } from '../../../Api';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await fetchFromPatient('/notifications');
      console.log(data);
      
      if (data.notifications) {
        setNotifications(data.notifications);
      } else {
        throw new Error('No notifications found in response');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await fetchFromPatient(`/notifications/${id}/mark-read`, {}, 'POST');
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchFromPatient(`/notifications/${id}/delete`, {}, 'POST');
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="user-notification-card">
      <h2>Notification</h2>
      <div className="user-notification-list">
        {notifications.map(notification => (
          <div key={notification._id} className="user-notification">
            
            <div className="user-details-head">
              {/* Render profile photo for chat notifications or default image for others */}
              <img 
                src={notification.type === 'chat' 
                  ? (notification.senderProfilePic || '/logo-notification.jpg')  // Use the provided default image path
                  : '/logo-notification.jpg'}  // Default image for non-chat notifications
                alt="Notification" 
              />
              <div className="user-details">
                <h2>{notification.senderName}</h2>
                <p>{notification.message}</p> {/* Removed the specialization or 'General' text */}
              </div>
            </div>

            <div className="user-notification-list-status">
              <span className="user-notification-list-time">{notification.timeAgo}</span>
              <p style={{ color: notification.statusColor }}>{notification.status}</p>
            </div>

            <div className="user-buttons">
              {!notification.read && (
                <button className='btn-Mark-Read' onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
              )}
              <button className='btn-user-delete-buttons' onClick={() => handleDelete(notification._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
