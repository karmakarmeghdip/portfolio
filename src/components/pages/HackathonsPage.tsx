import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HackathonsPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hackathons</CardTitle>
      </CardHeader>
      <CardContent>
        Details about hackathons I've participated in will be listed here.
      </CardContent>
    </Card>
  );
}
