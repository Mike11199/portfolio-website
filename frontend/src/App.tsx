import "./App.css";
import "./theme.css";
import HomePage from "./components/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = () => (
  <div id="top">
    <Navbar />
    <HomePage />
    <Footer />
  </div>
);

export default App;
