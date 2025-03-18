import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import GithubCalendar from "react-github-calendar"

export const GithubCard = () => {
  try {
    return <Card>
      <CardHeader>
        <CardTitle>GitHub</CardTitle>
        <CardDescription>My recent activity</CardDescription>
      </CardHeader>
      <CardContent className="h-40 pt-3 flex items-center justify-center bg-muted/20">

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
  } catch (error) {
    console.log("Error", error)
    return <></>
  }
}