export const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("username");

    // Redirect to login page
    window.location.href = "/";
};
