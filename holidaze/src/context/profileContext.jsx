import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(() => {
        const storedProfile = localStorage.getItem("profile");
        return storedProfile ? JSON.parse(storedProfile) : null;
    });

    const fetchProfile = async (username, token) => {
        try {
            console.log("Fetching profile for:", username);
            const response = await fetch(
                `https://v2.api.noroff.dev/holidaze/profiles/${username}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-Noroff-API-Key": "your-api-key",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch profile data.");
            }

            const result = await response.json();
            console.log("Profile fetched successfully:", result.data);
            setProfile(result.data);
            localStorage.setItem("profile", JSON.stringify(result.data));
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
