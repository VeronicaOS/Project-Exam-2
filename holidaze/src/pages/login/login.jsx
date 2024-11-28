import React from "react";
import useFormData from "./formData/formData";
import LoginForm from "./loginForm/loginForm";
import { useProfile } from "../../context/profileContext"; // Import useProfile
import styles from "./login.module.css";

const LoginPage = () => {
    const { fetchProfile } = useProfile(); // Access fetchProfile from ProfileContext

    const { formData, handleChange, handleSubmit, isLoading, error } =
        useFormData({
            initialState: { email: "", password: "" },
            submitAction: async (formData) => {
                const url = "https://v2.api.noroff.dev/auth/login";
                const headers = { "Content-Type": "application/json" };

                try {
                    console.log("Submitting login form data:", formData);

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
                    console.log("Login API response:", loginData);

                    // Extract token and basic profile info
                    const { accessToken: token, name } = loginData.data;

                    // Save token and username to localStorage
                    localStorage.setItem("token", token);
                    localStorage.setItem("username", name);
                    console.log("Saved to localStorage:", {
                        token,
                        username: name,
                    });

                    // Verify token is correctly saved
                    const storedToken = localStorage.getItem("token");
                    console.log(
                        "Token retrieved from localStorage:",
                        storedToken
                    );

                    // Fetch full profile
                    const profileResponse = await fetch(
                        `https://v2.api.noroff.dev/holidaze/profiles/${name}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`, // Ensure token format
                            },
                        }
                    );

                    if (!profileResponse.ok) {
                        throw new Error("Failed to fetch full profile.");
                    }

                    const profileData = await profileResponse.json();
                    console.log("Profile API response:", profileData);

                    // Save full profile to localStorage
                    localStorage.setItem(
                        "profile",
                        JSON.stringify(profileData.data)
                    );
                    console.log(
                        "Saved full profile to localStorage:",
                        profileData.data
                    );

                    // Redirect to home
                    window.location.href = "/";
                } catch (error) {
                    console.error("Error during login:", error);
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
