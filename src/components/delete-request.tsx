import { actions } from "astro:actions";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";

export const DeleteRequest = ({ item }: { item: any }) => {

  return <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar>
            <img
              src={
                item.user?.image ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(item.user?.name || "User")}`
              }
              alt={item.user?.name || "User"}
              className="rounded-full w-10 h-10 object-cover"
            />
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {item.contact?.name}
            </CardTitle>
            <CardDescription className="text-sm truncate max-w-[200px]">
              {item.contact?.email}
            </CardDescription>
          </div>
        </div>
        <Badge variant="outline">{item.contact?.jobType}</Badge>
      </div>
    </CardHeader>

    <CardContent>
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Budget
          </p>
          <p className="font-medium">${item.contact?.amount}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Description
          </p>
          <p className="text-sm line-clamp-3">
            {item.contact?.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Requested on
          </p>
          <p className="text-sm">
            {new Date(
              item.contact?.createdAt || "",
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex justify-between border-t pt-4">
      <Button variant="outline" size="sm">
        View Details
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={async () => {
          console.log(item.contact?.id);
          if (!item.contact?.id) return;
          const res = await actions.contactDelete({
            id: item.contact?.id,
          });
          res.data && location.reload();
          console.error(res.error);
        }}
      >
        Delete
      </Button>
    </CardFooter>
  </Card>
}