import { useState } from "react";
import Modal from "src/elements/modal";
import SignIn from "src/components/header/modals/signIn";
import useUser from "src/shared/hooks/useUser";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { handleSignIn } = useUser();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (username: string, password: string) => {
    try {
      await handleSignIn(username, password);
      onClose(); // Close modal on success
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign In">
      <SignIn onSubmit={handleSubmit} error={error} />
    </Modal>
  );
}

export default SignInModal;
