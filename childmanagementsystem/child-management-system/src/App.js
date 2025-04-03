import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Children from './pages/Children';
import Caregivers from './pages/Caregivers';
import Attendance from './pages/Attendance';
import Admin from './pages/Admin';
import Parents from './pages/Parents';
import Reports from './pages/Reports';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/children" element={<Children />} />
                <Route path="/caregivers" element={<Caregivers />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/parents" element={<Parents />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/Reports" element={<Reports />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default App;
