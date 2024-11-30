// import { BASE_URL, API_KEY } from "./constants";

// export const login = async (formData) => {
//     const url = `${BASE_URL}/auth/login`;
//     const headers = {
//         "Content-Type": "application/json",
//         "X-Noroff-API-Key": API_KEY,
//     };

//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers,
//             body: JSON.stringify(formData),
//         });

//         if (!response.ok) {
//             throw new Error("Login failed. Check your email or password.");
//         }

//         return await response.json(); // Return the login data
//     } catch (error) {
//         console.error("Error during login:", error);
//         throw error; // Propagate the error
//     }
// };
