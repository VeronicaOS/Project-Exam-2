// import React, { useEffect, useState } from "react";
// import { fetchProfileData } from "../../../utils/fetchVenuesBookings";
// import styles from "../profilePage.module.css";

// const BookingsSection = ({ profileName }) => {
//     const [bookings, setBookings] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const data = await fetchProfileData(profileName, {
//                     bookings: true,
//                 });
//                 setBookings(data.bookings || []);
//             } catch (err) {
//                 setError(
//                     err.message || "An error occurred while fetching bookings."
//                 );
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchBookings();
//     }, [profileName]);

//     if (isLoading) return <p>Loading bookings...</p>;
//     if (error) return <p className="error">{error}</p>;
//     if (bookings.length === 0) return <p>No bookings available.</p>;

//     return (
//         <div className={styles.bookingsSection}>
//             <h2>Your Bookings</h2>
//             <div className={styles.bookingsGrid}>
//                 {bookings.map((booking) => (
//                     <div key={booking.id} className={styles.bookingCard}>
//                         <img
//                             src={
//                                 booking.venue.media?.[0]?.url ||
//                                 "default-venue.jpg"
//                             }
//                             alt={booking.venue.name}
//                         />
//                         <h3>{booking.venue.name}</h3>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BookingsSection;
