import React, { useState } from "react";
import "./PrivacyPolicy.css";

const sections = [
  { key: "introduction", label: "Introduction" },
  {
    key: "informationCollection",
    label: "What Personal Information Does MedxBay Collect?",
  },
  { key: "cookies", label: "About cookies" },
  {
    key: "children",
    label: "Collection of Personal Information from Children",
  },
  { key: "information", label: "How We Use Your Information" },
  { key: "disclose", label: "Who We Disclose Your Personal Information To" },
  {
    key: "compliance",
    label: "Use and Disclosure of Personal Information Under HIPAA Compliance",
  },
  { key: "right", label: "Right to Know and Access Personal Information" },
  {
    key: "optOut",
    label: "Right to Opt-Out of the Sale of Personal Information",
  },
  { key: "verification", label: "Verification" },
  { key: "nonDiscrimination", label: "Non-Discrimination Policy" },
  { key: "CookiePolicy", label: "Cookie Policy" },
  { key: "contact", label: "Contact Us" },
];

const PrivacyPolicy = () => {
  const [selectedSection, setSelectedSection] = useState("introduction");

  const renderContent = () => {
    switch (selectedSection) {
      case "introduction":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">INTRODUCTION</h2>
            <p className="questionpara">
              MedxBay, LLC ("MedxBay," "We," "Us," or "Our") has created this
              Privacy Policy for the benefit of the users ("You," "Your," or
              "Yourself") of{" "}
              <a
                style={{ color: "blue" }}
                href="https://beta.medxbay.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.medxbay.com
              </a>{" "}
              (individually and collectively, the "Site"). This Privacy Policy
              outlines how MedxBay handles the personal information that You
              voluntarily provide when using the Site and any information that
              We may automatically collect during your visit.
              <br />
              <br />
              If You are accessing, using, or browsing this Site on behalf of an
              individual or entity other than Yourself:
              <br />
              <ul>
                <li>
                  Age and Authority: You represent, warrant, and covenant that
                  You are at least 18 years old and authorized to engage in
                  activities on the Site on behalf of the person or entity,
                  including submitting and receiving any personal information.
                </li>
                <br />
                <br />
                <li>
                  Authorization: You agree that We can rely on Your
                  representation of authority to conduct activities on behalf of
                  the natural person or entity, which may include providing
                  personal information.
                </li>
                <br />
                <li>
                  Definitions: "You," "Your," and "Yourself" in this Privacy
                  Policy refer to both the natural person or entity and You
                  acting on their behalf.
                </li>{" "}
                <br />
                <br />
              </ul>{" "}
              This Site is controlled and operated by MedxBay from its offices
              within The United Arab Emirates (U.A.E). Therefore, this Privacy
              Policy, and how MedxBay handles information you voluntarily
              provide and information automatically collected when you visit the
              Site, is governed by the federal and state laws of The United Arab
              Emirates (U.A.E), not by the laws of any other jurisdiction. We
              make no representation that the Site is appropriate or available
              for use outside of The United Arab Emirates (U.A.E). If you access
              the Site from territories where its contents are illegal, you are
              responsible for compliance with applicable local laws and
              regulations.
              <br />
              <br />
              Your use of this Site constitutes your acceptance of and agreement
              to this Privacy Policy and all its provisions. MedxBay reserves
              the right to change this Privacy Policy at any time at its sole
              discretion. If changes are made, we will post the updated Privacy
              Policy in appropriate sections of the Site. Continued use of the
              Site after the Effective Date of any changes will be deemed
              acceptance of those changes. Therefore, it is recommended that you
              frequently review this Privacy Policy for updates.
            </p>
          </div>
        );
      case "informationCollection":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">
              What Personal Information Does MedxBay Collect?
            </h2>
            <p className="questionpara">
              MedxBay collects several types of Personal Information to provide
              our services and enhance your experience on our platform. To use
              certain features and access specific areas of the Site, you must
              provide Personal Information that can be directly linked to you.
              This includes your full name, street address, postal code,
              telephone number, email, gender, date of birth, insurance
              coverage, social history, and known health characteristics and
              medical needs. We collect this Personal Information that you
              voluntarily provide through online data entry forms, surveys,
              profiles, product purchases, and registration forms. Most of this
              Personal Information is gathered during an initial voluntary user
              registration process on the Site. We may also request additional
              Personal Information at various times, such as when you complete
              optional survey forms, fill out contact forms for more information
              about particular products and services, or use a specific service.
              <br />
              <br />
              We also collect location-related information when you access or
              use our Site. The precision of this location data varies depending
              on the source, such as your Internet browser or IP address. We
              collect and use this data to:
              <br />
              <ul>
                <li>Deliver content relevant to your location</li>
                <li>Restrict certain access to our Site</li>
              </ul>
              You have the option to disable the collection and use of your
              browser location data through your browser settings.
              <br />
              <br />
              To access and use MedxBay’s Appointment Services for scheduling
              appointments with healthcare providers, you must submit the
              requested appointment information during the scheduling process.
              This personally identifiable information may include
              health-related data, such as physical or mental health conditions
              and treatments. This combination of Personal Information and
              health-related data is termed "Protected Health Information" (PHI)
              and is subject to special regulations under the Health Insurance
              Portability and Accountability Act of 1996 (HIPAA). MedxBay treats
              all personally identifiable information received through
              Appointment Materials or created from your use of Appointment
              Services as PHI, regardless of whether an appointment is scheduled
              or completed.
            </p>
          </div>
        );
      case "cookies":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">Cookies Policy</h2>
            <p className="questionpara">
              When you visit the Site, MedxBay may automatically collect data
              through Cookies and similar technologies. A "Cookie" is a text
              file that a website sends to your browser and is stored on your
              computer, mobile phone, tablet, or other connected device. Cookies
              store information about your visit and usage of our Site, which
              can be accessed by us or third parties to offer enhanced
              functionalities on our Sites.
              <br />
              <br />
              We also utilize other technologies, such as web beacons (also
              called "pixels," "tags," or "clear GIFs") and JavaScript, to
              perform similar functions as Cookies. A web beacon is typically a
              one-pixel, transparent image embedded on a website or in an email
              message, retrieved from a website on the Internet.
              <br />
              <br />
              Cookies placed and accessed by us on your device are known as
              "first-party" Cookies, while those placed and accessed by
              third-party advertisers or service providers are "third-party"
              Cookies. Third-party Cookies may provide information about your
              visit to our Site to these parties, enabling them to present
              content or advertisements to you, customize your experience, or
              fulfill any purpose outlined in this Privacy Policy. Cookies can
              be "persistent" (remain on your device until you delete them) or
              "temporary" (last only until you close your browser). For more
              information, please refer to our Cookie Policy.
              <br />
              <br />
              MedxBay may also collect Personal Information about you from third
              parties and combine de-identified information with Personal
              Information. We will treat the combined information as Personal
              Information as described in this Privacy Policy.
            </p>
          </div>
        );
      case "children":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">
              Collection of Personal Information from Children
            </h2>
            <p className="questionpara">
              MedxBay's Sites are designed for users 18 years of age and older.
              We do not knowingly collect Personal Information from individuals
              under the age of 18. If we become aware of such collection, we
              will take immediate steps to delete the information from our
              records. If you believe we have inadvertently collected
              information from a child under 18, please contact us immediately.
            </p>
          </div>
        );
      case "information":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">How We Use Your Information</h2>
            <p className="questionpara">
              MedxBay is committed to ensuring that your Personal Information is
              used responsibly and transparently. We may use the Personal
              Information we collect from you for the following purposes:
              <br />
              <br />
              <b>1. Provide Services and Products</b>
              <br />
              <ul>
                <li>
                  Service Fulfilment: To deliver the healthcare products and
                  services you request, including scheduling appointments,
                  providing telehealth consultations, and accessing medical
                  records.
                </li>
                <li>
                  Customization:To tailor our services and Site content to your
                  preferences, enhancing your overall experience with
                  personalized recommendations and features.
                </li>
              </ul>
              <br />
              <b>2. Communication and Marketing</b>
              <br />
              <ul>
                <li>
                  Informational Updates: To communicate with you about new
                  features, services, and other updates that may be of interest
                  to you.
                </li>
                <li>
                  Promotional Materials: To advertise MedxBay’s and our
                  affiliates' or partners' products and services that may be
                  relevant to you. You may opt out of these communications at
                  any time.
                </li>
              </ul>
              <br />
              <b>3. Site and Business Operations</b>
              <br />
              <ul>
                <li>
                  Site Maintenance: To operate, maintain, and improve our Site,
                  ensuring its functionality, security, and user-friendliness.
                </li>
                <li>
                  User Analysis: To identify the interests and needs of our
                  users, allowing us to improve our services and provide more
                  relevant and intelligent offerings.
                </li>
                <li>
                  Business Evaluation:To evaluate and enhance our business
                  operations, including developing new products and services,
                  managing communications, and analyzing the effectiveness of
                  our marketing and advertising strategies.
                </li>
              </ul>
              <br />
              <b>4. Data Analytics and Research</b>
              <br />
              <ul>
                <li>
                  Data Analysis: To perform market and consumer research, trend
                  analysis, and profiling, enabling us to understand usage
                  patterns and enhance user experiences on our Site.
                </li>
                <li>
                  De-Identification: To de-identify personal information for
                  aggregate reporting and analysis, ensuring privacy while
                  gaining insights into user behaviour and preferences.
                </li>
              </ul>
              <br />
              <b>5. Customer Support</b>
              <br />
              <ul>
                <li>
                  Support Services: To provide customer support, respond to
                  inquiries, and address any questions or comments you may have
                  about our services.
                </li>
              </ul>
              <br />
              <b>6. Security and Legal Compliance</b>
              <br />
              <ul>
                <li>
                  Fraud Prevention: To protect against, identify, and prevent
                  fraud, illegal activities, claims, and other liabilities that
                  may arise.
                </li>
                <li>
                  Legal Obligations: To comply with applicable legal
                  requirements, such as court orders, subpoenas, or valid legal
                  requests, and to cooperate with law enforcement authorities in
                  investigating illegal activities or violations of our
                  policies.
                </li>
                <li>
                  Legal Defense:To establish, exercise, or defend legal claims
                  and monitor compliance issues as required by law.
                </li>
              </ul>
              <br />
              <b>7. System Administration</b>
              <br />
              <ul>
                <li>
                  Troubleshooting:To perform system administration tasks and
                  troubleshoot issues that may arise on our Site, ensuring a
                  seamless experience for all users.
                </li>
              </ul>
              <br />
              <b>8. Aggregate Reporting</b>
              <br />
              <ul>
                <li>
                  Reporting:To report aggregate, non-identifiable information to
                  advertisers and other partners, providing insights into user
                  demographics and behaviour without compromising individual
                  privacy.
                </li>
              </ul>
              <br />
              <b>9. Usage Data</b>
              <br />
              <ul>
                <li>
                  Clickstream Data: To collect and analyze clickstream data,
                  both identifiable and de-identified, to determine usage
                  patterns and optimize our Site to better meet the needs of our
                  users.
                </li>
              </ul>
            </p>
          </div>
        );

      case "disclose":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">
              Who We Disclose Your Personal Information To
            </h2>
            <p className="questionpara">
              MedxBay is committed to protecting your privacy and ensuring
              transparency regarding how your Personal Information is shared. We
              may disclose your Personal Information to various parties under
              the following circumstances:
              <br />
              <br />
              <b>1. MedxBay and Its Affiliates</b>
              <br />
              <ul>
                <li>
                  Internal Sharing: We may share your Personal Information
                  within the MedxBay family of companies, including our
                  subsidiaries, parent companies, sister companies, and other
                  affiliates, to provide comprehensive healthcare services and
                  improve our offerings.
                </li>
              </ul>
              <br />
              <b>2. Third-Party Service Providers</b>
              <br />
              <ul>
                <li>
                  Service Support: We partner with third-party service providers
                  who assist us in delivering our services, including website
                  administration, survey conduction, technical support, payment
                  processing, and order fulfillment. These service providers are
                  bound by contractual obligations to protect your information
                  and are authorized to use your Personal Information only as
                  necessary to perform specific services on our behalf.
                </li>
              </ul>
              <br />
              <b>3. Business Partners and Advertisers</b>
              <br />
              <ul>
                <li>
                  Marketing and Promotions: With your explicit consent, we may
                  share your Personal Information with third-party marketing
                  partners who may contact you with promotional messages about
                  their products or services. You can opt in or out of these
                  communications at any time.
                </li>
                <li>
                  Advertising Platforms: We may share data with advertising
                  platforms such as Google, Facebook, LinkedIn, and Snapchat to
                  deliver targeted advertising campaigns. This may include
                  sharing hashed identifiers like email addresses to match you
                  with relevant audiences on these platforms.
                </li>
              </ul>
              <br />
              <b>4. Legal and Regulatory Authorities</b>
              <br />
              <ul>
                <li>
                  Compliance with Laws:We may disclose your Personal Information
                  if required by law, including compliance with legal processes
                  such as court orders, subpoenas, or search warrants. We also
                  cooperate with law enforcement and regulatory authorities in
                  investigating and prosecuting illegal activities or violations
                  of our terms and policies.
                </li>
                <li>
                  Legal Defence: In situations where disclosure is necessary to
                  protect our legal rights, privacy, safety, property, or those
                  of our affiliates, users, or others, we may disclose Personal
                  Information as required.
                </li>
              </ul>
              <br />
              <b>5. Corporate Transactions</b>
              <br />
              <ul>
                <li>
                  Mergers and Acquisitions: In the event of a merger,
                  acquisition, reorganization, or other business transaction
                  involving a transfer of ownership or control of MedxBay, your
                  Personal Information may be transferred as part of the
                  transaction. We will notify you of any such changes in
                  ownership or control of your Personal Information.
                </li>
              </ul>
              <br />
              <b>6. Public Forums</b>
              <br />
              <ul>
                <li>
                  User-Generated Content: Some of our services offer the
                  opportunity to post comments or reviews in public forums.
                  Information you disclose in these forums may be publicly
                  available and not subject to privacy protections.
                </li>
              </ul>
              <br />
              <b>7. Research and Analytics</b>
              <br />
              <ul>
                <li>
                  Aggregate Data:We may disclose aggregate data to third parties
                  for research, analysis, and marketing purposes. This data is
                  de-identified and does not identify individual users.
                </li>
              </ul>
              <br />
              <b>8. Consent-Based Sharing</b>
              <br />
              <ul>
                <li>
                  Explicit Consent:With your consent, we may share your Personal
                  Information with other parties for purposes not specifically
                  listed in this Privacy Policy. When such sharing occurs, your
                  information will be subject to the privacy policies of those
                  third parties.
                </li>
              </ul>
              <br />
              <b>9. Emergency Situations</b>
              <br />
              <ul>
                <li>
                  Urgent Situations: In emergencies, where there is a threat to
                  public safety, we may disclose your Personal Information as
                  required to protect the health and safety of individuals.
                </li>
              </ul>
              <br />
              MedxBay is not responsible for the privacy practices of any third
              party with whom your Personal Information is shared, except as
              required by applicable law. We encourage you to review the privacy
              policies of these third parties to understand how they handle your
              information.
            </p>
          </div>
        );

      case "compliance":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">
              Use and Disclosure of Personal Information Under HIPAA Compliance
            </h2>
            <p className="questionpara">
              MedxBay is committed to safeguarding your Protected Health
              Information (PHI) in accordance with the Health Insurance
              Portability and Accountability Act of 1996 (HIPAA). We take our
              responsibilities seriously and ensure that your health information
              is handled with the utmost care and confidentiality.
              <br />
              <br />
              <b>
                1. How We Use and Disclose Your Protected Health Information
              </b>
              <br />
              <ul>
                <li>
                  Appointment Services: When you use our Appointment Services to
                  schedule or request an appointment with a healthcare provider,
                  all PHI that you submit is used and disclosed by MedXBay as a
                  Business Associate of the healthcare provider. This means we
                  may only use and disclose your PHI on behalf of, or to provide
                  services to, the healthcare provider for appointment
                  scheduling and related purposes.
                </li>
                <li>
                  Business Associate Agreements: MedxBay operates under Business
                  Associate Agreements with healthcare providers, ensuring that
                  all use and disclosure of your PHI comply with HIPAA
                  regulations. These agreements mandate that we protect your PHI
                  and use it solely for permitted purposes.
                </li>
                <li>
                  Subcontractors: Some of the appointment scheduling services
                  may be provided by subcontractors of MedxBay. These
                  subcontractors are bound by the same HIPAA requirements and
                  obligations that apply to MedxBay, ensuring that your PHI is
                  handled securely and responsibly.
                </li>
                <li>
                  No Opt-Out: While you can opt-out of certain marketing
                  communications, please note that you cannot opt-out of
                  administrative emails sent by MedxBay related to Appointment
                  Services. These communications are necessary to provide you
                  with important updates and confirmations related to your
                  healthcare appointments.
                </li>
              </ul>
              <br />
              <b>2. Managing Your Protected Health Information</b>
              <br />
              <ul>
                <li>
                  Access and Amendments: Your healthcare provider will inform
                  you of your rights under HIPAA, including the right to access,
                  amend, or receive an accounting of disclosures of your PHI. To
                  exercise these rights, you must contact your healthcare
                  provider directly. MedxBay facilitates the scheduling process,
                  but the management of PHI rights remains with the healthcare
                  provider.
                </li>
                <li>
                  Restrictions and Termination: You may request restrictions on
                  the use and disclosure of your PHI through your healthcare
                  provider. MedxBay will continue to use and disclose your PHI
                  in accordance with our Business Associate Agreement until any
                  such agreement is terminated. Upon termination your account
                  with the healthcare provider will also be concluded.
                </li>
              </ul>
              <br />
              <b>3. Legal and Compliance Obligations</b>
              <br />
              <ul>
                <li>
                  Compliance with Legal Requests:MedxBay may disclose PHI as
                  required by law, such as in response to a court order,
                  subpoena, or other legal processes. We also cooperate with law
                  enforcement and regulatory authorities as necessary to ensure
                  compliance with applicable laws and regulations.
                </li>
                <li>
                  Protection of Rights:In situations where disclosure is
                  necessary to protect our legal rights, privacy, safety,
                  property, or that of our affiliates, users, or others, we may
                  disclose PHI as required.
                </li>
              </ul>
              <br />
              <b>4. Security Measures</b>
              <br />
              <ul>
                <li>
                  Safeguards: MedxBay implements stringent physical, technical,
                  and administrative safeguards to protect your PHI from
                  unauthorized access, use, or disclosure. We regularly review
                  and update our security practices to maintain the
                  confidentiality and integrity of your health information.
                </li>
              </ul>
              <br />
              <b>5. Emergency Situations</b>
              <br />
              <ul>
                <li>
                  Urgent Situations:In emergencies where there is a threat to
                  public safety or health, MedxBay may disclose your PHI as
                  required to protect the health and safety of individuals.
                </li>
              </ul>
            </p>
          </div>
        );

      case "right":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">
              Right to Know and Access Personal Information
            </h2>
            <p className="questionpara">
              At MedxBay, we are committed to transparency and empowering our
              users with access to their Personal Information. You have the
              right to request that we disclose certain details about our data
              collection and sharing practices, including:
              <br />
              <br />
              <b>1. Categories of Personal Information</b>
              <br />
              <ul>
                <li>
                  Types of Data Collected: You may request a list of the
                  categories of Personal Information we have collected about
                  you, such as contact information, health records, and usage
                  data.
                </li>
              </ul>
              <br />
              <b>2. Sources of Information</b>
              <br />
              <ul>
                <li>
                  Data Collection Sources: You have the right to know the
                  categories of sources from which your Personal Information is
                  collected, including direct interactions, third-party
                  providers, and automated technologies.
                </li>
              </ul>
              <br />
              <b>3. Business or Commercial Purpose</b>
              <br />
              <ul>
                <li>
                  Purpose of Data Collection: You can request information
                  regarding our business or commercial purposes for collecting,
                  selling, or sharing your Personal Information. This includes
                  how your data supports our services and operations.
                </li>
              </ul>
              <br />
              <b>4. Sharing with Third Parties</b>
              <br />
              <ul>
                <li>
                  Third-Party Sharing: You have the right to know the categories
                  of third parties with whom we share your Personal Information.
                  This may include service providers, business partners, and
                  legal authorities.
                </li>
              </ul>
              <br />
              <b>5. Specific Information Collected</b>
              <br />
              <ul>
                <li>
                  Individual Data Points: You may request specific pieces of
                  Personal Information we have collected about you. This ensures
                  that you have full visibility into the data we hold and how it
                  is used.
                </li>
              </ul>
              <br />
              <b>6. Requesting Disclosure</b>
              <br />
              <ul>
                <li>
                  Making a Request: To exercise your right to know and access
                  your Personal Information, please contact us at
                  info@medxbay.com. We will respond to your request within the
                  time frame required by applicable laws and ensure that you
                  have access to your information in a secure and efficient
                  manner.
                </li>
              </ul>
              <br />
              <b>7. Data Portability</b>
              <br />
              <ul>
                <li>
                  Transferring Data:Upon request, we can provide your Personal
                  Information in a structured, commonly used, and
                  machine-readable format, enabling you to transfer your data to
                  another entity if desired.
                </li>
              </ul>
              <br />
              <b>8. Verification Process</b>
              <br />
              <ul>
                <li>
                  Identity Verification:To protect your privacy, we may need to
                  verify your identity before fulfilling your request to access
                  or disclose your Personal Information. This may involve
                  confirming specific data points we have on file for you.
                </li>
              </ul>
              <br />
              <b>9. Right to Correct</b>
              <br />
              <ul>
                <li>
                  Right to Correct: You have the right to request that we
                  correct inaccurate Personal Information about you, taking into
                  account the nature of the Personal Information and the
                  purposes for processing the Personal Information. Upon
                  receiving a verifiable request by you to correct inaccurate
                  Personal Information, we will use commercially reasonable
                  efforts to correct the inaccurate Personal Information.
                </li>
              </ul>
              <br />
              <b>10. Right to Request Deletion</b>
              <br />
              <ul>
                <li>
                  Right to Request Deletion: You have the right to request that
                  we delete Personal Information about you which we have
                  collected from you. Upon receiving a verified request from you
                  to delete your Personal Information, we will delete your
                  personal information from our records, and notify service
                  providers or contractors to do the same, and notify all third
                  parties to whom the business has sold or shared your personal
                  information, to delete the consumer’s personal information,
                  unless this proves impossible or involves disproportionate
                  effort, or falls under a relevant exception according to
                  applicable law.
                </li>
              </ul>
              <br />
              You may submit a request to delete Personal Information by
              completing our rights request form available.
              <br />
              <br />
              MedxBay is dedicated to maintaining transparency and respecting
              your rights to access and understand your Personal Information. We
              strive to provide you with control and confidence in how your data
              is managed.
            </p>
          </div>
        );

      case "optOut":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">
              Right to Opt-Out of the Sale of Personal Information
            </h2>
            <p className="questionpara">
              We are required to provide You with notice if We sell or share
              Your Personal Information with third parties and provide You with
              the “Right to Opt-out of the Sale or Sharing" of Personal
              Information. You have the right to direct Us not to sell or share
              Your Personal Information (for cross-context behavioral
              advertising) to third parties. You may exercise this right by
              emailing us at info@medxbay.com
            </p>
          </div>
        );
      case "verification":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">Verification</h2>
            <p className="questionpara">
              In accordance with applicable laws, MedxBay may take necessary
              steps to verify your identity before granting access to your
              Personal Information or processing your request to exercise your
              rights. We may require you to provide specific details, such as
              your name, physical address, email address, contact information,
              and information about your account or past transactions with us.
              This verification process is designed to protect your privacy and
              ensure that we are interacting with the rightful account holder.
              We may limit our response to requests as permitted by applicable
              law.
            </p>
          </div>
        );
      case "nonDiscrimination":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">Non-Discrimination Policy</h2>
            <p className="questionpara">
              MedxBay is committed to upholding the highest standards of privacy
              and ensuring that your rights are respected. In compliance with
              applicable laws, we are dedicated to treating all individuals with
              fairness and integrity, regardless of their choices related to
              their personal information. This Non-Discrimination Policy
              outlines our commitment to protecting your rights without bias or
              prejudice.
              <br />
              <br />
              <b>1. Equal Access to Services</b>
              <br />
              <ul>
                <li>
                  No Denial of Services: MedxBay will not deny you access to our
                  services or products based on your decision to exercise your
                  privacy rights. You are entitled to access our healthcare
                  services, tools, and resources without facing discrimination.
                </li>
                <li>
                  No Variation in Quality: We will not provide a different level
                  or quality of services or products based on your exercise of
                  privacy rights. All users are entitled to receive the same
                  high standard of care and service excellence.
                </li>
              </ul>
              <br />
              <b>2. Pricing and Fees</b>
              <br />
              <ul>
                <li>
                  No Differential Pricing:MedxBay will not charge different
                  prices or rates for services or products based on your
                  exercise of privacy rights. This includes avoiding the
                  imposition of penalties, discounts, or other financial
                  incentives that could deter the exercise of these rights.
                </li>
              </ul>
              <br />
              <b>3. Privacy Rights</b>
              <br />
              <ul>
                <li>
                  Respecting Your Choices: We respect your right to control your
                  personal information and will not retaliate or discriminate
                  against you for exercising your rights, such as accessing,
                  modifying, or deleting your personal data.
                </li>
                <li>
                  Consistent Treatment: Whether you choose to access, amend, or
                  delete your personal information, MedxBay guarantees
                  consistent and fair treatment without any adverse impact on
                  your experience or services.
                </li>
              </ul>
              <br />
              <b>4. Transparency and Accountability</b>
              <br />
              <ul>
                <li>
                  Clear Communication:MedxBay commits to clear and transparent
                  communication regarding your rights and any actions we take
                  related to your personal information. We provide clear
                  instructions and support to help you understand and exercise
                  your rights.
                </li>
                <li>
                  Accountability Measures: We have implemented accountability
                  measures to ensure compliance with our Non-Discrimination
                  Policy and relevant laws. Our team is trained to uphold these
                  principles, ensuring that your privacy rights are protected
                  without exception.
                </li>
              </ul>
              <br />
              <b>5. Remedies and Support</b>
              <br />
              <ul>
                <li>
                  Remediation:If you believe you have faced discrimination or
                  differential treatment due to exercising your privacy rights,
                  please contact us immediately. We are committed to addressing
                  your concerns and providing a prompt resolution.
                </li>
                <li>
                  Support and Assistance: MedxBay offers dedicated support to
                  assist you in understanding your rights and navigating any
                  issues related to non-discrimination. Our team is available to
                  answer questions and provide guidance.
                </li>
              </ul>
              <br />
              <b>6. Compliance with Laws</b>
              <br />
              <ul>
                <li>
                  Legal Adherence:Our Non-Discrimination Policy is in compliance
                  with applicable federal and state laws, including the
                  California Consumer Privacy Act (CCPA) and other relevant
                  legislation. We continuously review our practices to ensure
                  adherence to legal standards.
                </li>
              </ul>
            </p>
          </div>
        );

      case "CookiePolicy":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">Cookie Policy</h2>
            <p className="questionpara">
              MedxBay is committed to providing a transparent experience
              regarding how we use cookies and similar technologies
              (collectively referred to as "Cookies") when you visit our Site.
              Our "Site" includes www.medxbay.com, emails we send, our mobile
              apps, third-party websites we have advertising arrangements with,
              and any other services that display this Cookie Policy. This
              policy explains what these technologies are, how we use them, and
              the options available to you for controlling their use.
            </p>

            <h2 className="questionhead">Policy Changes</h2>
            <p className="questionpara">
              MedxBay reserves the right to modify this Cookie Policy at our
              sole discretion. Any changes will be posted in relevant sections
              of the Site, and your continued use of the Site after such changes
              will constitute your acceptance of the updated Cookie Policy.
              Therefore, we encourage you to regularly review this policy for
              any updates.
            </p>

            <h2 className="questionhead">Relationship with Privacy Policy</h2>
            <p className="questionpara">
              To the extent that Cookies collect personal information, our
              Privacy Policy applies in conjunction with this Cookie Policy.
              <br />
              <br />
              <b>1. What Are Cookies?</b>
              <br />
              A "Cookie" is a small text file that a website sends to your
              browser, stored on your computer, mobile phone, tablet, or other
              connected devices (collectively, "Computer"). Cookies store
              information about your visit and usage of our Site and can be
              accessed by us or third parties to offer functionalities on our
              Sites.
              <br />
              <br />
              We may also use similar technologies, such as web beacons (also
              known as "pixels," "tags," or "clear GIFs") and JavaScript, to
              fulfill similar functions as Cookies. These technologies are
              considered "Cookies" for this Cookie Policy. For example, a web
              beacon is often a one-pixel transparent image embedded in a
              website or email, while our mobile application may use "software
              development kits" (SDKs) provided by us or third parties.
              <br />
              <br />
              <b>Types of Cookies:</b>
              <br />
              <ul>
                <li>
                  <b>First-party Cookies:</b> These are Cookies placed and
                  accessed directly by us on your Computer.
                </li>
                <li>
                  <b>Third-party Cookies:</b> These are Cookies placed and
                  accessed by third-party advertisers or service providers.
                </li>
              </ul>
              Cookies can be either "persistent" (remain on your Computer until
              deleted) or "temporary" (last only until your browser is closed).
              <br />
              <br />
              <b>2. Kinds of Cookies We Use</b>
              <br />
              Our Site may use the following types of Cookies:
              <br />
              <ul>
                <li>
                  <b>Strictly Necessary Cookies:</b> Essential for providing the
                  Site's services and features, preventing fraudulent activity,
                  improving security, and system administration. Without these
                  Cookies, we may be unable to provide certain services or
                  features.
                </li>
                <li>
                  <b>Functionality and Preference Cookies:</b> These Cookies
                  collect information about your preferences and choices, such
                  as user settings, allowing us to customize the Site
                  accordingly. For example, MedxBay uses these Cookies to
                  recognize registered users and manage access privileges.
                </li>
                <li>
                  <b>Performance Cookies:</b> These Cookies collect data on how
                  you use the Site, enabling us to track usage patterns, assess
                  performance, and improve functionality. They help us identify
                  frequently visited pages, record any issues you encounter,
                  evaluate the effectiveness of our advertising, and estimate
                  audience size.
                </li>
                <li>
                  <b>Targeting Cookies:</b> We and third-party advertisers may
                  use these Cookies to show you advertisements tailored to your
                  interests based on your interactions with our Site. These ads
                  may appear on our Site, other websites, or social media
                  networks. Targeting Cookies help personalize your viewing
                  experience on MedxBay and third-party sites.
                </li>
                <li>
                  <b>Social Media Cookies:</b> These Cookies enable you to log
                  into our Site or share content using your social media
                  account. They may also assist in placing advertisements on
                  social media networks.
                </li>
              </ul>
              <br />
              <b>3. Options for Managing Cookies</b>
              <br />
              Most web browsers are set up to accept Cookies by default.
              However, if you prefer, you can decline the placement of Cookies
              on your hard drive by using your browser's settings. Refer to your
              browser's "Help" function for guidance. More information about
              Cookies can be found at All About Cookies. Please note that
              certain Site areas may not function properly if Cookies are
              disabled.
              <br />
              <br />
              Unlike browser Cookies, "Flash cookies" are not stored in the
              browser. You may manage Flash cookies by visiting the Adobe
              website.
              <br />
              <br />
              <b>
                4. Choices Relating to Interest-Based Advertising Related to
                Cookies
              </b>
              <br />
              MedxBay collaborates with third-party network advertisers to serve
              ads on the Site and manage advertising on other websites. These
              partners may use Cookies to collect information about your
              activities on this Site and others, allowing for targeted
              advertising based on your interests.
              <br />
              <br />
              <b>Opting Out:</b> Some advertising networks offer an option to
              "opt-out" of interest-based advertising. To exercise this option,
              visit About Ads Choices and Network Advertising Initiative.
              <br />
              <br />
              <b>Cross-Device Opt-Out:</b> To opt out of interest-based
              advertising across browsers and devices, visit the Digital
              Advertising Alliance or National Advertising Institute websites.
              Additionally, you can opt out through your mobile app or device
              settings. Note that opt-out choices may apply only to the browser
              or device you use, so you may need to opt out on each device
              separately.
              <br />
              <br />
              <b>Advertising Limitations:</b> Opting out through these
              mechanisms will not stop all online advertising; you will still
              receive ads, but they may not be tailored to your interests. The
              websites you visit may continue to collect information about your
              visits.
            </p>
          </div>
        );

      case "contact":
        return (
          <div className="fullsixe45">
            <h2 className="questionhead">Contact Us</h2>
            <p className="questionpara">
              You may contact Us with questions or concerns about our privacy
              policies or practices.
              <br />
              <br />
              <br />
              <b>Please email or write to Us at:</b>
              <br />
              Email address: info@medxbay.com
              <br />
              <br />
              <br />
              <b>send a letter to us at:</b> <br />
              Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ,
              Ras Al Khaimah, United Arab Emirates
            </p>
          </div>
        );
      default:
        return <div>Select a section from the left sidebar</div>;
    }
  };

  return (
    <div className="privacy-policy">
      <h2 className="privacyh2">Privacy Policy</h2>
      <div className="privacy-policy-container">
        <div className="sidebar-policy">
          <ul>
            {sections.map((section) => (
              <li
                key={section.key}
                onClick={() => setSelectedSection(section.key)}
                className={selectedSection === section.key ? "active76" : ""}
                aria-label={`Navigate to ${section.label}`}
              >
                {section.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="content-area-policy">{renderContent()}</div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
