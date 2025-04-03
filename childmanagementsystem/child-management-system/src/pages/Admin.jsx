import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Typography, Box, Button } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', caregivers: 85, children: 120 },
    { name: 'Feb', caregivers: 90, children: 130 },
    { name: 'Mar', caregivers: 95, children: 140 },
    { name: 'Apr', caregivers: 100, children: 150 },
    { name: 'May', caregivers: 110, children: 160 },
];

const attendanceData = [
    { day: 'Mon', present: 50, absent: 10 },
    { day: 'Tue', present: 55, absent: 5 },
    { day: 'Wed', present: 60, absent: 0 },
    { day: 'Thu', present: 58, absent: 2 },
    { day: 'Fri', present: 57, absent: 3 },
];

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
                        <Button variant="contained" color="secondary" href="/roles">
                            Manage Roles
                        </Button>
                        <Button variant="contained" color="secondary" href="/settings">
                            System Settings
                        </Button>
                        <Button variant="contained" color="success" href="/add-child">
                            Add Child
                        </Button>
                    </Box>
                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Quick Tips
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            - Use the "Manage Roles" section to assign permissions to users.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            - Visit "System Settings" to configure application preferences.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            - Regularly check the "Reports" section for insights and analytics.
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Real-Time Analytics
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Monitor caregiver efficiency and child activity trends over time.
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="caregivers" stroke="#8884d8" name="Caregiver Efficiency" />
                                <Line type="monotone" dataKey="children" stroke="#82ca9d" name="Child Activity" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Daycare Slot Bookings
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Parents can register and book daycare slots for their children.
                        </Typography>
                        <Button variant="contained" color="primary" href="/bookings">
                            Manage Bookings
                        </Button>
                    </Box>
                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Caregiver Assignments
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Assign caregivers to children based on their needs and availability.
                        </Typography>
                        <Button variant="contained" color="primary" href="/assignments">
                            Manage Assignments
                        </Button>
                    </Box>
                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Attendance Tracking
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            View attendance trends for children using the chart below.
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={attendanceData}>
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="present" stroke="#4caf50" name="Present" />
                                <Line type="monotone" dataKey="absent" stroke="#f44336" name="Absent" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            </main>
            <Footer />
        </div>
    );
};

export default Admin;
