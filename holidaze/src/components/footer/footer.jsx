import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.section}>
                <p>Holidaze</p>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <a href="#">Venues</a>
            </div>
            <div className={styles.section}>
                <p>Follow us</p>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
                <a href="#">Pinterest</a>
            </div>
            <div className={styles.section}>
                <p>More</p>
                <a href="#">Help</a>
                <a href="#">Terms of use</a>
                <a href="#">User support</a>
                <a href="#">Cookies</a>
            </div>
        </footer>
    );
};

export default Footer;
