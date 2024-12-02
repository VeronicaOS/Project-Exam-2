import React from "react";
import useFormData from "../../login/formData/formData";
import CreateVenueForm from "./venueForm/venueForm";
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

                // Prepare the object being sent to the API
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
                console.log("Final Payload:", requestBody);

                try {
                    // Log the request body for debugging
                    console.log("Request Headers:", headers);
                    console.log("Request Body:", requestBody);

                    const response = await fetch(url, {
                        method: "POST",
                        headers,
                        body: JSON.stringify(requestBody),
                    });

                    if (!response.ok) {
                        const errorResponse = await response.json();
                        console.error("API Error Response:", errorResponse);
                        throw new Error("Failed to create the venue.");
                    }

                    const venueData = await response.json();
                    console.log("Venue created successfully:", venueData);

                    // Redirect or show success message
                    window.location.href = "/my-venues"; // Example redirect
                } catch (err) {
                    console.error("Error creating venue:", err);
                }
            },
        });

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <CreateVenueForm
                        formData={formData}
                        handleChange={handleChange}
                        isLoading={isLoading}
                        error={error}
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateVenuePage;
