import "./App.css";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
