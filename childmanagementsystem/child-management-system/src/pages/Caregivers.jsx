import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Form from '../components/Form';
import Navbar from '../components/Navbar'; // Import Navbar

const Caregivers = () => {
    const [caregiversList, setCaregiversList] = useState([]); // State to store registered caregivers
    const [childrenList, setChildrenList] = useState([]); // State to store children list
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [selectedCaregiver, setSelectedCaregiver] = useState(null); // State to store selected caregiver for viewing
    const [isLoading, setIsLoading] = useState(false); // State to manage progress bar visibility
    const [selectedChild, setSelectedChild] = useState(''); // State to store selected child for assignment
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State to manage edit dialog visibility
    const [editCaregiver, setEditCaregiver] = useState(null); // State to store caregiver being edited

    // Load caregivers and children from localStorage on component mount
    useEffect(() => {
        const storedCaregivers = JSON.parse(localStorage.getItem('caregivers')) || [];
        const storedChildren = JSON.parse(localStorage.getItem('children')) || [];
        setCaregiversList(storedCaregivers);
        setChildrenList(storedChildren);
    }, []);

    // Save caregivers to localStorage whenever the list changes
    useEffect(() => {
        localStorage.setItem('caregivers', JSON.stringify(caregiversList));
    }, [caregiversList]);

    const handleFormSubmit = (caregiverData) => {
        const newCaregiver = { ...caregiverData, assignChild: selectedChild }; // Add assign child to caregiver data
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

    const handleDelete = (id) => {
        const updatedList = caregiversList.filter((_, index) => index + 1 !== id);
        setCaregiversList(updatedList); // Update the list after deletion
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
        { field: 'experience', headerName: 'Experience (Years)', width: 150 },
        { field: 'specialization', headerName: 'Specialization', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'assignChild', headerName: 'Assigned Child', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
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
                        onClick={() => handleDelete(params.row.id)}
                        style={{ marginRight: '10px' }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>
                </>
            ),
        },
    ];

    const rows = caregiversList.map((caregiver, index) => ({
        id: index + 1,
        name: caregiver.name,
        experience: caregiver.experience,
        specialization: caregiver.specialization,
        contact: caregiver.contact,
        assignChild: caregiver.assignChild || 'None', // Correctly reference assignChild
    })); // Ensure the object and map function are properly closed

    return (
        <>
            <Navbar />
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Caregivers Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setIsDialogOpen(true)}
                    className="add-button"
                >
                    Add New
                </Button>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Registered Caregivers
                    </Typography>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </Box>
                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <DialogTitle>Add New Caregiver</DialogTitle>
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
                    <DialogTitle>Caregiver Details</DialogTitle>
                    <DialogContent>
                        {isLoading ? (
                            <LinearProgress />
                        ) : (
                            selectedCaregiver && (
                                <div>
                                    <Typography variant="body1"><strong>Name:</strong> {selectedCaregiver.name}</Typography>
                                    <Typography variant="body1"><strong>Assign Child:</strong> {selectedCaregiver.assignChild || 'None'}</Typography>
                                    <Typography variant="body1"><strong>Experience:</strong> {selectedCaregiver.experience} years</Typography>
                                    <Typography variant="body1"><strong>Specialization:</strong> {selectedCaregiver.specialization}</Typography>
                                    <Typography variant="body1"><strong>Contact:</strong> {selectedCaregiver.contact}</Typography>
                                </div>
                            )
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseViewDialog} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
                    <DialogTitle>Edit Caregiver</DialogTitle>
                    <DialogContent>
                        <Form
                            onSubmit={handleEditSubmit}
                            initialData={editCaregiver}
                            labels={{
                                name: "Caregiver's Name",
                                experience: 'Experience (Years)',
                                specialization: 'Specialization',
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
            </Box>
        </>
    );
};

export default Caregivers;

