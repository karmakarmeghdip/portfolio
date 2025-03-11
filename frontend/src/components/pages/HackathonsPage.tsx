import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HackathonProps {
  name: string;
  date: string;
  project: string;
  team: string;
  contribution: string;
  achievement?: string;
  projectLink?: string;
}

const hackathonsList: HackathonProps[] = [
  {
    name: "Status Code 1",
    date: "August 25, 2024",
    project: "NFTree",
    team: "Bugslayers",
    contribution: "An app that lets tree planters take pictures of their trees and post updates daily to get carbon credits, which is an ERC20 token and can be sold to companies looking to offset their carbon emissions. Deployed on Avalanche Fuji Testnet.",
    achievement: "Won the first runner position",
    projectLink: "https://github.com/Bugs-Layers/nftree"
  },
  {
    name: "Smart India Hackathon",
    date: "December 2023",
    project: "Crowdflow",
    team: "Team Takshashakti",
    contribution: "Worked on creating a scalable and serverless backend for Crowdflow using Typescript, Hono, Drizzle, Cloudflare Workers, and Cloudflare D1.",
    projectLink: "https://github.com/Takshashakti/CrowdflowWorkers"
  },
  {
    name: "Diversion",
    date: "February 2023",
    project: "SonorousPlay",
    team: "Team Hacker5_United",
    contribution: "Worked on the P2P IPFS part of SonorousPlay, a peer to peer music sharing web app using IPFS.",
    projectLink: "https://github.com/Hacker5-UnitEd/SonorousPlay"
  }
];

export function HackathonsPage() {
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Hackathons</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            A list of hackathons I've participated in, along with the projects I worked on and achievements.
          </p>

          <div className="space-y-6">
            {hackathonsList.map((hackathon, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{hackathon.name}</CardTitle>
                    <Badge variant="outline">{hackathon.date}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">Project: </span>
                    <span>{hackathon.project}</span>
                  </div>
                  <div>
                    <span className="font-medium">Team: </span>
                    <span>{hackathon.team}</span>
                  </div>
                  <div>
                    <span className="font-medium">Contribution: </span>
                    <span>{hackathon.contribution}</span>
                  </div>
                  {hackathon.achievement && (
                    <div>
                      <span className="font-medium">Achievement: </span>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        {hackathon.achievement}
                      </Badge>
                    </div>
                  )}
                  {hackathon.projectLink && (
                    <div>
                      <span className="font-medium">Project Link: </span>
                      <a
                        href={hackathon.projectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {hackathon.projectLink}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
