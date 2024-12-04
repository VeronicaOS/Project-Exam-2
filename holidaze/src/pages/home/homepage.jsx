import React, { useEffect } from "react";
import HeroSection from "./heroSection/heroSection";
// import FavoritesSection from "../components/FavoritesSection";
import NewsletterSection from "./newsletterSection/newsletterSection";
import PetSection from "./petSection/petSection";
import { useProfile } from "../../context/profileContext"; // Import useProfile hook
import styles from "./homePage.module.css";

const HomePage = () => {
    const { profile } = useProfile(); // Access the profile from ProfileContext

    useEffect(() => {}, [profile]);

    return (
        <div className={styles.container}>
            <HeroSection />
            {/* Conditional rendering if profile exists */}
            {/* <FavoritesSection /> */}
            <NewsletterSection />
            <PetSection />
        </div>
    );
};

export default HomePage;
