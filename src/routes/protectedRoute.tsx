import { useState } from "react";
import { Navigate } from "react-router-dom";
import Modal from "src/components/header/modals/modal";
import SignIn from "src/components/header/modals/signIn";

function ProtectedRoute({
  isAuthenticated,
  onAuthUser,
  children,
}: {
  isAuthenticated: boolean;
  onAuthUser: (user: string | null) => void;
  children: JSX.Element;
}) {
  const [isSignInOpen, setSignInOpen] = useState(!isAuthenticated);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSignIn = (username: string, password: string) => {
    console.log("Signing in:", { username, password });

    setTimeout(() => {
      if (username === "validUser" && password === "password") {
        onAuthUser(username);
        setSignInOpen(false);
      } else {
        window.alert("Invalid credentials. Please try again.");
      }
    }, 1000);
  };

  const handleCloseModal = () => {
    setSignInOpen(false);
    setRedirectToHome(true);
  };

  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
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
