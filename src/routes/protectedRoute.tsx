import { useState, useEffect, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Modal from "src/components/header/modals/modal";
import SignIn from "src/components/header/modals/signIn";
import { useUser } from "src/elements/userContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { currentUser, onAuthUser } = useUser();

  console.log("test");

  useEffect(() => {
    if (currentUser === null) {
      setSignInOpen(true);
    }
  }, [currentUser]);

  const handleSignIn = (username: string, password: string) => {
    console.log("Signing in:", { username, password });

    setTimeout(() => {
      onAuthUser(username);
      setSignInOpen(false);
    }, 1000);
  };

  const handleCloseModal = () => {
    setSignInOpen(false);
    setRedirectToHome(true);
  };

  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }

  if (currentUser === null) {
    return (
      isSignInOpen && (
        <Modal isOpen={isSignInOpen} onClose={handleCloseModal}>
          <SignIn onSubmit={handleSignIn} />
        </Modal>
      )
    );
  }

  return children;
}

export default ProtectedRoute;
