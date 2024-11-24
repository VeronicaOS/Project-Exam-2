import React from "react";
import styles from "./heroSection.module.css";
import sharedStyles from "../../styles.module.css";

const HeroSection = () => {
    return (
        <>
            <section className={styles.heroImage}>
                <div className={sharedStyles.wrapper}>
                    <div className={styles.heroSection}>
                        <h1>Your perfect stay, just a click away</h1>
                        <div className={styles.searchContainer}>
                            <input type="text" placeholder="I want to go to" />
                            <button>Search</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
