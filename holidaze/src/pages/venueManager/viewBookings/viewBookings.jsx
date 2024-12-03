import React, { useEffect, useState } from "react";
import { fetchVenueById } from "../../../utils/fetchVenueDetails"; // Import the function to fetch venue details
import styles from "./viewBookings.module.css"; // Add a CSS file for modal styles

const ViewBookingsModal = ({ bookings, onClose }) => {
    const [error, setError] = useState(null);

    if (error) {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <div className={styles.actions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.closeButton}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>View Bookings</h2>
                {bookings.length > 0 ? (
                    <div className={styles.bookingsList}>
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className={styles.bookingCard}
                            >
                                <p>
                                    <strong>Check-in:</strong>{" "}
                                    {new Date(
                                        booking.dateFrom
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Check-out:</strong>{" "}
                                    {new Date(
                                        booking.dateTo
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Guests:</strong> {booking.guests}
                                </p>
                                <p>
                                    <strong>Customer:</strong>{" "}
                                    {booking.customer?.name || "N/A"}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {booking.customer?.email || "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No bookings available for this venue.</p>
                )}
                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={styles.closeButton}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewBookingsModal;
