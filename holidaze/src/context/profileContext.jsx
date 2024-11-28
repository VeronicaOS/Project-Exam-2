import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    // Fetch profile data from the API
    const fetchProfile = async (username, token) => {
        try {
            const response = await fetch(
                `https://v2.api.noroff.dev/holidaze/profiles/${username}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch profile data.");
            }

            const result = await response.json();
            setProfile(result.data); // Store the `data` field in state
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, fetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
