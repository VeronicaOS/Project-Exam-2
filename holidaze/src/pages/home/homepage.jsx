import React from "react";
import HeroSection from "./heroSection/heroSection";
// import FavoritesSection from "../components/FavoritesSection";
// import SignupSection from "../components/SignupSection";
// import PetFriendlySection from "../components/PetFriendlySection";
import styles from "./homePage.module.css";

const HomePage = () => {
    return (
        <div className={styles.container}>
            <HeroSection />
            {/* <FavoritesSection />
            <SignupSection />
            <PetFriendlySection /> */}
        </div>
    );
};

export default HomePage;
