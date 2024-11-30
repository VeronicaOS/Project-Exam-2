import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profileMenu.module.css";

const ProfileMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div
            className={styles.dropdownContainer}
            onBlur={closeDropdown}
            tabIndex={0} // Allows focus for onBlur to work
        >
            {/* User Icon */}
            <i
                className={`${styles.userIcon} fa fa-user-circle`}
                onClick={toggleDropdown}
            ></i>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <ul className={styles.dropdown}>
                    <li>
                        <Link to="/profile">My Profile</Link>
                    </li>
                    <li>
                        <Link to="/bookings">My Bookings</Link>
                    </li>
                    <li>
                        <button
                            className={styles.logoutButton}
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = "/login";
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfileMenu;
