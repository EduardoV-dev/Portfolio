import logo from "@/assets/logo.png";
import styles from "./index.module.css";

export default function HeaderLogo() {
    return (
        <a href="/" className={styles.logo} aria-label="Eduardo Varela - Home">
            <img
                src={logo.src}
                alt="Eduardo Varela logo"
                width={40}
                height={40}
                className={styles["logo__img"]}
            />
            <div className={styles["logo__text"]}>
                <span className={styles["logo__name"]}>Eduardo Varela</span>
                <span className={styles["logo__title"]}>Full Stack Engineer</span>
            </div>
        </a>
    );
}
