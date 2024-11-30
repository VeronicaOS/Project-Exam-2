import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "../profileMenu/profileMenu";
import styles from "./header.module.css";
import logoImage from "../../assets/images/logo/holidazeLogo.png";
import sharedStyles from "../../pages/styles.module.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className={sharedStyles.wrapper}>
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
                    <Link to="/venues" className={styles.link}>
                        Venues
                    </Link>
                    <Link to="/manage-venues" className={styles.link}>
                        Manage Venues
                    </Link>
                </nav>
                <div className={styles.headerRight}>
                    {/* Add DropdownMenu here */}
                    <ProfileMenu />

                    {/* Hamburger Icon */}
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
        </div>
    );
};

export default Header;
