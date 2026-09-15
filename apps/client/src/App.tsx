import { useEffect } from "react";
import "./App.css";
import WorkspacePage from "./pages/WorkspacePage/WorkspacePage";
import { useAuthStore } from "./stores/authStore";
import { restoreSession } from "./services/httpClient";

function App() {
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    restoreSession();
  }, []);

  if (!isInitialized) {
    return null;
  }
  return (
    <>
      <WorkspacePage />
    </>
  );
}

export default App;
