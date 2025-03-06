import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HomePage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-3xl">Welcome to my Portfolio</CardTitle>
        <CardDescription className="text-lg">
          A showcase of my projects and skills with Catppuccin theme
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Hello World! This site is styled with Catppuccin colors.</p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Catppuccin</Badge>
          <Badge variant="secondary">shadcn/ui</Badge>
          <Badge variant="outline">React</Badge>
          <Badge className="bg-[var(--ctp-latte-lavender)] dark:bg-[var(--ctp-mocha-lavender)] text-background">Lavender</Badge>
          <Badge className="bg-[var(--ctp-latte-peach)] dark:bg-[var(--ctp-mocha-peach)] text-background">Peach</Badge>
          <Badge className="bg-[var(--ctp-latte-blue)] dark:bg-[var(--ctp-mocha-blue)] text-background">Blue</Badge>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </CardContent>
    </Card>
  );
}
