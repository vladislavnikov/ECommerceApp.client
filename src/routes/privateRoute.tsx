import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Modal from "src/components/header/modals/modal";
import SignIn from "src/components/header/modals/signIn";

function PrivateRoute({ isAuthenticated, onAuthUser }: { isAuthenticated: boolean; onAuthUser: (user: string | null) => void }) {
  const location = useLocation();
  const [isSignInOpen, setSignInOpen] = useState(false);

  const handleSignIn = (username: string, password: string) => {
    console.log("Signing in:", { username, password });
    setTimeout(() => {
      onAuthUser(username);
      setSignInOpen(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    if (!isSignInOpen) setSignInOpen(true);
    return (
      <>
        {isSignInOpen && (
          <Modal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)}>
            <SignIn onSubmit={handleSignIn} />
          </Modal>
        )}
        <Navigate to="/" state={{ from: location }} replace />
      </>
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
