import React from "react";
import styles from "./newsletterSection.module.css";
import sharedStyles from "../../styles.module.css";

const NewsletterSection = () => {
    return (
        <div className={sharedStyles.wrapper}>
            <section className={styles.newsletterSection}>
                <div>
                    <h2>Make sure you never miss out!</h2>
                    <p>
                        Sign up for booking reminders, travel hacks, and tips to
                        make your stay perfect.
                    </p>
                    <div className={styles.form}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                        />
                        <button>Sign up</button>
                    </div>
                </div>
                <div>
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </section>
        </div>
    );
};

export default NewsletterSection;
