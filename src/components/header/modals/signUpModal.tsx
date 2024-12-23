import Modal from "src/elements/modal";
import SignUp from "src/components/header/modals/signUp";
import useUser from "src/shared/hooks/useUser";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const { handleSignIn } = useUser();

  const handleSubmit = (username: string, password: string) => {
    handleSignIn(username, password);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign Up">
      <SignUp onSubmit={handleSubmit} />
    </Modal>
  );
}

export default SignUpModal;
