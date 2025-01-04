import { useState } from "react";
import * as styles from "src/components/pages/profile.m.scss";
import InputText from "src/elements/inputText";
import idCardIcon from "src/assets/icons/idCard.png";
import noPhoto from "src/assets/noPhoto.jpg";

function Profile() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ username: "", description: "" });

  const validateUsername = (value: string) => (value.length < 3 ? "Username must be at least 3 characters long" : null);

  const validateDescription = (value: string) => (value.length > 100 ? "Description cannot exceed 100 characters" : null);

  const handleSave = () => {
    const usernameError = validateUsername(username);
    const descriptionError = validateDescription(description);

    if (usernameError || descriptionError) {
      setErrors({
        username: usernameError || "",
        description: descriptionError || "",
      });
      console.log("Validation errors:", { usernameError, descriptionError });
    } else {
      setErrors({ username: "", description: "" });
      console.log("Saved successfully:", { username, description });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>User Name Profile Page</h2>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.profileImageSection}>
            <img src={noPhoto} alt="Profile" />
            <button type="submit" className={styles.imgBtn}>
              Change profile image
            </button>
          </div>
          <div className={styles.inputGroup}>
            <InputText
              type="text"
              label="Username"
              value={username}
              onChange={setUsername}
              validate={validateUsername}
              errorMessage={errors.username}
              placeholder="Enter your username"
              icon={idCardIcon}
            />
            <div>
              <p>Profile Description</p>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setErrors({ ...errors, description: validateDescription(description) || "" })}
                placeholder="Enter your profile description"
                className={styles.squareInput}
              />
              {errors.description && <span className={styles.error}>{errors.description}</span>}
            </div>
          </div>
          <div className={styles.buttonSection}>
            <button type="submit" className={styles.saveButton} onClick={handleSave}>
              Save Profile
            </button>
            <button type="submit" className={styles.changePasswordButton}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
