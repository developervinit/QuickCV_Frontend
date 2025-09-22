import styles from "./UserInfo.module.css";
import { useSelector } from "react-redux";

const UserInfo = ({
  name = false,
  image = false,
  email = false,
  imageSize,
  nameSize,
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={styles.container}>
      {image && (
        <img
          src={user.profilePicture}
          alt={user.name}
          className={styles.avatar}
          style={{
            "--avatar-size":
              imageSize === "large"
                ? "64px"
                : imageSize === "mid"
                ? "40px"
                : "24px",
            "--avatar-radius":
              imageSize === "large"
                ? "16px"
                : imageSize === "mid"
                ? "12px"
                : "50%",
          }}
        />
      )}
      {name && (
        <p
          className={styles["user-name"]}
          style={{
            "--avatar-name":
              nameSize === "large"
                ? "1.125rem"
                : nameSize === "mid"
                ? "1rem"
                : "0.5rem",
            "--avatar-name-weight":
              nameSize === "large" ? 600 : nameSize === "mid" ? 400 : 200,
          }}
        >
          {user.name}
        </p>
      )}
      {email && <p className={styles.name}>{user.email}</p>}
    </div>
  );
};

export default UserInfo;
