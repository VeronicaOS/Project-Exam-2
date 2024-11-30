import React, { useState } from "react";
import { useProfile } from "../../context/profileContext"; // Import ProfileContext
import styles from "./profileMenu.module.css";
import { handleLogout } from "../../utils/logout";

const ProfileMenu = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { profile, setProfile } = useProfile(); // Access profile data directly from context

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const renderMenuOptions = () => {
        if (!profile) {
            // User not logged in
            return (
                <>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                </>
            );
        }

        // User is logged in
        return profile.venueManager ? (
            // Venue Manager options
            <>
                <li>
                    <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                    <a href="/manage-venues">Manage Venues</a>
                </li>
                <li>
                    <a href="/profile">My Profile</a>
                </li>
                <li>
                    <button onClick={() => handleLogout(setProfile)}>
                        Logout
                    </button>
                </li>
            </>
        ) : (
            // Regular User options
            <>
                <li>
                    <a href="/bookings">My Bookings</a>
                </li>
                <li>
                    <a href="/profile">My Profile</a>
                </li>
                <li>
                    <button onClick={() => handleLogout(setProfile)}>
                        Logout
                    </button>
                </li>
            </>
        );
    };

    return (
        <div className={styles.profileMenuContainer}>
            {/* User icon toggles dropdown */}
            <i
                className={`${styles.userIcon} fa fa-user-circle`}
                onClick={toggleDropdown}
            ></i>

            {/* Render dropdown only if isOpen is true */}
            {isOpen && (
                <ul className={styles.dropdown}>{renderMenuOptions()}</ul>
            )}
        </div>
    );
};

export default ProfileMenu;
