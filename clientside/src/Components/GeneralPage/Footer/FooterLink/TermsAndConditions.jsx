import React from 'react';
import './TermsAndConditions.css';
import terms  from '../../../Assets/terms.jpeg'
const TermsAndConditions = () => {
  return (
    <div className='terms-container'>
      <div className="terms-content-contain">
        <header className="terms-header">
          <div className="header-content">
            <div>
              <h1 className="terms-heading">Terms and Conditions</h1>
              <div className="last-updated">
                <span>Last updated: August 2, 2024</span>
              </div>
              <p className="last-updatedpara">
                Welcome to MedXBay. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our site, you agree to comply with these Terms. Please read them carefully.
              </p>
            </div>
          </div>
          <div className="terms-image">
            <img src={terms}
              alt="Doctors"
            />
          </div>
        </header>

        <section className="terms-content">
          <div className="terms-left">
            <div className="terms-section">
              <h2>1. Acceptance of Terms :</h2>
              <p>
                By accessing or using the MedXBay website ("Site") or any services provided by MedXBay ("Services"), you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must discontinue use of the Site and Services immediately. Your continued use of the Site after any changes to these Terms will be deemed acceptance of those changes.
              </p>
            </div>

            <div className="terms-section">
              <h2>2. Eligibility :</h2>
              <p>
                You must be at least 18 years old to use our Site and Services. By using the Site, you represent and warrant that you meet the eligibility criteria and have the authority to engage in activities on the Site on behalf of yourself or any entity you represent.
              </p>
            </div>

            <div className="terms-section">
              <h2>3. User Accounts :</h2>
              <p>
                To access certain features of the Site, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            <div className="terms-section">
              <h2>4. Subscription Services :</h2>
              <p>
                MedXBay offers both monthly and yearly subscription plans. By subscribing to our Services, you agree to pay the subscription fees as outlined on the Site. Your subscription will automatically renew at the end of each billing cycle unless you cancel it as per the Cancellation Policy below.
              </p>
            </div>

            <div className="terms-section">
              <h2>5. Cancellation Policy :</h2>
              <p>
                - Monthly Subscriptions: You may cancel your monthly subscription at any time before the next billing cycle. Upon cancellation, you will retain access to your subscription until the end of the current billing cycle.
              </p>
              <p>
                - Yearly Subscriptions: You may cancel your yearly subscription at any time before the next billing cycle. Upon cancellation, you will retain access to your subscription until the end of the current billing cycle. If you cancel your subscription within 14 days of purchase, you may be eligible for a refund.
              </p>
            </div>

            <div className="terms-section">
              <h2>6. Refund Policy :</h2>
              <p>
                Refunds are assessed on a case-by-case basis. If you believe you are eligible for a refund, please contact our billing department at billing@medxbay.com. In your request, please include clear details regarding your profile, the issues you have encountered with the platform, and your reason for requesting a refund. Our team will review your case and respond accordingly.
              </p>
            </div>

            <div className="terms-section">
              <h2>7. Payment Processing :</h2>
              <p>
                All payments for subscriptions and services are processed through secure third-party payment processors. By providing payment information, you authorize us to charge the applicable fees to your payment method. MedXBay is not responsible for any errors or issues that arise from the payment processor.
              </p>
            </div>

            <div className="terms-section">
              <h2>8. Use of Site and Services :</h2>
              <p>
                You agree to use the Site and Services only for lawful purposes. You must not:
                <ul>
                  <li>Engage in any activity that is harmful, fraudulent, or illegal.</li>
                  <li>Attempt to gain unauthorized access to our systems or networks.</li>
                  <li>Use the Site to transmit or distribute viruses, malware, or any other harmful code.</li>
                  <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Site without our express written permission.</li>
                </ul>
              </p>
            </div>

            <div className="terms-section">
              <h2>9. Intellectual Property :</h2>
              <p>
                All content, trademarks, service marks, and logos on the Site are the property of MedXBay or its licensors. You may not use any of our intellectual property without our prior written consent.
              </p>
            </div>

            <div className="terms-section">
              <h2>10. Disclaimer of Warranties :</h2>
              <p>
                MedXBay provides the Site and Services "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the Site or Services will be uninterrupted, error-free, or free from viruses or other harmful components.
              </p>
            </div>

            <div className="terms-section">
              <h2>11. Limitation of Liability :</h2>
              <p>
                To the maximum extent permitted by law, MedXBay and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Site or Services.
              </p>
            </div>

            <div className="terms-section">
              <h2>12. Indemnification :</h2>
              <p>
                You agree to indemnify and hold harmless MedXBay and its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the Site or Services, or your violation of these Terms.
              </p>
            </div>

            <div className="terms-section">
              <h2>13. Privacy Policy :</h2>
              <p>
                Your use of the Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your personal information.
              </p>
            </div>

            <div className="terms-section">
              <h2>14. Governing Law :</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in [Insert Jurisdiction].
              </p>
            </div>

            <div className="terms-section">
              <h2>15. Changes to Terms :</h2>
              <p>
                MedXBay reserves the right to modify these Terms at any time. We will provide notice of any changes by updating the "Last Updated" date at the top of these Terms. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            <div className="terms-section">
              <h2>16. Contact Information :</h2>
              <p>
                If you have any questions or concerns regarding these Terms, please contact us at support@medxbay.com.
              </p>
            </div>
          </div>

          <div className="terms-right">
            <div className="terms-section">
              <h2>17. Medical Disclaimer :</h2>
              <p>
                The information provided on the Site is for informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider for medical advice and treatment.
              </p>
            </div>

            <div className="terms-section">
              <h2>18. User Content :</h2>
              <p>
                By submitting any content to the Site, you grant MedXBay a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute such content in connection with the Site and Services.
              </p>
            </div>

            <div className="terms-section">
              <h2>19. Third-Party Links :</h2>
              <p>
                The Site may contain links to third-party websites or resources. MedXBay is not responsible for the availability, accuracy, or content of such third-party sites. Your use of any third-party sites is at your own risk.
              </p>
            </div>

            <div className="terms-section">
              <h2>20. User Feedback :</h2>
              <p>
                We welcome feedback, comments, and suggestions for improvements. However, any feedback you provide will be considered non-confidential and non-proprietary. MedXBay will have no obligation to compensate you for any feedback or suggestions provided.
              </p>
            </div>

            <div className="terms-section">
              <h2>21. Severability :</h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
              </p>
            </div>

            <div className="terms-section">
              <h2>22. Entire Agreement :</h2>
              <p>
                These Terms constitute the entire agreement between you and MedXBay regarding your use of the Site and Services and supersede all prior agreements and understandings.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>  
  );
};

export default TermsAndConditions;
