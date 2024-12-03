import React, { useState } from "react";
import { updateVenue } from "../../../utils/updateVenue";
import styles from "./updateVenue.module.css"; // Add styles for your modal

const UpdateVenueModal = ({ venue, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: venue.name || "",
        description: venue.description || "",
        price: venue.price || 0,
        maxGuests: venue.maxGuests || 0,
        meta: venue.meta || {},
        location: venue.location || {},
    });
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);
            setError(null);
            const updatedVenue = await updateVenue(venue.id, formData);
            onUpdate(updatedVenue); // Update the venue list in the parent component
            onClose(); // Close the modal
        } catch (err) {
            setError(err.message || "Failed to update venue.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Update Venue</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Max Guests:
                        <input
                            type="number"
                            name="maxGuests"
                            value={formData.maxGuests}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.actions}>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateVenueModal;
