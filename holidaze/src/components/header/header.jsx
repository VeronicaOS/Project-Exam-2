import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import logoImage from "../../assets/images/logo/holidaze-logo.png";

const Header = () => {
    const [isNavActive, setIsNavActive] = useState(false);

    const toggleNav = () => {
        setIsNavActive(!isNavActive);
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
                className={`${styles.nav} ${isNavActive ? styles.active : ""}`}
                id="nav"
            >
                <Link className={styles.link}>Home</Link>
                <Link to="/" className={styles.link}>
                    Venues
                </Link>
                <Link to="/contact" className={styles.link}>
                    Manage Venues
                </Link>
            </nav>
            <div>
                <button className={styles.logbutton}>Log in</button>
            </div>
            <div
                className={styles.hamburger}
                id="hamburger"
                onClick={toggleNav}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    );
};

export default Header;
