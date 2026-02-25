import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import RoleBasedRoute from "./component/RoleBasedRoute";

import Home from "./pages/Home";
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
import ProviderAnalytics from "./pages/ProviderAnalytics";
import OAuthSuccess from "./pages/OAuthSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

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

      </Routes>
      
    </>
  );
};

export default App;