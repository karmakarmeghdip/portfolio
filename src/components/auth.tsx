import { Button } from "@/components/ui/button.tsx";
import { authClient } from "@/lib/auth-client";
import { LogInIcon, UserIcon } from "lucide-react";

export const AuthComponent = ({ session }: { session: any }) => {
  const data = session;
  const login = () => {
    authClient.signIn.social({
      provider: 'google',
      callbackURL: '/'
    })
  };
  const logout = async () => {
    await authClient.signOut();
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  };
  const profileImageUrl = data?.user?.image as string || null;
  const name = data?.user?.name as string || null;
  return <>{!data ? (
    <Button
      variant="outline"
      className="flex w-full gap-2 justify-center"
      onClick={login}
    >
      <LogInIcon size={16} />
      <span>Login</span>
    </Button>
  ) : (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-2">
        <div className="bg-primary rounded-full p-0.5">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-4 h-4 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <UserIcon size={16} className="text-primary-foreground" />
          )}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={logout}
      >
        Sign Out
      </Button>
    </div>
  )
  }</>;
}