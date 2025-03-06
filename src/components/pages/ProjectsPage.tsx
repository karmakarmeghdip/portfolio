import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectsPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent>
        My portfolio projects will be showcased here.
      </CardContent>
    </Card>
  );
}
