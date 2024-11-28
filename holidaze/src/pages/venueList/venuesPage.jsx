import React, { useState, useEffect } from "react";
import VenueCard from "../../components/cards/venuesCard/venuesCard";
import styles from "./venuesPage.module.css";
import sharedStyles from "../styles.module.css";

const VenuesPage = () => {
    const [venues, setVenues] = useState([]); // All fetched venues
    const [visibleVenues, setVisibleVenues] = useState([]); // Venues currently displayed
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Current page number
    const ITEMS_PER_PAGE = 12; // Number of venues to display per load

    // Fetch venues from the API
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch(
                    "https://v2.api.noroff.dev/holidaze/venues"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch venues");
                }
                const data = await response.json();
                setVenues(data.data); // Assuming `data.data` is the array of venues
                setVisibleVenues(data.data.slice(0, ITEMS_PER_PAGE)); // Show initial 12
            } catch (err) {
                console.error(err);
                setError("Failed to load venues. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    // Handle "Load More" button click
    const loadMore = () => {
        const nextPage = page + 1;
        const startIndex = nextPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
        const endIndex = nextPage * ITEMS_PER_PAGE;
        setVisibleVenues((prev) => [
            ...prev,
            ...venues.slice(startIndex, endIndex),
        ]);
        setPage(nextPage);
    };

    if (loading) {
        return <p>Loading venues...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.container}>
            <div className={sharedStyles.wrapper}>
                <h2 className={styles.heading}>Our Venues</h2>
                <div className={styles.grid}>
                    {visibleVenues.map((venue) => (
                        <VenueCard
                            key={venue.id}
                            id={venue.id}
                            title={venue.name}
                            price={venue.price}
                            imageUrl={venue.media[0]?.url}
                            imageAlt={venue.media[0]?.alt}
                        />
                    ))}
                </div>
                {/* Show Load More button if there are more venues to load */}
                {visibleVenues.length < venues.length && (
                    <button onClick={loadMore} className={styles.loadMore}>
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default VenuesPage;
