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

    const handleFormSubmit = (childData) => {
        setChildrenList([...childrenList, childData]); // Add new child to the list
        setIsDialogOpen(false); // Close the dialog after submission
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'yearOfBirth', headerName: 'Year of Birth', width: 150 },
        { field: 'parentName', headerName: 'Parent Name', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
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
            <main>
                <Box sx={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Children Management
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Manage the details of children enrolled in the daycare. Add, update, or view their profiles.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />} // Adding the Material UI Add icon
                        onClick={() => setIsDialogOpen(true)}
                        sx={{ marginBottom: '20px' }}
                    >
                        Add New
                    </Button>
                    <Box sx={{ height: 400, marginTop: '20px' }}>
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
                    </Box>
                </Box>
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
        </div>
    );
};

export default Children;
