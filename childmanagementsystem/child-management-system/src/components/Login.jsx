import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import '../../src/pages/Home';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // State for role
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Email is required.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!password.trim()) {
            setError('Password is required.');
            return;
        }

        if (!role) {
            setError('Role is required.');
            return;
        }

        // Retrieve user credentials from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === email && u.password === password && u.role === role);

        if (!user) {
            setError('Invalid email, password, or role.');
            return;
        }

        setError('');
        console.log('Navigating to Home'); // Debugging statement
        if (role === "Admin") {
            navigate('/admin'); // Navigate to admin page if role is Admin
        } else {
            navigate('/home'); // Navigate to home for other roles
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Day Care Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Parent">Parent</option>
                        <option value="Caregiver">Caregiver</option>
                    </select>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
            {role === "Admin" && (
                <p>
                    <Link to="/admin"></Link>
                </p>
            )}
        </div>
    );
};

// Placeholder for Admin Page
const AdminPage = () => {
    return (
        <div>
            <h1>Welcome to the Admin Page</h1>
            <p>This is the admin dashboard.</p>
        </div>
    );
};

export { AdminPage };
export default Login;
