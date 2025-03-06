import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeProvider, ThemeToggle } from "@/components/theme-provider";
import "../styles/globals.css"

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen p-4 md:p-8 transition-colors bg-background">
        <header className="container flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <ThemeToggle />
        </header>

        <main className="container py-8">
          <section className="grid gap-6">
            {/* Add your portfolio content here */}
            <Card>
              <CardHeader>
                <CardTitle>Welcome to my Portfolio</CardTitle>
                <CardDescription>
                  A showcase of my projects and skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hello World</p>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
