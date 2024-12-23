import Modal from "src/elements/modal";
import SignIn from "src/components/header/modals/signIn";
import useUser from "src/shared/hooks/useUser";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { handleSignIn } = useUser();

  const handleSubmit = (username: string, password: string) => {
    handleSignIn(username, password);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign In">
      <SignIn onSubmit={handleSubmit} />
    </Modal>
  );
}

export default SignInModal;
