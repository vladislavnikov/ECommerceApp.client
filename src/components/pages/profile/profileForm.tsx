import { useState, useRef, useEffect } from "react";
import * as styles from "src/components/pages/profile/profile.m.scss";
import { saveUserChanges, getUserProfile, uploadProfileImage } from "src/api/services/userService";
import ChangePassModal from "src/components/pages/profile/modals/changePassModal";
import { validateUsername, validateDescription, validateAddress, validatePhoneNumber } from "@/validators/profileValidations";
import idCardIcon from "src/assets/icons/idCard.png";
import noPhoto from "src/assets/noPhoto.jpg";
import { useDispatch } from "react-redux";
import { WUPTextControl, WUPTextareaControl } from "web-ui-pack";
import { UserProfile } from "@/shared/models/userProfile";
import { UserAction } from "@/redux/slices/userSlice";

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
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const [userData, setUserData] = useState<UserProfile>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    phoneNumber: "",
    address: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserData({
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          description: response.description,
          phoneNumber: response.phoneNumber,
          address: response.address,
          profileImage: response.profileImage || noPhoto,
        });
        setProfileImage(response.profileImage || noPhoto);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async (e: CustomEvent) => {
    e.preventDefault();

    const { username, description, defaultAddressDelivery, phoneNumber } = e.detail.model;

    const usernameError = !username ? "Username is required." : validateUsername(username || "");
    const descriptionError = !description ? "Description is required." : validateDescription(description || "");
    const addressError = !defaultAddressDelivery ? "Address is required." : validateAddress(defaultAddressDelivery || "");
    const phoneError = !phoneNumber ? "Phone number is required." : validatePhoneNumber(phoneNumber || "");

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

      const updatedUser: UserProfile = {
        id: userData.id,
        firstName: username,
        lastName: userData.lastName,
        email: userData.email,
        description,
        phoneNumber,
        address: defaultAddressDelivery,
        profileImage: "",
      };

      await saveUserChanges(updatedUser);
      dispatch(UserAction.updateUserProfile(updatedUser));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setSuccessMessage("Profile updated successfully!");
    } catch {
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      uploadProfileImage(formData);
    }
  };

  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
            <img src={profileImage || noPhoto} alt="Profile" className={styles.profileImage} />
            <button type="button" className={styles.imgBtn} onClick={handleImageButtonClick}>
              Change profile image
            </button>

            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleProfileImageChange} style={{ display: "none" }} />
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
              w-value={userData.firstName}
              w-required
            />
            {errors.username && <span className={styles.errorText}>{errors.username}</span>}

            <p>Description</p>
            <wup-textarea
              w-name="description"
              w-placeholder="Enter your profile description"
              w-errorText={errors.description}
              class={styles.textareaControl}
              w-value={userData.description}
              w-required
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}

            <p>Default Address Delivery</p>
            <wup-text
              w-type="text"
              w-name="defaultAddressDelivery"
              w-placeholder="Enter your delivery address"
              w-errorText={errors.defaultAddressDelivery}
              class={styles.inputControl}
              w-value={userData.address}
              w-required
            />
            {errors.defaultAddressDelivery && <span className={styles.errorText}>{errors.defaultAddressDelivery}</span>}

            <p>Phone Number</p>
            <wup-text
              w-type="text"
              w-name="phoneNumber"
              w-placeholder="Enter your phone number"
              w-errorText={errors.phoneNumber}
              class={styles.inputControl}
              w-value={userData.phoneNumber}
              w-required
            />
            {errors.phoneNumber && <span className={styles.errorText}>{errors.phoneNumber}</span>}
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
