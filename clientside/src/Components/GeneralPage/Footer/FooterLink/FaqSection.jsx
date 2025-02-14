import React, { useState } from "react";
import "./FaqSection.css";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-question-container">
      <div className="faq-section00">
        <h1 className="faq-title00">Frequently Asked Questions</h1>

        <div className={`faq-item00 ${openIndex === 1 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(1)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 1 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 1 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              1. What is MedXBay?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 1 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 1 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                MedXBay is an on-demand, integrated healthcare platform transforming the way patients, providers, and medical suppliers connect and collaborate. By integrating on-demand telemedicine with real-time personalized care, we deliver efficiency and convenience for all stakeholders.<br/><br/>
                Patients gain easy access to trusted healthcare providers across conventional, traditional, holistic and specialty care, simplified appointment scheduling, and secure follow-up communication, closing gaps in care and improving overall health outcomes. Providers benefit from streamlined workflows, reducing administrative tasks like scheduling, payments, and patient management, allowing more time for quality care. Medical suppliers can effortlessly connect with providers, streamlining procurement processes and fostering trust with multiple providers.<br/><br/> Enhanced with AI, MedXBay optimizes healthcare delivery while driving growth and improving patient and provider experiences across the board.
              </p>
            </div>
          )}
        </div>

        <div className={`faq-item00 ${openIndex === 2 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(2)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 2 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 2 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              2. Who is MedXBay for?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 2 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 2 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                MedXBay is designed for three primary audiences:
              </p>
              <ul className="faq-audience-list">
                <li><b>Patients:</b> looking for trusted healthcare providers, convenient scheduling, and access to accurate health information.</li>
                <li><b>Healthcare Providers:</b>Healthcare Providers wanting to enhance patient care, reduce administrative burdens, and expand their reach.</li>
                <li><b>Medical Suppliers:</b>Medical Suppliers who want to connect with healthcare providers and navigate procurement processes more effectively (Coming Q4).</li>
              </ul>

            </div>
          )}
        </div>

          <div className={`faq-item00 ${openIndex === 3 ? "faq-item-open00" : ""}`}>
                <div
                  className="faq-questionss00"
                  onClick={() => toggleFaq(3)}
                  style={{
                    fontSize: "18px",
                    backgroundColor: openIndex === 3 ? "#0167FF" : "#F2F6FF",
                    color: openIndex === 3 ? "#fff" : "#272848",
                    padding: "20px",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                >
            <h2 className="faq-question-texts00">
              3. What problems does MedXBay solve?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 3 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 3 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                MedXBay addresses several key issues:
              </p>
              <ul className="faq-problems-list">
                <li>
                  <strong>For Patients:</strong> It helps find trusted providers, simplifies scheduling, and ensures access to accurate health information.
                </li>
                <li>
                  <strong>For Providers:</strong> It reduces administrative burdens, expands patient reach, and streamlines patient management while also providing a direct space to connect with industry colleagues via our social network.
                </li>
                <li>
                  <strong>For Medical Suppliers:</strong> We eliminate the 1:1 approach and foster trust-building with many different providers, allowing better understanding of their needs and easier navigation of procurement processes.
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className={`faq-item00 ${openIndex === 4 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(4)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 4 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 4 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              4. Does it cost to be on MedXBay?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 4 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 4 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                For patients, creating a profile is free. You only pay if you choose to have a telehealth appointment with a provider or once you visit them in person. <br></br><br></br>For providers, we operate on a subscription model and have various tiers. You are able to claim a free profile with limited features.<br></br><br></br> To claim a paid profile with full features, register as a provider here.<br></br><br></br> Paid profiles for medical suppliers will be coming in Q4.
              </p>
            </div>
          )}
        </div>

        <div className={`faq-item00 ${openIndex === 5 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(5)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 5 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 5 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              5. Can I recommend that my healthcare provider join MedXBay?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 5 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 5 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                Absolutely! If you have a healthcare provider that you'd like to see on MedXBay, you can recommend that they join. Providers can benefit from increased visibility, patient engagement, and access to a secure social platform where they can connect with peers and suppliers.<br></br><br></br> Simply have them come to <a style={{color:"blue"}} href="https://beta.medxbay.com" target="_blank" rel="noopener noreferrer">www.medxbay.com</a>www.medxbay.com and select the register button to begin.
              </p>
            </div>
          )}
        </div>

        <div className={`faq-item00 ${openIndex === 6 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(6)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 6 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 6 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              6. How does MedXBay ensure the quality of care provided?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 6 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 6 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                MedXBay enhances care quality by offering tools that help providers manage their practice efficiently. The platform includes features like secure patient-provider communication, star ratings and reviews from patients, detailed provider profiles, and integration with calendars for seamless appointment management. These features help maintain high standards of care and patient satisfaction.
              </p>
            </div>
          )}
        </div>

        <div className={`faq-item00 ${openIndex === 7 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(7)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 7 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 7 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              7. What features are available for patients on MedXBay?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 7 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 7 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">Patients on MedXBay can:</p>
              <ul className="faq-features-list">
                <li>Search for healthcare providers by specialty or condition.</li>
                <li>Book in-person or telehealth appointments.</li>
                <li>Manage appointments and prescriptions through a personal dashboard.</li>
                <li>Chat securely with providers for follow-up care.</li>
                <li>Access a comprehensive library of health information.</li>
              </ul>
            </div>
          )}
        </div>

        <div className={`faq-item00 ${openIndex === 8 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(8)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 8 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 8 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              8. What features are available for healthcare providers on MedXBay?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 8 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 8 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">Providers on MedXBay can:</p>
              <ul className="faq-features-list">
                <li>Manage appointments, payments, and their professional profile.</li>
                <li>Engage with patients through secure chat.</li>
                <li>Publish articles and receive reviews from patients.</li>
                <li>Showcase their availability, insurances accepted, languages spoken, and more.</li>
                <li>Integrate seamlessly with their calendar for efficient appointment scheduling.</li>
              </ul>
            </div>
          )}
        </div>


        <div className={`faq-item00 ${openIndex === 9 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(9)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 9 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 9 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              9. How does MedXBay compare to other healthcare platforms?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 9 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 9 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                MedXBay offers a comprehensive solution that includes a focus on conventional, holistic and traditional modalities, provider profiles with verified anonymous patient reviews, a private social network for providers and medical suppliers, a robust condition library that hones in on causes and treatments, and so much more.<br></br><br></br>We empower patients to be their own health advocate by making sure they are educated and have the power to choose what works best for them.<br></br><br></br> For providers, we reduce administrative burden, expand their reach to patients, and enhance their knowledge base by connecting them with industry colleagues and medical suppliers.
              </p>
            </div>
          )}
        </div>

        <div className={`faq-item00 ${openIndex === 10 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(10)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 10 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 10 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              10. What regions does MedXBay serve?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 10 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 10 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                MedXBay primarily serves the Middle East and North Africa (MENA) region, with plans for expansion into other regions like Kenya, Ghana, and South Africa. The platform is designed to address the unique healthcare challenges in these areas, including access to care and market fragmentation.<br></br><br></br> We have plans of expanding into Europe and Asia as well.
              </p>
            </div>
          )}
        </div>

        <div className={`faq-item00 ${openIndex === 11 ? "faq-item-open00" : ""}`}>
          <div
            className="faq-questionss00"
            onClick={() => toggleFaq(11)}
            style={{
              fontSize: "18px",
              backgroundColor: openIndex === 11 ? "#0167FF" : "#F2F6FF",
              color: openIndex === 11 ? "#fff" : "#272848",
              padding: "20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <h2 className="faq-question-texts00">
              11. How can I get started with MedXBay?
            </h2>
            <span className="faq-toggle-icon00">
              {openIndex === 11 ? "−" : "+"}
            </span>
          </div>
          {openIndex === 11 && (
            <div className="faq-answers00" style={{ paddingLeft: "20px" }}>
              <p className="faq-answer-texts00">
                Getting started is easy. As a patient, select register and fill out the information. You will receive an email to confirm your registration. Once confirmed, you are in and will be able to create your profile.<br></br><br></br> For healthcare providers, select register, scroll down and select “sign up as provider” and fill out the information. You will receive an email to confirm your registration. Once complete, you will be redirected to a dashboard to create your profile and submit your documentation. To learn more about the type of documentation required, <a href="/dr-physician">click here</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>  
  );
};

export default FaqSection;
