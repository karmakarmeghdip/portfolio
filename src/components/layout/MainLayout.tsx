import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
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
import { HomeIcon, BriefcaseIcon, CodeIcon, TrophyIcon, UserIcon, MailIcon, LogInIcon, UsersIcon } from "lucide-react";
import { AuthComponent } from "@/components/auth.tsx";

interface MainLayoutProps {
  children: ReactNode;
  activePage: string;
  session: { session: any, user: any } | null;
}

export function MainLayout({ children, activePage, session }: MainLayoutProps) {
  const isAuthenticated = session;
  const setActivePage = (page: string) => {
    console.log(page);
  };

  return (

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
                    <a href="/">
                      <SidebarMenuButton
                        isActive={activePage === "home"}
                        onClick={() => setActivePage("home")}
                        tooltip="Home"
                      >
                        <HomeIcon />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <a href="/experience">
                      <SidebarMenuButton
                        isActive={activePage === "experience"}
                        onClick={() => setActivePage("experience")}
                        tooltip="Experience"
                      >
                        <BriefcaseIcon />
                        <span>Experience</span>
                      </SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <a href="/projects">
                      <SidebarMenuButton
                        isActive={activePage === "projects"}
                        onClick={() => setActivePage("projects")}
                        tooltip="Projects"
                      >
                        <CodeIcon />
                        <span>Projects</span>
                      </SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <a href="/hackathons">
                      <SidebarMenuButton
                        isActive={activePage === "hackathons"}
                        onClick={() => setActivePage("hackathons")}
                        tooltip="Hackathons"
                      >
                        <TrophyIcon />
                        <span>Hackathons</span>
                      </SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>


            <SidebarGroup>
              <SidebarGroupLabel>Connect</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <a href="/contact">
                      <SidebarMenuButton
                        isActive={activePage === "contact"}
                        onClick={() => setActivePage("contact")}
                        tooltip="Contact Me"
                      >
                        <MailIcon />
                        <span>Contact Me</span>
                      </SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <a href="/forum">
                      <SidebarMenuButton
                        isActive={activePage === "forum"}
                        onClick={() => setActivePage("forum")}
                        tooltip="Forum"
                      >
                        <UsersIcon />
                        <span>Forum</span>
                      </SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

          </SidebarContent>

          <SidebarFooter>
            <AuthComponent session={session} />
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
  );
}
