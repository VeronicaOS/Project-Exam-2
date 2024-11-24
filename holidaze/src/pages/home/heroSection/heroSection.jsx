import React from "react";
import styles from "./heroSection.module.css";

const HeroSection = () => {
    return (
        <>
            <section className={styles.heroSection}>
                <div className={styles.heroMain}>
                    <h1>Your perfect stay, just a click away</h1>
                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="I want to go to" />
                        <button>Search</button>
                    </div>
                </div>
            </section>
            <div className={styles.heroSpacer}></div>
        </>
    );
};

export default HeroSection;
