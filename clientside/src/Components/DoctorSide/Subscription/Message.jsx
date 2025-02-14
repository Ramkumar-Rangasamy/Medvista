import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Message = () => {
  return (
    <div className="container text-center mt-5">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Payment Successful!</h4>
        <p>success</p>
        <hr />
        <p className="mb-0">Thank you for your payment. You will receive a confirmation email shortly.</p>
      </div>
      <Link to="/Doctor/profile/Edit" className="btn btn-primary">
        View My Bookings
      </Link>
    </div>
  );
};

export default Message;
