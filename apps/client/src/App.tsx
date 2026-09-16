import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./stores/authStore";
import { restoreSession } from "./services/httpClient";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./shared/Routes/ProtectedRoute/ProtectedRoute";
import Loader from "./shared/Loader/Loader";
import RestrictedRoute from "./shared/Routes/RestrictedRoute/RestrictedRoute";
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const WorkspacePage = lazy(() => import("./pages/WorkspacePage/WorkspacePage"));

function App() {
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    restoreSession();
  }, []);

  if (!isInitialized) {
    return <Loader text="Restoring session..." size={40} />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<RestrictedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<WorkspacePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
