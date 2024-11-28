import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsSection from "./detailsSection/detailsSection";
import BookingSection from "./bookingSection/bookingSection";
import FeaturesSection from "./featuresSection/featuresSection";
import sharedStyles from "../styles.module.css";

const VenueDetailsPage = () => {
    const { id } = useParams(); // Get the venue ID from the URL
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const response = await fetch(
                    `https://v2.api.noroff.dev/holidaze/venues/${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch venue data");
                }
                const data = await response.json();
                setVenue(data.data); // Store venue data
            } catch (err) {
                console.error(err);
                setError("Could not load venue details");
            } finally {
                setLoading(false);
            }
        };

        fetchVenue();
    }, [id]);

    if (loading) {
        return <p>Loading venue details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={sharedStyles.wrapper}>
            <div>
                <DetailsSection venue={venue} />
                <BookingSection />
                <FeaturesSection />
            </div>
        </div>
    );
};

export default VenueDetailsPage;
