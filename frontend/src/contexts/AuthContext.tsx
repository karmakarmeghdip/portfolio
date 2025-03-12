import { createContext, useContext, type ReactNode } from "react";
import authClient from "@/lib/authClient.ts";

interface AuthContextType {
  data: any;
  isPending: boolean;
  error: unknown;
  refetch: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const { data, isPending, error, refetch } = authClient.useSession();
  const login = () => {
    authClient.signIn.social({
      provider: "google",
      // callbackURL: window.location.origin
    })
  }

  const logout = () => {
    authClient.signOut();
  }

  const value = {
    data,
    isPending,
    error,
    refetch,
    isAuthenticated: !!data,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
