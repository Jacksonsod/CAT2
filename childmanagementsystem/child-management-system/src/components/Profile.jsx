import React, { useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'Parent',
        avatar: '/path/to/avatar.jpg', // Replace with actual avatar path
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
        // Add logic to save updated user details
    };

    return (
        <>
        <Navbar/>
        <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 100, height: 100, margin: '0 auto', marginBottom: '20px' }}
            />
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '80%' }}
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '80%' }}
                    />
                    <Button variant="contained" color="primary" sx={{ marginTop: '20px' }} onClick={handleSave}>
                        Save
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Email: {user.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Role: {user.role}
                    </Typography>
                    
                </>
            )}
        </Box>
        <Footer />
        </>
    );
};

export default Profile;
