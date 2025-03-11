import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ExperiencePage() {
  return (
    <div className="space-y-6 w-full">
      {/* Education Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Kalyani Government Engineering College</h3>
            <p className="text-muted-foreground">Kalyani, Nadia, West Bengal</p>
            <div className="flex items-center justify-between">
              <p>B.TECH IN INFORMATION TECHNOLOGY</p>
              <p className="text-sm text-muted-foreground">Oct 2022 – Oct 2026</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Experience Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Professional Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">Aarish Remote</h3>
                <p className="text-muted-foreground">BACKEND DEVELOPER/MLOPS INTERN</p>
              </div>
              <p className="text-sm text-muted-foreground">January 2024 – February 2025</p>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Deploying ML Models on to the Cloud</li>
              <li>Developing and maintaining Nodejs/Express Backend for a website</li>
              <li>Developing a Production Rust Backend for an AI Application, with Custom Auth and MongoDB as Database</li>
              <li>Created a Full Radar Simulation Desktop App for Training</li>
              <li>Created a Full stack app with LLM and RAG for Report analysis and knowledgebase Query</li>
              <li>Maintaining a complex video processing pipeline with AI object detection</li>
              <li>Built a scalable local first AI application to resolve queries about lecture videos from Transcript and LLM</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
