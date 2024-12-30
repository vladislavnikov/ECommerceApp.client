import { createContext, useState, useEffect, ReactNode, useMemo } from "react";
import { fetchSignIn, searchGames } from "src/api/services/userService";

export interface UserContextType {
  currentUser: string | null;
  onAuthUser: (user: string | null) => void;
  handleSignIn: (username: string, password: string) => void;
  handleSignUp: (username: string, password: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem("currentUser");
  });

  const onAuthUser = (user: string | null) => {
    setCurrentUser(user);
  };

  const handleSignIn = async (username: string, password: string) => {
    try {
      const response = await fetchSignIn(username, password);
      onAuthUser(username);
      console.log("SignIn successful:", response);
      return response;
    } catch (error) {
      console.error("SignIn failed:", error);
      throw new Error("Failed to sign in. Please check your credentials.");
    }
  };

  const handleSignUp = async (username: string, password: string) => {
    try {
      await searchGames(username, password);
      onAuthUser(username);
    } catch (error) {
      console.error("SignUp failed:", error);
      throw new Error("Failed to sign up. Please try again.");
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

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
