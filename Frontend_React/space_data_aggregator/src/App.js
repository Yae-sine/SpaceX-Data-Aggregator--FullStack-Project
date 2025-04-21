import Navbar from "./components/navbar";
import Footer from "./components/footer";
import LandingPage from "./pages/landingPage";

function App() {
    return (
        <div className="App bg-black">
            <Navbar />
            <LandingPage />
            <Footer />
        </div>
    );
}

export default App;