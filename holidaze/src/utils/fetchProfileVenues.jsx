import { BASE_URL, API_KEY } from "../api/constants";

export const fetchProfileData = async (profileName) => {
    const endpoint = `/holidaze/profiles/${profileName}?_venues=true&_bookings=true`;
    const url = BASE_URL + endpoint;
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };

    try {
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) {
            throw new Error("Failed to fetch venues");
        }

        const result = await response.json();

        // Debug: Log the full response
        console.log("API Full Response:", result);

        // Return the venues array from the data object
        return result.data?.venues || [];
    } catch (err) {
        console.error("Error fetching venues:", err);
        throw err; // Re-throw the error to handle in the calling code
    }
};
