import React, { useState } from "react";
import Calendar from "react-calendar"; // Calendar library
import "react-calendar/dist/Calendar.css"; // Default styles for react-calendar
import styles from "./bookingSection.module.css";

const BookingSection = ({ venueId }) => {
    const [selectedDates, setSelectedDates] = useState([null, null]); // Array for date range
    const [guests, setGuests] = useState(1); // Default to 1 guest
    const [isBooking, setIsBooking] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle booking
    const handleBooking = async () => {
        if (!selectedDates[0] || !selectedDates[1]) {
            alert("Please select both a start and end date.");
            return;
        }

        if (guests <= 0) {
            alert("Please select at least 1 guest.");
            return;
        }

        try {
            setIsBooking(true);

            // Retrieve the token
            const token = localStorage.getItem("token");
            console.log("Retrieved token: ", token); // Log the token

            const response = await fetch(
                `https://v2.api.noroff.dev/holidaze/bookings`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Use the token
                    },
                    body: JSON.stringify({
                        dateFrom: selectedDates[0].toISOString(),
                        dateTo: selectedDates[1].toISOString(),
                        guests,
                        venueId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to book the venue. Please try again.");
            }

            const data = await response.json();
            console.log("Booking successful! Details:", data.data); // Log success confirmation
            setSuccessMessage(`Booking successful! ID: ${data.data.id}`);
        } catch (error) {
            console.error("Error booking the venue: ", error); // Log errors
            setErrorMessage(
                "An error occurred while booking. Please try again."
            );
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <section className={styles.bookingSection}>
            <div className={styles.calendarContainer}>
                <h3>Select Your Dates</h3>
                <Calendar
                    selectRange={true} // Enable range selection
                    onChange={(value) => setSelectedDates(value)} // Directly update selected dates
                    value={selectedDates} // Bind the selected range
                    minDate={new Date()} // Prevent past dates
                />
            </div>
            <div className={styles.bookingDetails}>
                <h3>Booking Details</h3>
                <label>
                    Guests:
                    <input
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className={styles.input}
                    />
                </label>
                <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className={styles.bookButton}
                >
                    {isBooking ? "Booking..." : "Book Now"}
                </button>
                {successMessage && (
                    <p className={styles.successMessage}>{successMessage}</p>
                )}
                {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
            </div>
        </section>
    );
};

export default BookingSection;
