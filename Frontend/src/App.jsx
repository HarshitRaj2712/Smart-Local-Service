import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import RoleBasedRoute from "./component/RoleBasedRoute";

import Home from "./pages/Home";
import HowItWorksPage from "./pages/HowItWorksPage";
import FeaturesPage from "./pages/FeaturesPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProviderProfileSetup from "./pages/ProviderProfileSetup";
import Providers from "./pages/Providers";
import ProviderDetail from "./pages/ProviderDetail";
import BookingForm from "./pages/BookingForm";
import UserBookings from "./pages/UserBookings";
import ChatRoom from "./pages/ChatRoom";
import Chats from "./pages/Chats";
import Notifications from "./pages/Notifications";
import ProviderAnalytics from "./pages/ProviderAnalytics";
import OAuthSuccess from "./pages/OAuthSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutPage from "./pages/footer-page/AboutPage";
import HelpCenterPage from "./pages/footer-page/HelpCenterPage";
import HowToFindAProPage from "./pages/footer-page/HowToFindAProPage";
import ProviderVerificationPage from "./pages/footer-page/ProviderVerificationPage";
import PrivacyPolicyPage from "./pages/footer-page/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/footer-page/TermsAndConditionsPage";

const App = () => {
  return (
    <>
      <Navbar  />
      <main className="pt-24 md:pt-28 bg-[#FFF0F5]"></main>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/how" element={<HowItWorksPage />} />
         <Route path="/features" element={<FeaturesPage />} />
         <Route path="/providers" element={<Providers />} />
         <Route path="/providers/:id" element={<ProviderDetail />} />
         <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-email/:token"
          element={<VerifyEmail />}
        />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/how-to-find-a-pro" element={<HowToFindAProPage />} />
        <Route path="/provider-verification" element={<ProviderVerificationPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />

        <Route
          path="/provider/analytics"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["provider"]}>
                <ProviderAnalytics />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["provider"]}>
                <ProviderDashboard />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
        path="/provider/setup"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["provider"]}>
              <ProviderProfileSetup />
            </RoleBasedRoute>
          </ProtectedRoute>
          }
        />
        <Route
          path="/user/bookings"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["user"]}>
                <UserBookings />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:bookingId"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["user", "provider"]}>
                <ChatRoom />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["user", "provider"]}>
                <Chats />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

      </Routes>
      
    </>
  );
};

export default App;