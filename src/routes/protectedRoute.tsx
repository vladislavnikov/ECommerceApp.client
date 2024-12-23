import { useState, ReactNode } from "react";
import Modal from "src/elements/modal";
import SignIn from "src/components/header/modals/signIn";
import SignUp from "src/components/header/modals/signUp";
import useUser from "src/shared/hooks/useUser";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, onAuthUser } = useUser();
  const [isSignInOpen, setSignInOpen] = useState(() => !currentUser);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const handleSignIn = (username: string) => {
    setTimeout(() => {
      onAuthUser(username);
      setSignInOpen(false);
    }, 1000);
  };

  const handleSignUp = (username: string) => {
    setTimeout(() => {
      onAuthUser(username);
      setSignUpOpen(false);
    }, 1000);
  };

  if (!currentUser) {
    return (
      <>
        {isSignInOpen && (
          <Modal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} title="Sign In">
            <SignIn onSubmit={handleSignIn} />
          </Modal>
        )}
        {isSignUpOpen && (
          <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} title="Sign Up">
            <SignUp onSubmit={handleSignUp} />
          </Modal>
        )}
      </>
    );
  }

  return children;
}

export default ProtectedRoute;
