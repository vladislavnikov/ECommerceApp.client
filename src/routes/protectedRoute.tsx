import { useState, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import SignInModal from "src/components/header/modals/signInModal";
import SignUpModal from "src/components/header/modals/signUpModal";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [isSignInOpen, setSignInOpen] = useState(() => !currentUser);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  if (!currentUser) {
    return (
      <>
        <SignInModal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} />

        <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} />
      </>
    );
  }

  return children;
}

export default ProtectedRoute;
