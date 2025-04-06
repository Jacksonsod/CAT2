import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Typography, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import ChildrenPage from '../pages/Children';
import '../styles/components.css';
import Caregivers from './Caregivers';
import Attendance from './Attendance';
import Reports from './Reports'; // Import Reports component if it exists
import Form from '../components/Form'; // Import Form component
import { Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from MUI

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
    const [selectedPage, setSelectedPage] = useState('dashboard'); // State to track selected page
    const [caregiversList, setCaregiversList] = useState([]); // State to store caregivers list
    const [childrenList, setChildrenList] = useState([]); // State to store children list
    const [assignments, setAssignments] = useState([]); // State to store caregiver-child assignments
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false); // State to manage assign dialog visibility
    const [selectedCaregiver, setSelectedCaregiver] = useState('');
    const [selectedChild, setSelectedChild] = useState('');
    const [isEditChildDialogOpen, setIsEditChildDialogOpen] = useState(false); // State to manage edit dialog visibility for children
    const [editChild, setEditChild] = useState(null); // State to store child being edited
    const [isAddChildDialogOpen, setIsAddChildDialogOpen] = useState(false); // State to manage add child dialog visibility

    // Load caregivers, children, and assignments from localStorage on component mount
    useEffect(() => {
        const storedCaregivers = JSON.parse(localStorage.getItem('caregivers')) || [];
        const storedChildren = JSON.parse(localStorage.getItem('children')) || [];
        const storedAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
        setCaregiversList(storedCaregivers);
        setChildrenList(storedChildren);
        setAssignments(storedAssignments);
    }, []);

    // Save assignments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('assignments', JSON.stringify(assignments));
    }, [assignments]);

    const handleAssign = () => {
        // Add the new assignment
        const newAssignment = { caregiver: selectedCaregiver, child: selectedChild };
        setAssignments([...assignments, newAssignment]);
        setIsAssignDialogOpen(false); // Close the dialog after assignment
    };

    const handleEditChild = (child) => {
        setEditChild(child); // Set the child to be edited
        setIsEditChildDialogOpen(true); // Open the edit dialog
    };

    const handleEditChildSubmit = (updatedChild) => {
        const updatedList = childrenList.map((child) =>
            child.id === updatedChild.id ? updatedChild : child
        );
        setChildrenList(updatedList); // Update the children list
        setIsEditChildDialogOpen(false); // Close the edit dialog
    };

    const handleDeleteChild = (id) => {
        const updatedList = childrenList.filter((child) => child.id !== id);
        setChildrenList(updatedList); // Update the children list
        localStorage.setItem('children', JSON.stringify(updatedList)); // Save updated list to localStorage
    };

    const handleAddChildSubmit = (newChild) => {
        const updatedList = [...childrenList, { id: childrenList.length + 1, ...newChild }];
        setChildrenList(updatedList); // Update the children list
        localStorage.setItem('children', JSON.stringify(updatedList)); // Save updated list to localStorage
        setIsAddChildDialogOpen(false); // Close the add child dialog
    };

    const childColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'parentName', headerName: 'Parent Name', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleEditChild(params.row)}
                        style={{ marginRight: '10px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteChild(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const renderContent = () => {
        if (selectedPage === 'children') {
            return (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Manage Children
                    </Typography>
                    <Box sx={{ marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsAddChildDialogOpen(true)}
                            style={{ marginBottom: '20px' }}
                        >
                            Add Child
                        </Button>
                        <Typography variant="h5" gutterBottom>
                            Registered Children
                        </Typography>
                        <DataGrid
                            rows={childrenList.map((child, index) => ({
                                id: index + 1,
                                name: child.name,
                                age: child.age,
                                parentName: child.parentName,
                            }))}
                            columns={childColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </Box>
                </Box>
            );
        }
        if (selectedPage === 'caregivers') {
            return <Caregivers />;
        }
        if (selectedPage === 'attendance') {
            return <Attendance />;
        }
        if (selectedPage === 'reports') {
            return <Reports />; // Render Reports component
        }
        return (
            <Box>
                <Typography variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Box sx={{ marginTop: '40px' }}>
                    <Typography variant="h5" gutterBottom>
                        Assign Caregiver to Child
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Assign a caregiver to a child based on their needs and availability.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsAssignDialogOpen(true)}
                    >
                        Assign Caregiver
                    </Button>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                   
                    {caregiversList.map((caregiver, index) => (
                        <Box key={index} sx={{ marginBottom: '20px' }}>
                            <Typography variant="h6">{caregiver.name}</Typography>
                            <Typography variant="body2">
                                Assigned Children:
                                {assignments
                                    .filter((assignment) => assignment.caregiver === caregiver.name)
                                    .map((assignment, idx) => (
                                        <span key={idx}> {assignment.child}</span>
                                    ))}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                    <Typography variant="h5" gutterBottom>
                        Caregivers Overview
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Total Caregivers: {caregiversList.length}
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
        <>
        <div>
            <Navbar />
            <Drawer variant="permanent" anchor="left" sx={{ width: 200, flexShrink: 0 }}>
                <Box sx={{ width: 240, height: '100vh', backgroundColor: theme.palette.primary.main }}>
                    <Typography variant="h6" gutterBottom sx={{ padding: '20px' }}>
                        Admin Navigation
                    </Typography>
                    <List>
                        <ListItem
                            button
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                            onClick={() => setSelectedPage('dashboard')} // Set selected page to 'dashboard'
                        >
                            <ListItemText primary="Admin Dashboard" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                            onClick={() => setSelectedPage('children')} // Set selected page to 'children'
                        >
                            <ListItemText primary="Manage Children" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                            onClick={() => setSelectedPage('caregivers')} // Set selected page to 'caregivers'
                        >
                            <ListItemText primary="Manage Caregivers" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                            onClick={() => setSelectedPage('attendance')} // Set selected page to 'attendance'
                        >
                            <ListItemText primary="Manage Attendance" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                            onClick={() => setSelectedPage('reports')} // Set selected page to 'reports'
                        >
                            <ListItemText primary="View Reports" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            href="/settings"
                            sx={{ cursor: 'pointer', color: theme.palette.primary.contrastText }}
                        >
                            <ListItemText primary="System Settings" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <main className="admin-main" style={{ marginLeft: 300, padding: '10px' }}>
                {renderContent()}
            </main>
            {/* Conditionally render Footer */}
            {selectedPage !== 'attendance' && <Footer />}
        </div>
        </>
    );
};

export default Admin;
