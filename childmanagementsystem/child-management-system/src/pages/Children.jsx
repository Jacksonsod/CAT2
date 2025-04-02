import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Importing Material UI Add icon
import Form from '../components/Form';

const Children = () => {
    const [childrenList, setChildrenList] = useState([]); // State to store registered children
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [selectedChild, setSelectedChild] = useState(null); // State to store selected child for viewing

    const handleFormSubmit = (childData) => {
        setChildrenList([...childrenList, childData]); // Add new child to the list
        setIsDialogOpen(false); // Close the dialog after submission
    };

    const handleView = (child) => {
        setSelectedChild(child); // Set the selected child
    };

    const handleCloseViewDialog = () => {
        setSelectedChild(null); // Clear the selected child
    };

    const handleDelete = (id) => {
        setChildrenList(childrenList.filter((child, index) => index + 1 !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'yearOfBirth', headerName: 'Year of Birth', width: 150 },
        { field: 'parentName', headerName: 'Parent Name', width: 150 },
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

    const rows = childrenList.map((child, index) => ({
        id: index + 1,
        name: child.name,
        yearOfBirth: child.yearOfBirth,
        parentName: child.parentName,
        contact: child.contact,
    }));

    return (
        <div>
            <Navbar />
            <main className="children-main">
                <div className="children-container">
                    <Typography variant="h4" gutterBottom>
                        Children Management
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Manage the details of children enrolled in the daycare. Add, update, or view their profiles.
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
                            Registered Children
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
                <DialogTitle>Add New Child</DialogTitle>
                <DialogContent>
                    <Form onSubmit={handleFormSubmit} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={!!selectedChild} onClose={handleCloseViewDialog}>
                <DialogTitle>Child Details</DialogTitle>
                <DialogContent>
                    {selectedChild && (
                        <div>
                            <Typography variant="body1"><strong>Name:</strong> {selectedChild.name}</Typography>
                            <Typography variant="body1"><strong>Year of Birth:</strong> {selectedChild.yearOfBirth}</Typography>
                            <Typography variant="body1"><strong>Parent Name:</strong> {selectedChild.parentName}</Typography>
                            <Typography variant="body1"><strong>Contact:</strong> {selectedChild.contact}</Typography>
                            <Typography variant="body1"><strong>Address:</strong> {selectedChild.address}</Typography>
                            <Typography variant="body1"><strong>Allergies:</strong> {selectedChild.allergies || "None"}</Typography>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Children;
