import type { ReactNode } from "react";
import { ThemeProvider, ThemeToggle } from "@/components/theme-provider.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { HomeIcon, BriefcaseIcon, CodeIcon, TrophyIcon, UserIcon, MailIcon, LogInIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext.tsx";
import { AuthComponent } from "@/components/auth.tsx";

interface MainLayoutProps {
  children: ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

export function MainLayout({ children, activePage, setActivePage }: MainLayoutProps) {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <SidebarProvider defaultOpen>
        <div className="min-h-screen flex transition-colors bg-background w-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-2">
                <h1 className="text-xl font-bold">Meghdip Karmakar</h1>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activePage === "home"}
                        onClick={() => setActivePage("home")}
                        tooltip="Home"
                      >
                        <HomeIcon />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activePage === "experience"}
                        onClick={() => setActivePage("experience")}
                        tooltip="Experience"
                      >
                        <BriefcaseIcon />
                        <span>Experience</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activePage === "projects"}
                        onClick={() => setActivePage("projects")}
                        tooltip="Projects"
                      >
                        <CodeIcon />
                        <span>Projects</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activePage === "hackathons"}
                        onClick={() => setActivePage("hackathons")}
                        tooltip="Hackathons"
                      >
                        <TrophyIcon />
                        <span>Hackathons</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {isAuthenticated && (
                <SidebarGroup>
                  <SidebarGroupLabel>Connect</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={activePage === "contact"}
                          onClick={() => setActivePage("contact")}
                          tooltip="Contact Me"
                        >
                          <MailIcon />
                          <span>Contact Me</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </SidebarContent>

            <SidebarFooter>
              <AuthComponent />
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 overflow-auto w-full">
            <header className="flex justify-between items-center py-4 px-4 md:px-6 w-full border-b">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="flex" />
              </div>
              <ThemeToggle />
            </header>

            <main className="p-4 md:p-6 w-full flex justify-center">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
