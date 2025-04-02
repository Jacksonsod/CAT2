import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Typography, Box, Button } from '@mui/material';

const Admin = () => {
    return (
        <div>
            <Navbar />
            <main className="admin-main">
                <Box sx={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Admin Dashboard
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Welcome to the Admin Dashboard. Manage users, caregivers, children, and reports from here.
                    </Typography>
                    <Box sx={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <Button variant="contained" color="primary" href="/children">
                            Manage Children
                        </Button>
                        <Button variant="contained" color="primary" href="/caregivers">
                            Manage Caregivers
                        </Button>
                        <Button variant="contained" color="primary" href="/attendance">
                            Manage Attendance
                        </Button>
                        <Button variant="contained" color="primary" href="/reports">
                            View Reports
                        </Button>
                    </Box>
                </Box>
            </main>
            <Footer />
        </div>
    );
};

export default Admin;
