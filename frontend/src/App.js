import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';
import Dashboard from "./components/Dashboard";
import './components/style.css'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <h1 style={{textAlign:"center"}}>Sign Up and Login</h1>
      <br />

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />



        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
