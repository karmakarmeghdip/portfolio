import { useState, useEffect } from "react";
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

  // Get page from hash
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home'; // Default to home if no hash
  };

  // Set hash based on page
  const setHashFromPage = (page: string) => {
    window.location.hash = page;
  };

  // Update active page when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setActivePage(page);
    };

    // Set initial page from hash
    setActivePage(getPageFromHash());

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Clean up event listener
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Modified function to update hash when page changes
  const handlePageChange = (page: string) => {
    setHashFromPage(page);
    setActivePage(page);
  };

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
    <MainLayout activePage={activePage} setActivePage={handlePageChange}>
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
