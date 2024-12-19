import { createContext, useState, useContext, ReactNode, useMemo } from "react";

interface UserContextType {
  currentUser: string | null;
  onAuthUser: (user: string | null) => void;
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

  const value = useMemo(() => ({ currentUser, onAuthUser }), [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
