import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import profile from '../assets/profile.jpg';

export function MeghdipAvatar() {
  return (
    <Avatar className="w-32 h-32 border-4 border-primary">
      <AvatarImage src={profile.src} alt="Meghdip's Face" />
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
  )
}