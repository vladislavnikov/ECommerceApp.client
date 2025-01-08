import { useState } from "react";
import * as styles from "src/components/pages/profile/profile.m.scss";
import { saveUserChanges } from "src/api/services/userService";
import { useDispatch } from "react-redux";
import { UserAction } from "@/redux/slices/userSlice";
import ChangePassModal from "src/components/pages/profile/modals/changePassModal";
import { validateUsername, validateDescription, validateAddress, validatePhoneNumber } from "@/validators/profileValidations";
import idCardIcon from "src/assets/icons/idCard.png";
import noPhoto from "src/assets/noPhoto.jpg";
import { WUPTextControl, WUPTextareaControl } from "web-ui-pack";

WUPTextControl.$use();
WUPTextareaControl.$use();

interface Errors {
  username: string;
  description: string;
  defaultAddressDelivery: string;
  phoneNumber: string;
}

function ProfileModal() {
  const [errors, setErrors] = useState<Errors>({
    username: "",
    description: "",
    defaultAddressDelivery: "",
    phoneNumber: "",
  });

  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSave = async (e: CustomEvent) => {
    e.preventDefault();

    const { username, description, defaultAddressDelivery, phoneNumber } = e.detail.model;

    const usernameError = validateUsername(username || "");
    const descriptionError = validateDescription(description || "");
    const addressError = validateAddress(defaultAddressDelivery || "");
    const phoneError = validatePhoneNumber(phoneNumber || "");

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
        firstName: username,
        lastName: "OptionalLastName",
        email: "OptionalEmail",
        phoneNumber,
        address: defaultAddressDelivery,
      });

      setSuccessMessage(response.message);
      dispatch(UserAction.updateUsername(username));
    } catch {
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
      localStorage.setItem("currentUser", username);
    }
  };

  return (
    <wup-form
      class={styles.profileForm}
      ref={(instance): void => {
        if (instance) {
          // eslint-disable-next-line no-param-reassign
          instance.$onSubmit = (e: CustomEvent) => {
            console.log("onSubmit", e.detail.model);
            handleSave(e);
          };
        }
      }}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.profileImageSection}>
            <img src={noPhoto} alt="Profile" />
            <button type="button" className={styles.imgBtn}>
              Change profile image
            </button>
          </div>

          <div className={styles.inputGroup}>
            <p>Username</p>
            <wup-text
              w-type="text"
              w-name="username"
              w-placeholder="Enter your username"
              w-errorText={errors.username}
              w-icon={idCardIcon}
              class={styles.inputControl}
            />
            <p>Description</p>
            <wup-textarea
              w-name="description"
              w-placeholder="Enter your profile description"
              w-errorText={errors.description}
              class={styles.textareaControl}
            />
            <p>Default Address Delivery</p>
            <wup-text
              w-type="text"
              w-name="defaultAddressDelivery"
              w-placeholder="Enter your delivery address"
              w-errorText={errors.defaultAddressDelivery}
              class={styles.inputControl}
            />
            <p>Phone Number</p>
            <wup-text
              w-type="text"
              w-name="phoneNumber"
              w-placeholder="Enter your phone number"
              w-errorText={errors.phoneNumber}
              class={styles.inputControl}
            />
          </div>

          <div className={styles.buttonSection}>
            <button type="submit" className={styles.saveButton}>
              Save Profile
            </button>
            <button type="button" className={styles.changePasswordButton} onClick={() => setIsChangePassModalOpen(true)}>
              Change Password
            </button>
          </div>
        </div>
      </div>

      {loading && <p>Saving profile...</p>}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

      {isChangePassModalOpen && <ChangePassModal isOpen={isChangePassModalOpen} onClose={() => setIsChangePassModalOpen(false)} />}
    </wup-form>
  );
}

export default ProfileModal;
