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

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
          path="/provider"
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
      </Routes>
      
    </>
  );
};

export default App;