import { useState, FormEvent } from "react"; // Added FormEvent import and useRef
import { useDispatch, useSelector } from "react-redux";
import * as styles from "src/components/pages/profile/profile.m.scss";
import ChangePassModal from "src/components/pages/profile/modals/changePassModal";
import { validateUsername, validateDescription, validateAddress, validatePhoneNumber } from "@/validators/profileValidations";
import { saveUserChanges } from "src/api/services/userService";
import { UserAction } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store/store";
import ProfileForm from "./profileForm";

function Profile() {
  const [username, setUsername] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [defaultAddressDelivery, setDefaultAddressDelivery] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errors, setErrors] = useState<{
    username: string;
    description: string;
    defaultAddressDelivery: string;
    phoneNumber: string;
  }>({
    username: "",
    description: "",
    defaultAddressDelivery: "",
    phoneNumber: "",
  });
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Saved");

    const usernameError = validateUsername(username);
    const descriptionError = validateDescription(description);
    const addressError = validateAddress(defaultAddressDelivery);
    const phoneError = validatePhoneNumber(phoneNumber);

    if (usernameError || descriptionError || addressError || phoneError) {
      setErrors({
        username: usernameError || "",
        description: descriptionError || "",
        defaultAddressDelivery: addressError || "",
        phoneNumber: phoneError || "",
      });
      return;
    }

    setErrors({
      username: "",
      description: "",
      defaultAddressDelivery: "",
      phoneNumber: "",
    });

    try {
      setLoading(true);
      setSuccessMessage(null);

      const response = await saveUserChanges({
        firstName: username, // Changed to match API
        lastName: "OptionalLastName",
        email: "OptionalEmail",
        phoneNumber,
        address: defaultAddressDelivery,
      });

      setSuccessMessage(response.message);

      dispatch(UserAction.updateUsername(username));

      setUsername("");
      setDescription("");
      setDefaultAddressDelivery("");
      setPhoneNumber("");
    } catch {
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>User Profile Page</h2>

      {currentUser && <h3>Welcome, {currentUser}</h3>}

      <ProfileForm
        username={username}
        description={description}
        defaultAddressDelivery={defaultAddressDelivery}
        phoneNumber={phoneNumber}
        errors={errors}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onAddressChange={(e) => setDefaultAddressDelivery(e.target.value)}
        onPhoneChange={(e) => setPhoneNumber(e.target.value)}
        onSave={handleSave}
        onChangePassword={() => setIsChangePassModalOpen(true)}
      />

      {loading && <p>Saving profile...</p>}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

      {isChangePassModalOpen && <ChangePassModal isOpen={isChangePassModalOpen} onClose={() => setIsChangePassModalOpen(false)} />}
    </div>
  );
}

export default Profile;
