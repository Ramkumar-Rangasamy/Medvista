import React, { useState } from "react";
import tee from '../../Assets/Tick.png';
import "./SubscriptionPlans.css";
import axios from "axios"; 
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const MobileSubscriptionPlans = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [activeSection, setActiveSection] = useState(null);

  const mobilePlans = {
    Monthly: {
      Standard: "$0",
      Premium: "$150",
      Enterprise: "--",
      Suppliers: "--",
    },
    Yearly: {
      Standard: "$0",
      Premium: "$1530",
      Enterprise: "--",
      Suppliers: "--",
    },
  };

  const mobilePlansArray = [
    {
      name: "Standard",
      features: {
        "Basic Profile": true,
        "Premium Profile": true,
        "Accept Telehealth calls": "10% service charge",
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients": true,
        "Customer support": true,
        "Access to our AI": true,
        "Access to our social": true,
        "Free article": false,
      },
    },
    {
      name: "Premium",
      features: {
        "Basic Profile": true,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients": true,
        "Customer support": true,
        "Access to our AI": true,
        "Access to our social": true,
        "Free article": true,
      },
    },
    {
      name: "Enterprise",
      features: {
        "Basic Profile": true,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients": true,
        "Customer support": true,
        "Access to our AI": true,
        "Access to our social": true,
        "Free article": "gets 2 free articles",
      },
    },
    {
      name: "Suppliers",
      features: {
        "Basic Profile": true,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients": true,
        "Customer support": true,
        "Access to our AI": true,
        "Access to our social": true,
        "Free article": true,
      },
    },
  ];

  const mobileFeatures = [
    {
      title: "Basic Profile",
      subtitle: "Basic profile features",
    },
    {
      title: "Premium Profile",
      subtitle: "Everything in basic profile",
    },
    {
      title: "Accept Telehealth calls",
    },
    {
      title: "Access to Knowledge base",
    },
    {
      title: "Patients can book appointment",
    },
    {
      title: "Chat with patients",
    },
    {
      title: "Customer support",
    },
    {
      title: "Access to our AI",
    },
    {
      title: "Access to our social",
    },
    {
      title: "Free article",
    },
  ];

  const selectedPlanDetails = mobilePlansArray.find((plan) => plan.name === selectedPlan);

  const handleSubscribe = async (planName) => {
    if (!selectedPlan && !planName) {
      toast.info("Please select a subscription plan");
      return;
    }
    if (planName === "Standard") {
      toast.info("You're already in Standard Trial");
      return;
    }
  
    const selectedPlanDetails = mobilePlansArray.find((plan) => plan.name === (planName || selectedPlan));
  
    // If no plan is selected, fall back to the one being passed via button click
    if (!selectedPlan) {
      setSelectedPlan(planName);
    }
  
    if (planName === "Enterprise" || planName === "Suppliers") {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/doctor/subscribe`;
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/subscribe`,
        {
          subscriptionType: planName || selectedPlan,
          subscriptionDuration: selectedPeriod,
          paymentDetails: {
            amount: parseInt(
              selectedPlanDetails.price.replace("$", "").replace(",", ""),
              10
            ) * 100,
          },
        },
        { withCredentials: true }
      );
  
      window.location.href = response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.info(error.response.data);
      } else {
        console.error("Subscription error:", error);
        toast.info("Failed to initiate subscription. Please try again.");
      }
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const getSelectedPrice = () => {
    return mobilePlans[selectedPeriod][selectedPlan];
  };

  const getFeatureContent = (featureTitle) => {
    const currentPlan = mobilePlansArray.find(plan => plan.name === selectedPlan);
    const featureValue = currentPlan.features[featureTitle];

    if (featureValue === true) {
      return <img src={tee} alt="tee icon" className="mobile-subscription-tick" />;
    }
    if (featureValue === false) {
      return "--";
    }
    return featureValue;
  };

  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate('/contact-us');
  }

  return (
    <div className="subscription-mobile-responsive-container">
      <div className="subscription-plans">
        <h2 className="title">Choose the best plan for you</h2>
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${selectedPeriod === "Monthly" ? "selected" : ""}`}
            onClick={() => setSelectedPeriod("Monthly")}
          >
            Monthly
          </button>
          <button
            className={`toggle-btn ${selectedPeriod === "Yearly" ? "selected" : ""}`}
            onClick={() => setSelectedPeriod("Yearly")}
          >
            Yearly
          </button>
        </div>
        <div className="discount-banner">15% off for annual subscriptions</div>
        <p className="enterprise-notice">For individual users, Enterprise requires 10 or more users</p>
      </div>

      <div className="mobile-suscription-button-section">
        {["Standard", "Premium", "Enterprise", "Suppliers"].map((plan) => (
          <button 
            key={plan}
            className={`mobile-suscription-button ${selectedPlan === plan ? "currentplan" : ""}`} 
            onClick={() => handlePlanSelect(plan)}
          >
            {plan}
          </button>
        ))}
      </div>

      <div className="mobile-suscription-content-section">
        <div className="mobile-suscription-item">
          <div 
            className="mobile-suscription-header" 
            onClick={() => toggleSection("Price")}
          >
            <span>Price</span>
            <span className={`arrow ${activeSection === "Price" ? "down" : "right"}`}></span>
          </div>
          {activeSection === "Price" && (
            <div className="mobile-suscription-details">
              <div className="mobile-suscription-details-value">
                <p>Price amount</p>
                <p>{getSelectedPrice()}</p>
              </div>
              <div className="mobile-suscription-details-value">
                <p>Action</p>
                <button 
                  className="mobile-suscription-details-button" 
                  onClick={() => {
                    if (selectedPlan === "Enterprise" || selectedPlan === "Suppliers") {
                      handleClick(); 
                    } else {
                      handleSubscribe(selectedPlan); 
                    }
                  }}
                >
                  {selectedPlan === "Enterprise" || selectedPlan === "Suppliers" ? "Contact Sales" : "Subscribe"}
                </button>
              </div>
            </div>
          )}
        </div>

        {mobileFeatures.map((feature) => (
          <div key={feature.title} className="mobile-suscription-item">
            <div 
              className="mobile-suscription-header" 
              onClick={() => toggleSection(feature.title)}
            >
              <span>{feature.title}</span>
              <span className={`arrow ${activeSection === feature.title ? "down" : "right"}`}></span>
            </div>
            {activeSection === feature.title && (
              <div className="mobile-suscription-details">
                <div className="mobile-suscription-details-value">
                  <p>{feature.title}</p>
                  {getFeatureContent(feature.title)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSubscriptionPlans;
