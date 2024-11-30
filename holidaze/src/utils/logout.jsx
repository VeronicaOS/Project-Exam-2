export const handleLogout = (setProfile) => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("username");

    // Reset profile in context if applicable
    if (setProfile) {
        setProfile(null);
    }

    // Redirect to login page
    window.location.href = "/login";
};
