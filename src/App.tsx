import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import SpellDetails from './pages/SpellDetails';
import Spells from './pages/Spells';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <NavBar />

                <div className="page">
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route path="/spells/" element={<Spells />} />
                        <Route path="/spells/:spellIndex" element={<SpellDetails />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
