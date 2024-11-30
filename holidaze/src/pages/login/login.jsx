import React from "react";
import useFormData from "./formData/formData";
import LoginForm from "./loginForm/loginForm";
import { useProfile } from "../../context/profileContext";
import { BASE_URL, API_KEY } from "../../api/constants"; // Import API key and base URL
import styles from "./login.module.css";

const LoginPage = () => {
    const { fetchProfile } = useProfile();

    const { formData, handleChange, handleSubmit, isLoading, error } =
        useFormData({
            initialState: { email: "", password: "" },
            submitAction: async (formData) => {
                const url = `${BASE_URL}/auth/login`;
                const headers = {
                    "Content-Type": "application/json",
                    "X-Noroff-API-Key": API_KEY, // Correct header for API key
                };

                try {
                    // Perform login
                    const response = await fetch(url, {
                        method: "POST",
                        headers,
                        body: JSON.stringify(formData),
                    });

                    if (!response.ok) {
                        throw new Error(
                            "Login failed. Check your email or password."
                        );
                    }

                    const loginData = await response.json();
                    const { accessToken: token, name } = loginData.data;

                    // Save token and username
                    localStorage.setItem("token", token);
                    localStorage.setItem("username", name);

                    console.log("Token and username saved:", { token, name });

                    // Fetch full profile
                    const profileResponse = await fetch(
                        `${BASE_URL}/holidaze/profiles/${name}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`, // Bearer token
                                "X-Noroff-API-Key": API_KEY, // Correct header for API key
                            },
                        }
                    );

                    if (!profileResponse.ok) {
                        const errorText = await profileResponse.text();
                        console.error(
                            "Profile fetch failed. Status:",
                            profileResponse.status
                        );
                        console.error("Response text:", errorText);
                        throw new Error(
                            `Profile fetch failed with status: ${profileResponse.status}`
                        );
                    }

                    const profileData = await profileResponse.json();

                    // Save profile data to localStorage
                    localStorage.setItem(
                        "profile",
                        JSON.stringify(profileData.data)
                    );

                    console.log(
                        "Profile data saved to localStorage:",
                        profileData.data
                    );

                    // Redirect to home
                    window.location.href = "/";
                } catch (error) {
                    console.error(
                        "Error during login or fetching profile:",
                        error
                    );
                }
            },
        });

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <LoginForm
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

export default LoginPage;
