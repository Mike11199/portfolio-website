import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>  
    </Routes>
    <Footer />
    </>
  );
}

export default App;
