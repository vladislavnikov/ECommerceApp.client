import { ChangeEvent, FormEvent } from "react";
import * as styles from "src/components/pages/profile/profile.m.scss";
import idCardIcon from "src/assets/icons/idCard.png";
import noPhoto from "src/assets/noPhoto.jpg";
import { WUPTextControl, WUPTextareaControl } from "web-ui-pack";

WUPTextControl.$use();
WUPTextareaControl.$use();

type ProfileFormProps = {
  username: string;
  description: string;
  defaultAddressDelivery: string;
  phoneNumber: string;
  errors: {
    username: string;
    description: string;
    defaultAddressDelivery: string;
    phoneNumber: string;
  };
  onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onAddressChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: (e: FormEvent) => void;
  onChangePassword: () => void;
};

function ProfileForm({
  username,
  description,
  defaultAddressDelivery,
  phoneNumber,
  errors,
  onUsernameChange,
  onDescriptionChange,
  onAddressChange,
  onPhoneChange,
  onSave,
  onChangePassword,
}: ProfileFormProps) {
  return (
    <wup-form class={styles.profileForm} w-onSubmit={onSave}>
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
              w-value={username}
              w-placeholder="Enter your username"
              w-oninput={onUsernameChange}
              w-errorText={errors.username}
              w-icon={idCardIcon}
              class={styles.inputControl}
            />
            <p>Description</p>
            <wup-textarea
              w-value={description}
              w-placeholder="Enter your profile description"
              w-oninput={onDescriptionChange}
              w-errorText={errors.description}
              class={styles.textareaControl}
            />
            <p>Default Address Delivery</p>
            <wup-text
              w-type="text"
              w-value={defaultAddressDelivery}
              w-placeholder="Enter your delivery address"
              w-oninput={onAddressChange}
              w-errorText={errors.defaultAddressDelivery}
              class={styles.inputControl}
            />
            <p>Phone Number</p>
            <wup-text
              w-type="text"
              w-value={phoneNumber}
              w-placeholder="Enter your phone number"
              w-oninput={onPhoneChange}
              w-errorText={errors.phoneNumber}
              class={styles.inputControl}
            />
          </div>

          <div className={styles.buttonSection}>
            <button type="submit" className={styles.saveButton}>
              Save Profile
            </button>
            <button type="button" className={styles.changePasswordButton} onClick={onChangePassword}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </wup-form>
  );
}

export default ProfileForm;
