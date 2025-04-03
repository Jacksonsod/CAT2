import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Typography, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import ChildrenPage from '../pages/Children';
import '../styles/components.css';
import Caregivers from './Caregivers';
import Attendance from './Attendance';

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
    const theme = useTheme(); // Access the Material-UI theme

    const renderContent = () => {
        return (
            <Box>
                <Typography variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
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
        );
    };

    return (
        <div>
            <Navbar />
            <Drawer variant="permanent" anchor="left" sx={{ width: 200, flexShrink: 0 }}>
                <Box sx={{ width: 240, height: '100vh', backgroundColor: theme.palette.primary.main }}>
                    <Typography variant="h6" gutterBottom sx={{ padding: '20px' }}>
                        Admin Navigation
                    </Typography>
                    <List>
                        <ListItem button sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}>
                            <ListItemText primary="Admin Dashboard" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem button sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}>
                            <ListItemText primary="Manage Children" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem button sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}>
                            <ListItemText primary="Manage Caregivers" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem button sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}>
                            <ListItemText primary="Manage Attendance" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem button sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}>
                            <ListItemText primary="View Reports" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem button component="a" href="/settings" sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}>
                            <ListItemText primary="System Settings" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <main className="admin-main" style={{ marginLeft: 300, padding: '10px' }}>
                {renderContent()}
            </main>
        </div>
    );
};

export default Admin;
