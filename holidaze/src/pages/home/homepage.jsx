import React from "react";
import HeroSection from "./heroSection/heroSection";
// import FavoritesSection from "../components/FavoritesSection";
import NewsletterSection from "./newsletterSection/newsletterSection";
import PetSection from "./petSection/petSection";
import styles from "./homePage.module.css";

const HomePage = () => {
    return (
        <div className={styles.container}>
            <HeroSection />
            {/* <FavoritesSection /> */}
            <NewsletterSection />
            <PetSection />
        </div>
    );
};

export default HomePage;
