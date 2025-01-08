import * as styles from "src/components/pages/profile/profile.m.scss";
import ProfileForm from "./profileForm";

function Profile() {
  return (
    <div className={styles.wrapper}>
      <h2>User Profile Page</h2>
      <ProfileForm />
    </div>
  );
}

export default Profile;
