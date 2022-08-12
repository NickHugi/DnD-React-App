import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SpellDetails from './pages/SpellDetails';
import Spells from './pages/Spells';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <NavBar />

                <div className="page">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route exact path="/spells/" element={<Spells />} />
                        <Route exact path="/spells/:spellIndex" element={<SpellDetails />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
