import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
