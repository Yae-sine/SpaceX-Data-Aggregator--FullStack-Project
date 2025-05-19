import Navbar from "./components/navbar";
import Footer from "./components/footer";
import LandingPage from "./pages/landingPage";
import ProfilePage from "./pages/ProfilePage";
import {Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App bg-black">
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;