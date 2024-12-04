import React from "react";
import useFormData from "../../login/formData/formData";
import VenueForm from "./venueForm/venueForm";
import { BASE_URL, API_KEY } from "../../../api/constants"; // Import API key and base URL
import styles from "./createVenue.module.css";

const CreateVenuePage = () => {
    const { formData, handleChange, handleSubmit, isLoading, error } =
        useFormData({
            initialState: {
                name: "",
                description: "",
                media: "",
                mediaAlt: "",
                price: "",
                maxGuests: "",
                wifi: false,
                parking: false,
                breakfast: false,
                pets: false,
                address: "",
                city: "",
                zip: "",
                country: "",
                continent: "",
            },
            submitAction: async (formData) => {
                const url = `${BASE_URL}/holidaze/venues`;
                const token = localStorage.getItem("token");
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": API_KEY,
                };

                const requestBody = {
                    name: formData.name,
                    description: formData.description,
                    media: formData.media
                        ? [
                              {
                                  url: formData.media,
                                  alt: formData.name || "Venue image",
                              },
                          ]
                        : [],
                    price: Number(formData.price),
                    maxGuests: Number(formData.maxGuests),
                    meta: {
                        wifi: Boolean(formData.wifi),
                        parking: Boolean(formData.parking),
                        breakfast: Boolean(formData.breakfast),
                        pets: Boolean(formData.pets),
                    },
                    location: {
                        address: formData.address || null,
                        city: formData.city || null,
                        zip: formData.zip || null,
                        country: formData.country || null,
                        continent: formData.continent || null,
                    },
                };

                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers,
                        body: JSON.stringify(requestBody),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to create the venue.");
                    }

                    const venueData = await response.json();
                    console.log("Venue created successfully:", venueData);
                    window.location.href = "/my-profile"; // Redirect
                } catch (err) {
                    console.error("Error creating venue:", err);
                }
            },
        });

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <VenueForm
                        formData={formData}
                        handleChange={handleChange}
                        error={error}
                    />
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Create Venue"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateVenuePage;
