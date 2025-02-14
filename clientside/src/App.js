import React from 'react';
import './App.css';

//imported bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'


//We using react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//All components imported here....
import Navbar from './Components/GeneralPage/Navbar/Navbar';
import Nestednavbar from './Components/GeneralPage/Nestednavbar/Nestednavbar';
import Footer from './Components/GeneralPage/Footer/Footer';
import LandingAll from './Components/Landing_page/LandingAll/LandingAll';
import DoctorPhysician from './Components/GeneralPage/Navbar/NavItems/DoctorPhysician/DoctorPhysician';
import Patients from './Components/GeneralPage/Navbar/NavItems/Patients/Patients';
import Enterprise from './Components/GeneralPage/Navbar/NavItems/Enterprise/Enterprise';
import NewsRoom from './Components/GeneralPage/Navbar/NavItems/NewsRoom/NewsRoom';
import SignupCard from './Components/Authentication/Signup/signup';
import VerifyLogin from './Components/Authentication/Login/VerifyLogin';
import Login from './Components/Authentication/Login/login';
import Verification from './Components/Authentication/Login/Verification';
import { SearchProvider } from './Components/GeneralPage/Context/context';
import ChangePassword from './Components/Authentication/Login/changepassword';
import About from './Components/GeneralPage/About/About';
import FaqSection from './Components/GeneralPage/Footer/FooterLink/FaqSection';
import PrivacyPolicy from './Components/GeneralPage/Footer/FooterLink/PrivacyPolicy';
import TermsAndConditions from './Components/GeneralPage/Footer/FooterLink/TermsAndConditions';
import ContactUs from './Components/GeneralPage/Footer/FooterLink/ContactUs/ContactUs';
import ConnectedRoutes from './Components/DoctorSide/ProfileItem/DashboardAll/ConnectedRoutes/ConnectedRoutes';
import DoctorEdit from './Components/DoctorSide/DoctorEdit/DoctorEdit';
import  ProviderProfile from './Components/DoctorSide/ProviderProfile/ProviderProfile';
import SubscriptionPlans from './Components/DoctorSide/Subscription/SubscriptionPlans';
import Message from './Components/DoctorSide/Subscription/Message';
import ProfileRoutes from './Components/PatientSide/ProfileRoutes';
import Blog from './Components/BlogandConditions/blog';
import ConditionLibrariesMenu from './Components/BlogandConditions/ConditionLibrariesMenu';
import Showall from './Components/BlogandConditions/Showall';
import Blognew from './Components/BlogandConditions/blognew';
import FilterPage from './Components/FilterPage/FilterPage';
import Adminroute from './Components/Admin/Admindashboard/Adminroute/Adminroute';
import OurProvidersPage from './Components/Corporate/OurProvidersPage/OurProvidersPage';
import Corporateroute from './Components/Corporate/Corporatedashboard/Corporateroute/Corporateroute';
import CorporateFilter from './Components/Corporate/CorporateFilterPage/FilterPage';
import OurProductsPage from './Components/Supplier/OurProductsPage/OurProductsPage';
import Supplierroute  from './Components/Supplier/Supplierdashboard/Supplierroute/Supplierroute';
import SupplierFilter from './Components/Supplier/SupplierFilterPage/FilterPage';

function App() {
  return (
   <>
      <SearchProvider>
        <Router>
          <Routes>
            {/* Landing */}
            <Route path="/" element={[<LandingAll/>,<Footer/>]} />
            
            {/* Authentication */}
            <Route path="/signup" element={<SignupCard/>}/>
            <Route path="/verify/login" element={<VerifyLogin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/verify" element={<Verification/>}/>
            <Route path="/reset-password" element={<ChangePassword/>}/>

            {/* General page route */}
            {/* Navbar-route */}
            <Route path="/doctor/physician" element={[<Nestednavbar/>,<DoctorPhysician/>,<Footer/>]}/>
            <Route path="/patients" element={[<Nestednavbar/>,<Patients/>,<Footer/>]}/>
            <Route path="/enterprise" element={[<Navbar/>,<Enterprise/>,<Footer/>]}/>
            <Route path="/Spotlights" element={[<Nestednavbar/>,<NewsRoom/>,<Footer/>]}/>

            {/* Footer-route */}
            <Route path="/abouts" element={[<Navbar/>,<About/>,<Footer/>]}/>
            <Route path="/faq-questions" element={[<Navbar/>,<FaqSection/>,<Footer/>]}/>
            <Route path="/our-privacy/policy" element={[<Navbar/>,<PrivacyPolicy/>,<Footer/>]}/>
            <Route path="/our-terms/conditions" element={[<Navbar/>,<TermsAndConditions/>,<Footer/>]}/>
            <Route path="/contact-us" element={[<Navbar/>,<ContactUs/>,<Footer/>]}/>

            {/* Doctor-side-Documents-route */}
            <Route path="/doctorprofile/dashboardpage/*" element={<ConnectedRoutes/>}/>
            <Route path="/edit/profile/doctor" element={[<Navbar/>,<DoctorEdit/>,<Footer/>]}/>
            <Route path="/doc-profile" element={[<Nestednavbar/>,<ProviderProfile/>,<Footer/>]}/>
            <Route path="/book-appointment/:slug" element={[<Nestednavbar/>,<ProviderProfile />,<Footer/>]}/>
            <Route path="/SubscriptionPlans" element={[<Navbar/>,<SubscriptionPlans/>,<Footer/>]}/>
            <Route path="/Message" element={[<Navbar/>,<Message />,<Footer/>]}/>

            {/* Patient-side-Documents-route */}
            <Route path="/profile/*" element={<ProfileRoutes />}/>

            {/* Blog page condition-libraries routes */}
            <Route path="/condition-libraries-menu" element={[<Nestednavbar/>,<ConditionLibrariesMenu />,<Footer/>]}/>
            <Route path="/condition-libraries/:condition" element={[<Nestednavbar/>,<Blog />,<Footer/>]}/>
            <Route path="/blogs/showAll/:condition/:category" element={[<Nestednavbar/>,<Showall />,<Footer/>]}/> 
            <Route path="/blogPost/:id" element={[<Nestednavbar/>,<Blognew />,<Footer/>]}/> 
             
            {/* Fiter page route */}
            <Route path="/Filters" element={[<Nestednavbar/>,<FilterPage />,<Footer/>]} />
            
            {/* Admin route*/}
            <Route path="/admin/dashboardpage/*" element={<Adminroute/>}/>

            {/* Corporate route*/}
            <Route path="/OurProviders" element={[<Nestednavbar/>,<OurProvidersPage/>,<Footer/>]}/>
            <Route path="/corporate/dashboardpage/*" element={<Corporateroute/>} />
            <Route path="/corporate/Filters" element={[<Nestednavbar/>,<CorporateFilter />,<Footer/>]} />
            <Route path="/OurProviders/:slug" element={[<Nestednavbar/>,<OurProvidersPage/>,<Footer/>]}/>

            {/* Suppliers route*/}
            <Route path="/OurProducts" element={[<Nestednavbar/>,<OurProductsPage/>,<Footer/>]}/>
            <Route path="/supplier/dashboardpage/*" element={[<Navbar/>,<Supplierroute/>,<Footer/>]} />
            <Route path="/supplier/Filters" element={[<Nestednavbar/>,<SupplierFilter/>,<Footer/>]} />
            <Route path="/OurProducts/:slug" element={[<Nestednavbar/>,<OurProductsPage/>,<Footer/>]}/>
          </Routes>
        </Router>
      </SearchProvider>
    </>
  );
}

export default App;
