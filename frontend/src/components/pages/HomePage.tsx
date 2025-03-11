import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GithubCalendar from 'react-github-calendar';
import profile from "../../assets/profile.jpg";
import { SpotifyCard } from "../spotify-card";

export function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      {/* Hero Section with Avatar */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <Avatar className="w-32 h-32 border-4 border-primary">
          <AvatarImage src={profile} alt="Profile picture" />
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>

        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">Meghdip Karmakar</h1>
          <p className="text-xl text-muted-foreground mb-4">Fullstack Developer & AI Enthusiast</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Button asChild>
              <a href="#contact">Contact Me</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#projects">View Work</a>
            </Button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            I'm a B.Tech student in Information Technology at Kalyani Government Engineering College (2022-2026).
            I'm passionate about backend development, AI/ML, and Web3 technologies.
            I enjoy participating in hackathons and have won recognition for projects like NFTree.
            When I'm not coding, I'm constantly exploring new technologies and frameworks to expand my skill set.
          </p>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skills & Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>JavaScript</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Rust</Badge>
                <Badge>Go</Badge>
                <Badge>Python</Badge>
                <Badge>SQL</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>Express.js</Badge>
                <Badge>Hono</Badge>
                <Badge>ElysiaJS</Badge>
                <Badge>Prisma</Badge>
                <Badge>Drizzle</Badge>
                <Badge>Gin</Badge>
                <Badge>Axum</Badge>
                <Badge>Next.js</Badge>
                <Badge>Tailwind CSS</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Domains</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Backend Development</Badge>
                <Badge variant="secondary">DevOps</Badge>
                <Badge variant="secondary">AI/ML</Badge>
                <Badge variant="secondary">Web3</Badge>
                <Badge variant="secondary">Frontend Development</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub and Spotify Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* GitHub Profile Card Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>GitHub</CardTitle>
            <CardDescription>My recent activity</CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center bg-muted/20">
            <GithubCalendar username="karmakarmeghdip" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/karmakarmeghdip" target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </Button>
          </CardFooter>
        </Card>

        {/* Spotify Now Playing Card Placeholder */}
        <SpotifyCard />
      </div>
    </div>
  );
}
