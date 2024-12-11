import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddCar from "./components/AddCar";
import CarDetail from "./components/CarDetail";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add-car' element={<AddCar />} />
          <Route path='/cars/:id' element={<CarDetail />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
