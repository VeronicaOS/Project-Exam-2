import React from "react";
import useFormData from "./formData/formData";
import LoginForm from "./loginForm/loginForm";
import styles from "./login.module.css";

const LoginPage = () => {
    const { formData, handleChange, handleSubmit, isLoading, error } =
        useFormData({
            initialState: { email: "", password: "" },
            submitAction: async (formData) => {
                const url = "https://v2.api.noroff.dev/auth/login";
                const headers = { "Content-Type": "application/json" };

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

                const data = await response.json();
                console.log("Backend response data:", data);
                const { accessToken: token, ...profile } = data.data;

                // Save token and profile to localStorage
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("profile", JSON.stringify(profile));

                // Redirect to home
                // window.location.href = "/";
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
