// import { BASE_URL, API_KEY } from "./constants";

// export const fetchProfile = async (username, token) => {
//     const url = `${BASE_URL}/holidaze/profiles/${username}`;
//     const headers = {
//         Authorization: `Bearer ${token}`,
//         "X-Noroff-API-Key": API_KEY,
//     };

//     try {
//         console.log("Fetching profile with headers:", headers);
//         console.log("Fetching profile with URL:", url);

//         const response = await fetch(url, {
//             method: "GET",
//             headers,
//         });

//         console.log("Profile fetch response status:", response.status);

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Failed to fetch profile. Response text:", errorText);
//             throw new Error(
//                 `Profile fetch failed with status: ${response.status}`
//             );
//         }

//         const data = await response.json();
//         console.log("Profile data received:", data);
//         return data.data; // Return the profile data
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         throw error; // Propagate the error
//     }
// };
