import Modal from "src/elements/modal";
import SignIn from "src/components/header/modals/signIn";
import { useDispatch } from "react-redux";
import { handleSignIn } from "@/redux/slices/userSlice";
import { useState } from "react";
import { AppDispatch } from "src/redux/store/store";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (username: string, password: string) => {
    try {
      await dispatch(handleSignIn({ username, password })).unwrap();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
        console.log(err.message);
      } else {
        setError("An unexpected error occurred.");
        console.log(err);
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
