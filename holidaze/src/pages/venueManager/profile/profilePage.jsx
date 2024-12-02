import React, { useEffect, useState } from "react";
import { useProfile } from "../../../context/profileContext"; // Adjust the path if needed
import styles from "./profilePage.module.css"; // Create a CSS module for styles

const ProfilePage = () => {
    const { profile, fetchProfile } = useProfile();
    const [venues, setVenues] = useState([]);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username"); // Assuming you store the username in localStorage
    console.log(useProfile());

    useEffect(() => {
        const fetchData = async () => {
            if (!profile) {
                console.log("Fetching profile for username:", username); // Log username
                console.log("Using token:", token); // Log token (ensure it's valid)

                await fetchProfile(username, token); // Fetch profile with venues

                console.log("Fetched profile:", profile); // Log the profile object after fetching
            }

            if (profile?.venues) {
                console.log("Extracted venues from profile:", profile.venues); // Log venues array
                setVenues(profile.venues); // Set venues in state
            } else {
                console.log("No venues found in profile.");
            }
        };

        fetchData();
    }, [profile, fetchProfile, username, token]);

    return (
        <div className={styles.container}>
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

            {/* Venues */}
            <div className={styles.venuesList}>
                <h2 className={styles.venuesTitle}>Your Venues</h2>
                {venues.length > 0 ? (
                    venues.map((venue, index) => (
                        <div key={index} className={styles.venueItem}>
                            <img
                                src={
                                    venue.media?.[0]?.url || "default-venue.jpg"
                                }
                                alt={venue.name}
                                className={styles.venueImage}
                            />
                            <p className={styles.venueName}>{venue.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No venues available.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
