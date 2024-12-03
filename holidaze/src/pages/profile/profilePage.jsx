import React, { useEffect } from "react";
import { useProfile } from "../../context/profileContext";
import styles from "./profilePage.module.css"; // Create a CSS module for styles
import sharedStyles from "../styles.module.css";
import VenuesSection from "./profileVenues/profileVenues";
import BookingsSection from "./profileBookings/profileBookings";

const ProfilePage = () => {
    const { profile, fetchProfile } = useProfile();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username"); // Assuming you store the username in localStorage

    useEffect(() => {
        const fetchData = async () => {
            if (!profile) {
                console.log("Fetching profile for username:", username);
                console.log("Using token:", token);

                await fetchProfile(username, token);
            }
        };

        fetchData();
    }, [profile, fetchProfile, username, token]);

    return (
        <div className={sharedStyles.wrapper}>
            <div className={`${styles.container} ${sharedStyles.mainPadding}`}>
                {/* Profile Information */}
                <div className={styles.profileCard}>
                    <h2 className={styles.profileName}>
                        {profile?.name || "Name"}
                    </h2>
                    <img
                        src={profile?.avatar || "default-avatar.jpg"}
                        alt={`${profile?.name}'s avatar`}
                        className={styles.profileAvatar}
                    />
                    <p className={styles.bio}>
                        {profile?.bio ||
                            "Bio text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                    </p>
                    <p className={styles.email}>
                        Email: {profile?.email || "example@example.com"}
                    </p>
                </div>
                <div className={styles.venuesBookingsList}>
                    {/* Conditionally Render Venues or Bookings */}
                    {profile?.venueManager ? (
                        <VenuesSection
                            managerUsername={profile.name}
                            token={token}
                        />
                    ) : (
                        <BookingsSection
                            username={profile.name}
                            token={token}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
