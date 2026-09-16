import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../../../stores/authStore";

const RestrictedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RestrictedRoute;
