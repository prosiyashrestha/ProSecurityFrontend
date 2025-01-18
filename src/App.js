import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/login/Login";
import SignUp from "./pages/register/Register";

import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/landingpage/Landingpage";
import ForgotPassword from "./pages/forgotpassword/Forgotpassword";
import UserDashboard from "./pages/user/UserDashboard";
import BookingPage from "./pages/booking/BookingPage"; // Import the new booking page component
import VenueDetails from "./pages/user/VenueDetails";
import AboutUs from "./pages/aboutus/Aboutus";
import ContactUs from "./pages/contactus/Contactus";
import TermsAndConditions from "./pages/Termsandcondition/TermsandCondition";
import Profile from "./pages/profile/Profile";
import BookingDetails from "./pages/booking/BookingDetails";
import UnauthorizedPage from "./pages/protected/Unauthorized";

function App() {
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : undefined;
  const token = localStorage.getItem("token");

  // Check user authentication and roles
  const isAuthenticated = !!token;
  const userRole = userData ? userData.role : null;
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              userRole == "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/admin"
          element={
            isAuthenticated && userRole == "admin" ? (
              <AdminDashboard />
            ) : isAuthenticated ? (
              <Navigate to="/unauthorized" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user"
          element={
            isAuthenticated && userRole == "user" ? (
              <UserDashboard />
            ) : isAuthenticated ? (
              <Navigate to="/unauthorized" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/destination/:destinationId" element={<VenueDetails />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route
          path="/venue/:venueId/:venuePrice/book"
          element={<BookingPage />}
        />{" "}
        {/* Add this route */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<BookingDetails />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
