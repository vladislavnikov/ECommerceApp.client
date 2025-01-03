import Modal from "src/elements/modal";
import SignUp from "src/components/header/modals/signUp";
import { useDispatch } from "react-redux";
import { handleSignUp } from "@/redux/slices/userSlice";
import { useState } from "react";
import { AppDispatch } from "src/redux/store/store";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (username: string, password: string) => {
    try {
      await dispatch(handleSignUp({ username, password })).unwrap();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
        console.log(error);
      } else {
        setError("An unexpected error occurred.");
        console.log(error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign Up">
      <SignUp onSubmit={handleSubmit} />
    </Modal>
  );
}

export default SignUpModal;
