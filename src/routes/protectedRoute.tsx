import { useState, ReactNode } from "react";
import useUser from "src/shared/hooks/useUser";
import SignInModal from "src/components/header/modals/signInModal";
import SignUpModal from "src/components/header/modals/signUpModal";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useUser();
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
