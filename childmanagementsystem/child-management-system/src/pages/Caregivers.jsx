import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Form from '../components/Form';

const Caregivers = () => {
    const [caregiversList, setCaregiversList] = useState([]); // State to store registered caregivers
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [selectedCaregiver, setSelectedCaregiver] = useState(null); // State to store selected caregiver for viewing
    const [isLoading, setIsLoading] = useState(false); // State to manage progress bar visibility

    const handleFormSubmit = (caregiverData) => {
        setCaregiversList([...caregiversList, caregiverData]); // Add new caregiver to the list
        setIsDialogOpen(false); // Close the dialog after submission
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
        setCaregiversList(caregiversList.filter((caregiver, index) => index + 1 !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'experience', headerName: 'Experience (Years)', width: 150 },
        { field: 'specialization', headerName: 'Specialization', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
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
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
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
    }));

    return (
        <div>
            <Navbar />
            <main className="caregivers-main">
                <div className="caregivers-container">
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
                    <div className="data-grid-container">
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
                    </div>
                </div>
            </main>
            <Footer />
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Add New Caregiver</DialogTitle>
                <DialogContent>
                    <Form 
                        onSubmit={handleFormSubmit} 
                        initialData={{}} 
                        labels={{
                            name: "Caregiver's Name",
                            yearOfBirth: "Year of Joining",
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
                        <LinearProgress /> // Show progress bar while loading
                    ) : (
                        selectedCaregiver && (
                            <div>
                                <Typography variant="body1"><strong>Name:</strong> {selectedCaregiver.name}</Typography>
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
        </div>
    );
};

export default Caregivers;
