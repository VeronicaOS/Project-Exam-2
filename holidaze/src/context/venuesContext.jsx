import React, { createContext, useContext, useEffect, useState } from "react";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch venue data from the API
    const fetchVenues = async () => {
        try {
            const response = await fetch(
                "https://v2.api.noroff.dev/holidaze/venues"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch venues");
            }
            const data = await response.json();
            setVenues(data); // Assuming the response is an array of venues
        } catch (err) {
            console.error("Error fetching venues:", err);
            setError("Failed to load venues. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    return (
        <VenuesContext.Provider value={{ venues, loading, error, fetchVenues }}>
            {children}
        </VenuesContext.Provider>
    );
};

export const useVenues = () => useContext(VenuesContext);
