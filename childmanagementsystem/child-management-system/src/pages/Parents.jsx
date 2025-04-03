import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';

const activityData = [
    { day: 'Mon', activity: 5 },
    { day: 'Tue', activity: 6 },
    { day: 'Wed', activity: 7 },
    { day: 'Thu', activity: 8 },
    { day: 'Fri', activity: 6 },
];

const Parents = () => {
    const theme = useTheme(); // Access the Material-UI theme
    const [selectedPage, setSelectedPage] = useState('dashboard'); // State to track selected page

    const renderContent = () => {
        if (selectedPage === 'dashboard') {
            return (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Parents Dashboard
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Welcome to the Parents Dashboard. Manage daycare bookings and view your child's activity here.
                    </Typography>
                    <Box sx={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <Button variant="contained" color="primary" href="/book-daycare">
                            Book Daycare Slot
                        </Button>
                        <Button variant="contained" color="primary" href="/view-attendance">
                            View Attendance
                        </Button>
                        <Button variant="contained" color="secondary" href="/register">
                            Register & Book Slot
                        </Button>
                        <Button variant="contained" color="success" href="/add-child">
                            Add Child
                        </Button>
                    </Box>
                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Child Activity
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Monitor your child's daily activity trends.
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={activityData}>
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="activity" stroke="#8884d8" name="Activity Level" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            );
        }
        // Add more pages if needed
        return null;
    };

    return (
        <div>
            <Navbar />
            <Drawer variant="permanent" anchor="left" sx={{ width: 200, flexShrink: 0 }}>
                <Box sx={{ width: 240, height: '100vh', backgroundColor: theme.palette.primary.main }}>
                    <Typography variant="h6" gutterBottom sx={{ padding: '20px' }}>
                        Parents Navigation
                    </Typography>
                    <List>
                        <ListItem
                            button
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                            onClick={() => setSelectedPage('dashboard')} // Set selected page to 'dashboard'
                        >
                            <ListItemText primary="Dashboard" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            href="/book-daycare"
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                        >
                            <ListItemText primary="Book Daycare Slot" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            href="/view-attendance"
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                        >
                            <ListItemText primary="View Attendance" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            href="/register"
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                        >
                            <ListItemText primary="Register & Book Slot" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            href="/add-child"
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                        >
                            <ListItemText primary="Add Child" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <main className="parents-main" style={{ marginLeft: 300, padding: '10px' }}>
                {renderContent()}
            </main>
        </div>
    );
};

export default Parents;
