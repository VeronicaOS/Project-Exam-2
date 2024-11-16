import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import logoImage from "../../assets/images/logo/holidaze-logo.png";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle menu open/close
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img
                    src={logoImage}
                    alt="Holidaze logo"
                    className={styles.logoImage}
                />
            </div>
            <nav
                className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}
                id="nav"
            >
                <Link to="/" className={styles.link}>
                    Home
                </Link>
                <Link to="/Venues" className={styles.link}>
                    Venues
                </Link>
                <Link to="/Manage Venues" className={styles.link}>
                    Manage Venues
                </Link>
            </nav>
            <div className={styles.headerRight}>
                <i class="fa fa-user-circle fa-lg" aria-hidden="true"></i>
                <div
                    className={styles.hamburger}
                    id="hamburger"
                    onClick={toggleMenu}
                >
                    <span
                        className={`${styles.bar} ${
                            isMenuOpen ? styles.bar1 : ""
                        }`}
                    ></span>
                    <span
                        className={`${styles.bar} ${
                            isMenuOpen ? styles.bar2 : ""
                        }`}
                    ></span>
                    <span
                        className={`${styles.bar} ${
                            isMenuOpen ? styles.bar3 : ""
                        }`}
                    ></span>
                </div>
            </div>
        </header>
    );
};

export default Header;
