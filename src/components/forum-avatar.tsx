import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const ForumAvatar = ({ image, name, username }: { image: string | null, name: string, username: string }) => {
  return (<Avatar className="h-6 w-6">
    {image &&
      <AvatarImage
        src={image}
        alt={name}
      />
    }
    <AvatarFallback>
      {username.substring(0, 2).toUpperCase()}
    </AvatarFallback>
  </Avatar>)
}