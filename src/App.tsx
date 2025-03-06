import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/components/pages/HomePage";
import { ExperiencePage } from "@/components/pages/ExperiencePage";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { HackathonsPage } from "@/components/pages/HackathonsPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { useAuth } from "@/contexts/AuthContext";
import "../styles/globals.css";

function AppContent() {
  const [activePage, setActivePage] = useState("home");
  const { isAuthenticated } = useAuth();

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <HomePage />;
      case "experience":
        return <ExperiencePage />;
      case "projects":
        return <ProjectsPage />;
      case "hackathons":
        return <HackathonsPage />;
      case "contact":
        return isAuthenticated ? <ContactPage /> : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <MainLayout activePage={activePage} setActivePage={setActivePage}>
      {renderContent()}
    </MainLayout>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
