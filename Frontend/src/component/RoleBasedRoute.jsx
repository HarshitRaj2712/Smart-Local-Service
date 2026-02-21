import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { role } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;