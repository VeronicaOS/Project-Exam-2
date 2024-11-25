import React from "react";
import styles from "../login.module.css";

const LoginForm = ({ formData, handleChange, isLoading, error }) => {
    return (
        <>
            <h1 className={styles.heading1}>Welcome back!</h1>
            <h2 className={styles.heading2}>Log In</h2>

            {/* Email Input */}
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            {/* Password Input */}
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            {/* Error Message */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Submit Button */}
            <button
                type="submit"
                className={styles.button}
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Log In"}
            </button>

            {/* Forgot Password and Register Links */}
            <p className={styles.link}>
                <a href="#!" className={styles.linkText}>
                    Forgot password?
                </a>
            </p>
            <p className={styles.link}>
                Don’t have an account?{" "}
                <a href="/register" className={styles.linkText}>
                    Register here
                </a>
            </p>
        </>
    );
};

export default LoginForm;
