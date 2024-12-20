import { useState, useEffect, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Modal from "src/components/header/modals/modal";
import SignIn from "src/components/header/modals/signIn";

function ProtectedRoute({
  user,
  onAuthUser,
  children,
}: {
  user: string | null;
  onAuthUser: (user: string | null) => void;
  children: ReactNode;
}) {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  console.log("test");

  useEffect(() => {
    if (user === null) {
      setSignInOpen(true);
    }
  }, [user]);

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

  if (user === null) {
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
