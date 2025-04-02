import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Children from './pages/Children';
import Caregivers from './pages/Caregivers';
import Attendance from './pages/Attendance';
import Admin from './pages/Admin';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/children" element={<Children />} />
                <Route path="/caregivers" element={<Caregivers />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;
