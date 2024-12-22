import { createContext, useState, useContext, ReactNode, useMemo } from "react";

interface UserContextType {
  currentUser: string | null;
  onAuthUser: (user: string | null) => void;
  handleSignIn: (username: string, password: string) => void; // Added here
  handleSignUp: (username: string, password: string) => void; // Added here
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const onAuthUser = (user: string | null) => {
    setCurrentUser(user);
  };

  const handleSignIn = (username: string) => {
    console.log("Signing in user:", username); // Add API logic here
    setTimeout(() => {
      onAuthUser(username); // Simulate setting the user
    }, 1000);
  };

  const handleSignUp = (username: string) => {
    console.log("Signing up user:", username); // Add API logic here
    setTimeout(() => {
      onAuthUser(username); // Simulate setting the user
    }, 1000);
  };

  const value = useMemo(
    () => ({
      currentUser,
      onAuthUser,
      handleSignIn,
      handleSignUp,
    }),
    [currentUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
