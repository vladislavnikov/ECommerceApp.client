import { useState } from "react";
import Modal from "src/elements/modal";
import ChangePass from "@/components/pages/profile/modals/changePassword";
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

  const handleSubmit = async (newPassword: string, repeatNewPassword: string) => {
    try {
      await dispatch(handleChangePassword({ newPassword, repeatNewPassword })).unwrap();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
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
