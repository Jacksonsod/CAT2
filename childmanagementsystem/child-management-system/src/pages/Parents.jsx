import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Typography, Box, Button } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const activityData = [
    { day: 'Mon', activity: 5 },
    { day: 'Tue', activity: 6 },
    { day: 'Wed', activity: 7 },
    { day: 'Thu', activity: 8 },
    { day: 'Fri', activity: 6 },
];

const Parents = () => {
    return (
        <div>
            <Navbar />
            <main className="parents-main">
                <Box sx={{ padding: '20px' }}>
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
            </main>
            <Footer />
        </div>
    );
};

export default Parents;
