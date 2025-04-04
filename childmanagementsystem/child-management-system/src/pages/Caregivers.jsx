import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Form from '../components/Form';
import Navbar from '../components/Navbar'; // Import Navbar
import { Bar } from 'react-chartjs-2'; // Import Bar chart for histogram
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Caregivers = () => {
    const [caregiversList, setCaregiversList] = useState(() => {
        const storedCaregivers = localStorage.getItem('caregivers');
        return storedCaregivers ? JSON.parse(storedCaregivers) : [];
    }); // Load caregivers from local storage
    const [childrenList, setChildrenList] = useState([]); // State to store children list
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [selectedCaregiver, setSelectedCaregiver] = useState(null); // State to store selected caregiver for viewing
    const [isLoading, setIsLoading] = useState(false); // State to manage progress bar visibility
    const [selectedChild, setSelectedChild] = useState(''); // State to store selected child for assignment
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State to manage edit dialog visibility
    const [editCaregiver, setEditCaregiver] = useState(null); // State to store caregiver being edited
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to manage delete confirmation dialog
    const [caregiverToDelete, setCaregiverToDelete] = useState(null); // State to store caregiver to delete

    // Load children from localStorage on component mount
    useEffect(() => {
        const storedChildren = JSON.parse(localStorage.getItem('children')) || [];
        setChildrenList(storedChildren);
    }, []);

    // Save caregivers to localStorage whenever the list changes
    useEffect(() => {
        localStorage.setItem('caregivers', JSON.stringify(caregiversList));
    }, [caregiversList]);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole'); // Assume user role is stored in localStorage
        setIsAdmin(userRole === 'admin'); // Set isAdmin to true if the user role is 'admin'
    }, []);

    const handleFormSubmit = (caregiverData) => {
        const newCaregiver = { ...caregiverData, id: uuidv4(), assignChild: selectedChild }; // Assign a unique ID
        setCaregiversList([...caregiversList, newCaregiver]); // Add new caregiver to the list
        setIsDialogOpen(false); // Close the dialog after submission
        setSelectedChild(''); // Reset selected child
    };

    const handleView = (caregiver) => {
        setIsLoading(true); // Show progress bar
        setTimeout(() => {
            setSelectedCaregiver(caregiver); // Set the selected caregiver after a delay
            setIsLoading(false); // Hide progress bar
        }, 1000); // Simulate loading time
    };

    const handleCloseViewDialog = () => {
        setSelectedCaregiver(null); // Clear the selected caregiver
    };

    const handleOpenDeleteDialog = (caregiver) => {
        setCaregiverToDelete(caregiver); // Set the caregiver to delete
        setIsDeleteDialogOpen(true); // Open the delete confirmation dialog
    };

    const handleConfirmDelete = () => {
        const updatedList = caregiversList.filter((caregiver) => caregiver.id !== caregiverToDelete.id);
        setCaregiversList(updatedList); // Update the list after deletion
        setIsDeleteDialogOpen(false); // Close the dialog
        setCaregiverToDelete(null); // Clear the caregiver to delete
    };

    const handleEdit = (caregiver) => {
        setEditCaregiver(caregiver); // Set the caregiver to be edited
        setIsEditDialogOpen(true); // Open the edit dialog
    };

    const handleEditSubmit = (updatedCaregiver) => {
        const updatedList = caregiversList.map((caregiver) =>
            caregiver.id === updatedCaregiver.id ? updatedCaregiver : caregiver
        );
        setCaregiversList(updatedList); // Update the caregivers list
        setIsEditDialogOpen(false); // Close the edit dialog
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'supervisor', headerName: 'Supervisor', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'assignChild', headerName: 'Assigned Child', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleView(params.row)}
                        style={{ marginRight: '10px' }}
                    >
                        View
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenDeleteDialog(params.row)}
                        style={{ marginRight: '10px' }}
                    >
                        Delete
                    </Button>
                    {isAdmin && ( // Show the Edit button only if the user is an admin
                        <Button
                            variant="outlined"
                            color="info"
                            onClick={() => handleEdit(params.row)}
                        >
                            Edit
                        </Button>
                    )}
                </>
            ),
        },
    ];

    const rows = caregiversList.map((caregiver, index) => ({
        id: index + 1,
        name: caregiver.name,
        supervisor: caregiver.parentName || 'N/A', // Display supervisor's name or 'N/A' if not available
        contact: caregiver.contact,
        assignChild: caregiver.assignChild || 'None',
    })); // Ensure the object and map function are properly closed

    const calculateActivitiesPerCaregiver = () => {
        const storedActivities = localStorage.getItem('childActivities');
        const activities = storedActivities ? JSON.parse(storedActivities) : [];
        return caregiversList.map((caregiver) => {
            const activityCount = activities.filter(
                (activity) => activity.caregiverId === caregiver.id
            ).length;
            return { name: caregiver.name, activityCount };
        });
    };

    const activitiesPerCaregiver = calculateActivitiesPerCaregiver();

    const histogramData = {
        labels: activitiesPerCaregiver.map((caregiver) => caregiver.name),
        datasets: [
            {
                label: 'Activity Count',
                data: activitiesPerCaregiver.map((caregiver) => caregiver.activityCount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const histogramOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Histogram of Activities Per Caregiver',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Caregivers',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Activities',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <Navbar />
            <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    Caregivers Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setIsDialogOpen(true)}
                    sx={{ marginBottom: '20px', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
                >
                    Add New
                </Button>
                <Box sx={{ marginTop: '20px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        Registered Caregivers
                    </Typography>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                        sx={{
                            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f1f1f1', fontWeight: 'bold' },
                            '& .MuiDataGrid-row:hover': { backgroundColor: '#f5f5f5' },
                            '& .MuiTablePagination-toolbar': { justifyContent: 'center' }, // Center rows per page selector
                        }}
                    />
                </Box>
                <Box sx={{ marginTop: '40px', backgroundColor: '#ffffff', padding: '10px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                   
                    <Bar data={histogramData} options={histogramOptions} />
                </Box>
                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <DialogTitle sx={{ backgroundColor: '#3f51b5', color: '#ffffff' }}>Add New Caregiver</DialogTitle>
                    <DialogContent>
                        <Form 
                            onSubmit={handleFormSubmit} 
                            initialData={{}} 
                            labels={{
                                name: "Caregiver's Name",
                                parentName: "Supervisor's Name",
                                parentId: "Supervisor ID",
                                contact: "Phone Number",
                                email: "Email",
                                address: "Address",
                                allergies: "Special Skills (if any)"
                            }}
                            legends={{
                                personalInfo: "Caregiver Information",
                                supervisorInfo: "Supervisor Information",
                                additionalInfo: "Additional Information",
                                photo: "Caregiver's Photo"
                            }}
                        />
                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <InputLabel id="child-select-label">Assign Child</InputLabel>
                            <Select
                                labelId="child-select-label"
                                value={selectedChild}
                                onChange={(e) => setSelectedChild(e.target.value)}
                            >
                                {childrenList.map((child, index) => (
                                    <MenuItem key={index} value={child.name}>
                                        {child.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={!!selectedCaregiver} onClose={handleCloseViewDialog}>
                    <DialogTitle sx={{ backgroundColor: '#3f51b5', color: '#ffffff' }}>Caregiver Details</DialogTitle>
                    <DialogContent>
                        {isLoading ? (
                            <LinearProgress />
                        ) : (
                            selectedCaregiver && (
                                <Box sx={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                    <Typography variant="body1"><strong>Name:</strong> {selectedCaregiver.name}</Typography>
                                    <Typography variant="body1"><strong>Assign Child:</strong> {selectedCaregiver.assignChild || 'None'}</Typography>
                                    <Typography variant="body1"><strong>Supervisor:</strong> {selectedCaregiver.parentName}</Typography>
                                    <Typography variant="body1"><strong>Contact:</strong> {selectedCaregiver.contact}</Typography>
                                </Box>
                            )
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseViewDialog} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
                    <DialogTitle sx={{ backgroundColor: '#3f51b5', color: '#ffffff' }}>Edit Caregiver</DialogTitle>
                    <DialogContent>
                        <Form
                            onSubmit={handleEditSubmit}
                            initialData={editCaregiver}
                            labels={{
                                name: "Caregiver's Name",
                                experience: 'Experience (Years)',
                                contact: 'Phone Number',
                                assignChild: 'Assigned Child',
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete caregiver{' '}
                            <strong>{caregiverToDelete?.name}</strong>?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDeleteDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default Caregivers;

