import React, { useEffect, useState } from "react";
import { useProfile } from "../../../context/profileContext"; // Access the profile context
import { fetchVenuesByProfile } from "../../../utils/fetchVenuesBookings"; // Fetch venues API function
import styles from "../profilePage.module.css";

const VenuesSection = () => {
    const { profile } = useProfile(); // Get profile from the context
    const [venues, setVenues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVenues = async () => {
            if (!profile?.name) {
                console.error("Profile not found or invalid:", profile); // Debug Profile
                setError("Profile not found");
                setIsLoading(false);
                return;
            }

            try {
                // Debug Step 1: Log the profile name before fetching
                console.log("Fetching venues for profile:", profile.name);

                // Fetch venues from the API
                const fetchedVenues = await fetchVenuesByProfile(profile.name);

                // Debug Step 2: Log the fetched venues from API
                console.log("Fetched venues from API:", fetchedVenues);

                // Update the state with the fetched venues
                setVenues(fetchedVenues);

                // Debug Step 3: Log the venues after state update
                console.log("Updated venues state:", fetchedVenues);
            } catch (err) {
                console.error("Error fetching venues:", err);

                // Set error state
                setError(
                    err.message || "An error occurred while fetching venues."
                );
            } finally {
                // Debug Step 4: Confirm loading is finished
                setIsLoading(false);
                console.log("Loading finished, isLoading:", false);
            }
        };

        fetchVenues();
    }, [profile]); // Re-run when profile changes

    // Debug Step 5: Log the venues state before rendering
    console.log("Venues state before rendering:", venues);

    // Conditional Rendering
    if (isLoading) {
        console.log("Currently loading venues...");
        return <p>Loading venues...</p>;
    }
    if (error) {
        console.error("Rendering error message:", error);
        return <p className="error">{error}</p>;
    }
    if (venues.length === 0) {
        console.log("No venues available for this profile.");
        return <p>No venues available.</p>;
    }

    // Render Venues
    return (
        <div className={styles.venuesSection}>
            <h2 className={styles.venuesTitle}>Your Venues</h2>
            <div className={styles.venuesGrid}>
                {venues.map((venue) => (
                    <div key={venue.id} className={styles.venueCard}>
                        <img
                            src={venue.media?.[0]?.url || "default-venue.jpg"}
                            alt={venue.name}
                            className={styles.venueImage}
                        />
                        <div className={styles.venueDetails}>
                            <h3 className={styles.venueName}>{venue.name}</h3>
                            <p className={styles.venueDescription}>
                                {venue.description ||
                                    "No description available."}
                            </p>
                            <div className={styles.venueActions}>
                                <button className={styles.actionButton}>
                                    Update venue
                                </button>
                                <button className={styles.actionButton}>
                                    View bookings
                                </button>
                                <button className={styles.actionButton}>
                                    Delete venue
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VenuesSection;
