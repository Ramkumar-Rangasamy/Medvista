import React from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import logobrand from '../Assets/logobrand.png';
import patientIcon from '../Assets/patientIcon.png' // Replace with your themed icons
import providerIcon from '../Assets/doctorIcon.png';
import './PreRegister.css';  // Create and apply custom styling

const PreRegister = ({ onRoleSelect }) => {
  return (
    <Container className="pre-register-container text-center">
      <div className="logo-header">
        <Image src={logobrand} alt="Brand Logo" className="brand-logo" />
        <h1 className="title">Welcome to Our Platform</h1>
        <p className="subtitle">Select your role to get started</p>
      </div>

      <Row className="role-options">
        <Col md={6}>
          <div className="role-card" onClick={() => onRoleSelect('patient')}>
            <Image src={patientIcon} alt="Patient Icon" className="role-icon" />
            <h3>Patient</h3>
            <p>Book consultations and manage your health records</p>
            <Button variant="primary" className="select-role-btn">Select Patient</Button>
          </div>
        </Col>
        <Col md={6}>
          <div className="role-card" onClick={() => onRoleSelect('provider')}>
            <Image src={providerIcon} alt="Provider Icon" className="role-icon" />
            <h3>Provider</h3>
            <p>Manage appointments and connect with patients</p>
            <Button variant="primary" className="select-role-btn">Select Provider</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PreRegister;
