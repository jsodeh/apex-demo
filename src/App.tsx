
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "./pages/HomePage";
import TrackingPage from "./pages/TrackingPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import AdminGuard from "@/components/auth/AdminGuard";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/tracking/:trackingId" element={<TrackingPage />} />
              
              {/* Protected admin routes */}
              <Route element={<AdminGuard />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
