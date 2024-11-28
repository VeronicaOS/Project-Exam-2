import React from "react";
import styles from "./venuesCard.module.css";

const VenueCard = ({ title, price, imageUrl, imageAlt }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={imageUrl || "/default-placeholder.png"} // Fallback image if no media
                    alt={imageAlt || "No image available"} // Fallback alt text
                    className={styles.image}
                />
                <div className={styles.overlay}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.price}>Price: ${price}</p>
                </div>
            </div>
        </div>
    );
};

export default VenueCard;
