import "./App.css";
import "./theme.css";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./components/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <HomePage />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
