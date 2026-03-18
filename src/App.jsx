import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const InventoryPage = lazy(() => import("./pages/InventoryPage.jsx"));
const VehicleDetailPage = lazy(() => import("./pages/VehicleDetailPage.jsx"));
const FinancePage = lazy(() => import("./pages/FinancePage.jsx"));
const ServicePage = lazy(() => import("./pages/ServicePage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const SpecialsPage = lazy(() => import("./pages/SpecialsPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const DealerAIChatLanding = lazy(() => import("./pages/landing/DealerAIChatLanding.jsx"));
const DealerChatbotLanding = lazy(() => import("./pages/landing/DealerChatbotLanding.jsx"));
const AutoAIAssistantLanding = lazy(() => import("./pages/landing/AutoAIAssistantLanding.jsx"));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-[#D4A843] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/landing/dealer-ai-chat" element={<DealerAIChatLanding />} />
        <Route path="/landing/dealer-chatbot" element={<DealerChatbotLanding />} />
        <Route path="/landing/auto-ai-assistant" element={<AutoAIAssistantLanding />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/new" element={<InventoryPage condition="new" />} />
          <Route path="/inventory/used" element={<InventoryPage condition="used" />} />
          <Route path="/inventory/certified" element={<InventoryPage condition="certified" />} />
          <Route path="/inventory/:id" element={<VehicleDetailPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/specials" element={<SpecialsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
