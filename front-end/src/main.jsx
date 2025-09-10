import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { UIProvider } from "./context/UIContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ProgressOnRouteAndFetch from "./components/ui/ProgressOnRouteAndFetch.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <UIProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <ProgressOnRouteAndFetch />
            <AppRouter />
          </AuthProvider>
        </QueryClientProvider>
      </UIProvider>
    </Router>
  </StrictMode>
);
