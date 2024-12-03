import React, { useEffect, useState } from "react";
import { useProfile } from "../../../context/profileContext"; // Access the profile context
import { fetchProfileData } from "../../../utils/fetchProfileVenues"; // Fetch venues API function
import { fetchVenueById } from "../../../utils/fetchVenueDetails"; // Fetch venue details (for bookings)
import ViewBookingsModal from "../../venueManager/viewBookings/viewBookings"; // Modal for viewing bookings
import UpdateVenueModal from "../../venueManager/updateVenue/updateVenue"; // Modal for updating venues
import styles from "../profilePage.module.css";
import { Link } from "react-router-dom";

const VenuesSection = () => {
    const { profile } = useProfile(); // Get profile from the context
    const [venues, setVenues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVenue, setSelectedVenue] = useState(null); // For opening update modal
    const [selectedBookings, setSelectedBookings] = useState([]); // Bookings for the selected venue
    const [showBookingsModal, setShowBookingsModal] = useState(false); // Toggle bookings modal

    useEffect(() => {
        const fetchVenues = async () => {
            if (!profile?.name) {
                setError("Profile not found");
                setIsLoading(false);
                return;
            }
            try {
                const fetchedVenues = await fetchProfileData(profile.name);
                setVenues(fetchedVenues);
            } catch (err) {
                setError(
                    err.message || "An error occurred while fetching venues."
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchVenues();
    }, [profile]);

    const handleUpdateVenue = (venue) => {
        setSelectedVenue(venue); // Open modal with selected venue
    };

    const handleViewBookings = async (venue) => {
        try {
            // Debugging: Log the venue details
            console.log("Selected venue for bookings:", venue);

            if (!venue?.id) {
                throw new Error("Invalid venue ID");
            }

            // Use existing bookings if available
            if (venue.bookings && venue.bookings.length > 0) {
                console.log(
                    `Using existing bookings for venue ID: ${venue.id}`
                );
                setSelectedBookings(venue.bookings);
            } else {
                // Fetch detailed venue data if bookings are not already loaded
                console.log(
                    `Fetching detailed bookings for venue ID: ${venue.id}`
                );
                const detailedVenue = await fetchVenueById(venue.id);
                console.log("Fetched detailed venue data:", detailedVenue);

                setSelectedBookings(detailedVenue.bookings || []);
            }
            setShowBookingsModal(true); // Open bookings modal
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Unable to load bookings.");
        }
    };

    const handleModalClose = () => {
        setSelectedVenue(null); // Close update modal
        setSelectedBookings([]); // Close bookings modal
        setShowBookingsModal(false);
    };

    const handleDeleteVenue = (venueId) => {
        if (window.confirm("Are you sure you want to delete this venue?")) {
            setVenues((prev) => prev.filter((venue) => venue.id !== venueId));
            console.log(`Venue with ID ${venueId} deleted.`);
        }
    };

    if (isLoading) {
        return <p>Loading venues...</p>;
    }
    if (error) {
        return <p className="error">{error}</p>;
    }
    if (venues.length === 0) {
        return <p>No venues available.</p>;
    }

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
                            <Link
                                to={`/venues/${venue.id}`}
                                className={styles.venueDescription}
                            >
                                View venue
                            </Link>
                            <div className={styles.venueActions}>
                                <button
                                    className={styles.actionButton}
                                    onClick={() => handleUpdateVenue(venue)}
                                >
                                    Update venue
                                </button>
                                <button
                                    className={styles.actionButton}
                                    onClick={() => handleViewBookings(venue)}
                                >
                                    View bookings
                                </button>
                                <button
                                    className={styles.actionButton}
                                    onClick={() => handleDeleteVenue(venue.id)}
                                >
                                    Delete venue
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedVenue && (
                <UpdateVenueModal
                    venue={selectedVenue}
                    onClose={handleModalClose}
                    onUpdate={() => console.log("Venue updated")} // Implement update logic
                />
            )}
            {showBookingsModal && (
                <ViewBookingsModal
                    bookings={selectedBookings}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};

export default VenuesSection;
