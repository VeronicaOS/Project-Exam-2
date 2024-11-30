// import React, { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_KEY, LOGIN_URL, PROFILE_URL } from "../api/constants";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem("token") || "");
//     const navigate = useNavigate();

//     const loginAction = async (credentials) => {
//         try {
//             const response = await fetch(LOGIN_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "x-api-key": API_KEY,
//                 },
//                 body: JSON.stringify(credentials),
//             });

//             if (!response.ok) throw new Error("Login failed.");

//             const data = await response.json();
//             const { accessToken, name } = data.data;

//             setToken(accessToken);
//             localStorage.setItem("token", accessToken);
//             localStorage.setItem("username", name);

//             await fetchProfile(name, accessToken);
//             navigate("/dashboard");
//         } catch (error) {
//             console.error("Error during login:", error);
//             throw error;
//         }
//     };

//     const fetchProfile = async (username, token) => {
//         try {
//             const response = await fetch(PROFILE_URL(username), {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "x-api-key": API_KEY,
//                 },
//             });

//             if (!response.ok) throw new Error("Profile fetch failed.");

//             const data = await response.json();
//             setUser(data.data);
//         } catch (error) {
//             console.error("Error fetching profile:", error);
//         }
//     };

//     const logOut = () => {
//         setUser(null);
//         setToken("");
//         localStorage.removeItem("token");
//         localStorage.removeItem("username");
//         navigate("/login");
//     };

//     return (
//         <AuthContext.Provider value={{ user, token, loginAction, logOut }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
