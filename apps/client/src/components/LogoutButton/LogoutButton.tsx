import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuthStore } from "../../stores/authStore";
import s from "./LogoutButton.module.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await authService.logout();

      clearAuth();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      type="button"
      className={s.logoutButton}
      onClick={() => {
        void handleLogout();
      }}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
