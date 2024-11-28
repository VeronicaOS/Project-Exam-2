import styles from "./App.module.css";
import Layout from "./components/layout/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProfileProvider } from "./context/profileContext";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import VenuesPage from "./pages/venueList/venuesPage";
// import ProductPage from "./pages/product/productPage";
// import ContactPage from "./pages/contact/contact";
// import CheckoutPage from "./pages/checkout/checkout";
// import CheckoutSuccessPage from "./pages/checkout/checkoutSuccess";
import ScrollToTop from "./components/scroll/scroll";

function App() {
    return (
        <ProfileProvider>
            <Router>
                <ScrollToTop />
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/venues" element={<VenuesPage />} />
                        {/* <Route path="/contact" element={<ContactPage />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                    />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                        path="/checkout-success"
                        element={<CheckoutSuccessPage />}
                    /> */}
                    </Routes>
                </Layout>
            </Router>
        </ProfileProvider>
    );
}

export default App;
