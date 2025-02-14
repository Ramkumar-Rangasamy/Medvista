import React, { useState } from "react";
import "./SubscriptionPlans.css";
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import tee from '../../Assets/Tick.png';
import 'react-toastify/dist/ReactToastify.css';
import SubscriptionContact from "./SubscriptionContact";
import { useNavigate } from "react-router-dom";
import MobileSubscriptionPlans from "./Mobilesubscription";
const SubscriptionPlans = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const navigate = useNavigate();

  // const toggleSubscriptionModal = () => setShowSubscriptionModal(!showSubscriptionModal);
  const toggleSubscriptionModal = () => navigate('/contact-us');

  const monthlyPlans = [

    {
      name: "Standard",
      price: "$0",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": "10% service charge",
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": false,
        "Access to email customer support": false,
        "Access to our social media network for medical providers + medical suppliers":true,
        "1 free article in our condition library": false,
      },
    },
    {
      name: "Premium",
      price: "$150",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "Access to our AI bot to follow-up with patients, help manage admin takes and aid with diagnosis" :true,
        "Access to our social media network for medical providers + medical suppliers":true,
        "1 free article in our condition library": "When paid yearly",
      },
    },
    {
      name: "Enterprise",
      price: "--",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "Access to our AI bot to follow-up with patients, help manage admin takes and aid with diagnosis" :true,
        "Access to our social media network for medical providers + medical suppliers":true,
        "1 free article in our condition library": "When paid each providers <br/> get 2 free articles",
      },
    },
    {
      name: "Suppliers",
      price: "--",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "Access to our AI bot to follow-up with patients, help manage admin takes and aid with diagnosis" :true,
        "Access to our social media network for medical providers + medical suppliers":true,
        "1 free article in our condition library": true,
      },
    },
  ];

  const yearlyPlans = [

    {
      name: "Standard",
      price: "$0",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": "10% service charge",
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": false,
        "Access to email customer support": false,
        "Access to our social media network for medical providers + medical suppliers":true,
        "1 free article in our condition library": false,
      },
    },
    {
      name: "Premium",
      price: "$1530",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "Access to our AI bot to follow-up with patients, help manage admin takes and aid with diagnosis" :true,
        "Access to our social media network for medical providers + medical suppliers":true,
        "1 free article in our condition library": "When paid yearly",
      },
    },
    {
      name: "Enterprise",
      price: "--",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "Access to our AI bot to follow-up with patients, help manage admin takes and aid with diagnosis" :true,
        "Access to our social media network for medical providers + medical suppliers":true,
        "1 free article in our condition library": "When paid each providers <br/> get 2 free articles",
      },
    },
    {
      name: "Suppliers",
      price: "--",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "Access to our AI bot to follow-up with patients, help manage admin takes and aid with diagnosis" :true,
        "Access to our social media network for medical providers + medical suppliers":true,
        "1 free article in our condition library": true,
      },
    },
  ];

  const handleMonthlyClick = () => setSelectedPeriod("Monthly");
  const handleYearlyClick = () => setSelectedPeriod("Yearly");
  const handlePlanClick = (planName) => setSelectedPlan(planName);

  const features = [

    {
      title: "Premium Profile",
      subtitle:
        "Everything in basic profile, Hospitals/Facilities you work in, Languages, Awards, FAQs, Ratings, Insurance you take, About Me",
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
      title: "Chat with patients with our integrated messaging app",
    },
    {
      title: "Access to email customer support",
    },
    {
      title: "Access to our AI bot to follow-up with patients, help manage admin takes and aid with diagnosis",
    },
    {
      title: "Access to our social media network for medical providers + medical suppliers",
    },
    {
      title: "1 free article in our condition library",
    },
  ];

  const currentPlans = selectedPeriod === "Monthly" ? monthlyPlans : yearlyPlans;

  const handleSubscribe = async (planName) => {

    if (!selectedPlan && !planName) {
      toast.info("Please select a subscription plan");
      return;
    }
    if (planName === "Standard") {
      toast.info("You're already in Standard Trial");
      return;
    }
  
    const selectedPlanDetails = currentPlans.find((plan) => plan.name === (planName || selectedPlan));
  
    // If no plan is selected, fall back to the one being passed via button click
    if (!selectedPlan) {
      setSelectedPlan(planName);
    }
  
    if (planName === "Enterprise" || planName === "Suppliers" ) {
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
  
  

  return (
    <>
    <div className="subscription-background">
    <div className="subscription-plans">
      <h2 className="title">Choose the best plan for you</h2>
      {/* <p className="subtitle">Choose the best plan for you</p> */}
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${selectedPeriod === "Monthly" ? "selected" : ""}`}
          onClick={handleMonthlyClick}
        >
          Monthly
        </button>
        <button
          className={`toggle-btn ${selectedPeriod === "Yearly" ? "selected" : ""}`}
          onClick={handleYearlyClick}
        >
          Yearly
        </button>
      </div>
      <div className="discount-banner">15% off for annual subscriptions</div>
      <p className="enterprise-notice">For individual users, Enterprise requires 10 or more users</p>
      <div className="plans-wrapper">
        <table className="plans-table">
          <thead>
            <tr>
              <th className="features-column">
                <div className="feature-space">
                  <div className="feature-title"><b>Features</b></div>
                  <div className="special-note">Get started to watch <br /> premium doctor’s profile</div>
                </div>
              </th>
              {currentPlans.map((plan, index) => (
                <th
                  key={index}
                  className={`plan-header ${selectedPlan === plan.name ? "plan-column-selected" : ""}`}
                  onClick={() => handlePlanClick(plan.name)}
                  aria-selected={selectedPlan === plan.name}
                >
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-price">{plan.price}</div>
                  {plan.name === "Enterprise" || plan.name === "Suppliers" ? (
  <button
    className={`add-contact-btn ${selectedPlan === plan.name ? "active" : ""}`}
    onClick={toggleSubscriptionModal}
  >
    Contact Sales
  </button>
) : (
  <button
    className={`add-contact-btn ${selectedPlan === plan.name ? "active" : ""}`}
    onClick={() => handleSubscribe(plan.name)}  // Pass the plan name to handleSubscribe
  >
    Subscribe
  </button>
)}

                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-color">
            {features.map((feature, index) => (
              <tr key={index}>
                <td
                  className={`feature-titles ${
                    feature.title === "1 free article in our condition library"
                      ? "feature-1-free-article"
                      : ""
                  }`}
                >
                  <div className="feature-titlee">{feature.title}</div>
                  {feature.subtitle && (
                    <div className="feature-subtitle">{feature.subtitle}</div>
                  )}
                </td>
                {currentPlans.map((plan, planIndex) => (
                  <td
                    key={planIndex}
                    className={`plan-feature ${
                      selectedPlan === plan.name ? "plan-column-selected" : ""
                    } ${
                      feature.title === "1 free article in our condition library"
                        ? "feature-1-free-article"
                        : ""
                    }`}
                  >
                    {plan.features[feature.title] === true && (
                        <img src={tee} alt="Team of Doctors" style={{ width: '30px' ,height:"30px",marginBottom:"20px",marginTop:"20px"}} />
                    )}
                     
                    {plan.features[feature.title] === false ? "" : (
                      typeof plan.features[feature.title] === "string" ? (
                       <div dangerouslySetInnerHTML={{ __html: plan.features[feature.title] }} />
                      ) : (
                        plan.features[feature.title]
                      )
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    </div>
    <SubscriptionContact  show={showSubscriptionModal} handleClose={() => setShowSubscriptionModal(false)}/>
    <MobileSubscriptionPlans/>
    </>
  );
};

export default SubscriptionPlans;