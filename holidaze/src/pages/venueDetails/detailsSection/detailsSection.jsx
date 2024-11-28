import React from "react";
import styles from "./detailsSection.module.css";

const DetailsSection = ({ venue }) => {
    return (
        <section className={styles.topDetailsSection}>
            <div className={styles.imageSection}>
                <img
                    src={venue.media[0]?.url || "/default-placeholder.png"}
                    alt={venue.media[0]?.alt || "Venue image"}
                    className={styles.image}
                />
            </div>
            <div className={styles.detailsSection}>
                <h2 className={styles.title}>{venue.name}</h2>
                <p className={styles.location}>
                    {venue.location.city}, {venue.location.country}
                </p>
                <p className={styles.description}>{venue.description}</p>
            </div>
        </section>
    );
};

export default DetailsSection;
