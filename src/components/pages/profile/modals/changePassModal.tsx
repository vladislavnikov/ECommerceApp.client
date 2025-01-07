import { useState } from "react";
import Modal from "src/elements/modal";
import ChangePass from "src/components/pages/profile/modals/changePass";
import { useDispatch } from "react-redux";
import { handleChangePassword } from "@/redux/slices/userSlice";
import { AppDispatch } from "src/redux/store/store";

interface ChangePassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChangePassModal({ isOpen, onClose }: ChangePassModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (oldPassword: string, newPassword: string) => {
    try {
      await dispatch(handleChangePassword({ oldPassword, newPassword })).unwrap();
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
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <ChangePass onSubmit={handleSubmit} error={error} />
    </Modal>
  );
}

export default ChangePassModal;
