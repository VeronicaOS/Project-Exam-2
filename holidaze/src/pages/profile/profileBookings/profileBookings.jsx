// import React, { useEffect, useState } from "react";
// import { useProfile } from "../../../context/profileContext"; // Access the profile context
// import { fetchProfileData } from "../../../utils/fetchProfileVenues"; // Fetch bookings API function
// import styles from "../profilePage.module.css";
// import Button from "../../../components/button/button";

// const BookingsSection = () => {
//     const { profile } = useProfile(); // Get profile from the context
//     const [bookings, setBookings] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState("");

//     useEffect(() => {
//         const fetchBookings = async () => {
//             if (!profile?.name) {
//                 setError("Profile not found");
//                 setIsLoading(false);
//                 return;
//             }
//             try {
//                 const { bookings } = await fetchProfileData(profile.name); // Destructure bookings
//                 if (Array.isArray(bookings)) {
//                     setBookings(bookings);
//                 } else {
//                     throw new Error("Invalid bookings data format.");
//                 }
//             } catch (err) {
//                 setError(
//                     err.message || "An error occurred while fetching bookings."
//                 );
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchBookings();
//     }, [profile]);

//     useEffect(() => {
//         if (successMessage) {
//             const timeout = setTimeout(() => {
//                 setSuccessMessage(""); // Clear the success message after 3 seconds
//             }, 1500);

//             return () => clearTimeout(timeout); // Cleanup the timeout on unmount
//         }
//     }, [successMessage]);

//     const handleCancelBooking = async (bookingId) => {
//         if (window.confirm("Are you sure you want to cancel this booking?")) {
//             try {
//                 // Implement cancelBooking logic here
//                 // await cancelBooking(bookingId);
//                 setBookings((prev) =>
//                     prev.filter((booking) => booking.id !== bookingId)
//                 );
//                 setSuccessMessage("Booking canceled successfully!");
//             } catch (error) {
//                 setError(error.message || "Failed to cancel booking.");
//             }
//         }
//     };

//     if (isLoading) {
//         return <p>Loading bookings...</p>;
//     }
//     if (error) {
//         return <p className="error">{error}</p>;
//     }
//     if (bookings.length === 0) {
//         return <p>No bookings available.</p>;
//     }

//     return (
//         <div className={styles.bookingsSection}>
//             <h2 className={styles.bookingsTitle}>Your Bookings</h2>
//             {successMessage && (
//                 <div className={styles.successMessageOverlay}>
//                     <div className={styles.successMessage}>
//                         {successMessage}
//                     </div>
//                 </div>
//             )}
//             <div className={styles.bookingsGrid}>
//                 {bookings.map((booking) => (
//                     <div key={booking.id} className={styles.bookingCard}>
//                         <h3 className={styles.bookingTitle}>
//                             {booking.venue?.name || "Venue Name"}
//                         </h3>
//                         <p>
//                             <strong>Check-in:</strong>{" "}
//                             {new Date(booking.dateFrom).toLocaleDateString()}
//                         </p>
//                         <p>
//                             <strong>Check-out:</strong>{" "}
//                             {new Date(booking.dateTo).toLocaleDateString()}
//                         </p>
//                         <p>
//                             <strong>Guests:</strong> {booking.guests}
//                         </p>
//                         <p>
//                             <strong>Venue:</strong>{" "}
//                             {booking.venue?.name || "Venue Name"}
//                         </p>
//                         <Button
//                             className={styles.cancelButton}
//                             onClick={() => handleCancelBooking(booking.id)}
//                         >
//                             Cancel Booking
//                         </Button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BookingsSection;
