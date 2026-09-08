import "./App.css";
import "./theme.css";
import HomePage from "./components/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Toaster } from "react-hot-toast";

const App = () => (
  <div id="top">
    <Toaster toastOptions={{ style: { background: "#101010", color: "var(--terminal-accent)", border: "1px solid var(--terminal-divider)" } }} />
    <Navbar />
    <HomePage />
    <Footer />
  </div>
);

export default App;
