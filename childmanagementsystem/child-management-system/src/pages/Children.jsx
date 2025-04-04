import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Importing Material UI Add icon
import Form from '../components/Form';
import { Bar, Pie } from 'react-chartjs-2'; // Import Bar and Pie chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Children = () => {
    const [childrenList, setChildrenList] = useState(() => {
        const storedChildren = localStorage.getItem('registeredChildren');
        return storedChildren ? JSON.parse(storedChildren) : [];
    }); // Load registered children from local storage

    const [activities, setActivities] = useState(() => {
        const storedActivities = localStorage.getItem('childActivities');
        return storedActivities ? JSON.parse(storedActivities) : [];
    }); // Load activities from local storage

    const [caregivers, setCaregivers] = useState(() => {
        const storedCaregivers = localStorage.getItem('caregivers');
        return storedCaregivers ? JSON.parse(storedCaregivers) : [];
    }); // Load caregivers from local storage

    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false); // State to manage activity dialog visibility
    const [selectedChild, setSelectedChild] = useState(null); // State to store selected child for viewing
    const [activityInputs, setActivityInputs] = useState([{ caregiverId: '', description: '' }]); // State to manage multiple activities

    useEffect(() => {
        localStorage.setItem('registeredChildren', JSON.stringify(childrenList)); // Save children to local storage
    }, [childrenList]);

    useEffect(() => {
        const storedActivities = localStorage.getItem('childActivities');
        if (storedActivities) {
            const parsedActivities = JSON.parse(storedActivities).map((activity) => ({
                ...activity,
                caregiverId: parseInt(activity.caregiverId), // Ensure caregiverId is stored as a number
            }));
            setActivities(parsedActivities);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('childActivities', JSON.stringify(activities)); // Save activities to local storage
    }, [activities]);

    useEffect(() => {
        const storedCaregivers = localStorage.getItem('caregivers');
        if (storedCaregivers) {
            const parsedCaregivers = JSON.parse(storedCaregivers).map((caregiver) => ({
                ...caregiver,
                id: parseInt(caregiver.id), // Ensure caregiver id is stored as a number
            }));
            setCaregivers(parsedCaregivers);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('caregivers', JSON.stringify(caregivers)); // Save caregivers to local storage
    }, [caregivers]);

    const handleFormSubmit = (childData) => {
        setChildrenList([...childrenList, childData]); // Add new child to the list
        setIsDialogOpen(false); // Close the dialog after submission
    };

    const handleAddActivity = (activity) => {
        setActivities([...activities, activity]); // Add new activity to the list
        setIsActivityDialogOpen(false); // Close the dialog after submission
    };

    const handleAddActivityInput = () => {
        setActivityInputs([...activityInputs, { caregiverId: '', description: '' }]); // Add a new activity input
    };

    const handleRemoveActivityInput = (index) => {
        const updatedInputs = activityInputs.filter((_, i) => i !== index);
        setActivityInputs(updatedInputs); // Remove an activity input
    };

    const handleActivityChange = (index, field, value) => {
        const updatedInputs = [...activityInputs];
        updatedInputs[index][field] = value;
        setActivityInputs(updatedInputs); // Update specific activity input
    };

    const handleAddActivities = (e) => {
        e.preventDefault();

        // Validate caregiver selection
        const isValid = activityInputs.every((input) => input.caregiverId !== '');
        if (!isValid) {
            alert('Please select a caregiver for all activities.');
            return;
        }

        const newActivities = activityInputs.map((input) => ({
            caregiverId: parseInt(input.caregiverId),
            description: input.description,
        }));
        setActivities([...activities, ...newActivities]); // Add all new activities to the list
        setActivityInputs([{ caregiverId: '', description: '' }]); // Reset inputs
        setIsActivityDialogOpen(false); // Close the dialog
    };

    const handleView = (child) => {
        setSelectedChild(child); // Set the selected child
    };

    const handleCloseViewDialog = () => {
        setSelectedChild(null); // Clear the selected child
    };

    const handleDelete = (id) => {
        const updatedList = childrenList.filter((child, index) => index + 1 !== id);
        setChildrenList(updatedList); // Update the list and local storage
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

    const calculateYearlyAverage = () => {
        const yearCounts = childrenList.reduce((acc, child) => {
            acc[child.yearOfBirth] = (acc[child.yearOfBirth] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(yearCounts);
        const data = Object.values(yearCounts);

        return { labels, data };
    };

    const { labels, data } = calculateYearlyAverage();

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Number of Children',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Average Number of Children Registered Per Year',
            },
        },
    };

    const calculateActivityDistribution = () => {
        const activityCounts = activities.reduce((acc, activity) => {
            acc[activity.description] = (acc[activity.description] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(activityCounts);
        const data = Object.values(activityCounts);

        return { labels, data };
    };

    const { labels: activityLabels, data: activityData } = calculateActivityDistribution();

    const activityChartData = {
        labels: activityLabels,
        datasets: [
            {
                label: 'Activities Distribution',
                data: activityData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

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
                        Add New Child
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Bar data={chartData} options={chartOptions} />
                        </Grid>
                        <Grid item xs={8}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom>
                                Activity Management
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setIsActivityDialogOpen(true)}
                                style={{ marginBottom: '20px' }}
                            >
                                Add Activity
                            </Button>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography variant="h6" gutterBottom>
                                        Activity Summary
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Total Activities: {activities.length}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Pie data={activityChartData} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
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
            <Dialog open={isActivityDialogOpen} onClose={() => setIsActivityDialogOpen(false)}>
                <DialogTitle>Add Activities</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleAddActivities}
                        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                        {activityInputs.map((input, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <TextField
                                    select
                                    id={`caregiverId-${index}`}
                                    name={`caregiverId-${index}`}
                                    label="Select Caregiver"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={input.caregiverId}
                                    onChange={(e) =>
                                        handleActivityChange(index, 'caregiverId', parseInt(e.target.value)) // Ensure caregiverId is stored as a number
                                    }
                                    error={!input.caregiverId} // Highlight error if caregiver is not selected
                                    helperText={!input.caregiverId ? 'Caregiver is required' : ''} // Show error message
                                >
                                    {caregivers.length > 0 ? (
                                        caregivers.map((caregiver) => (
                                            <MenuItem key={caregiver.id} value={caregiver.id}>
                                                {caregiver.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No caregivers available</MenuItem>
                                    )}
                                </TextField>
                                <TextField
                                    id={`description-${index}`}
                                    name={`description-${index}`}
                                    label="Activity Description"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={input.description}
                                    onChange={(e) =>
                                        handleActivityChange(index, 'description', e.target.value)
                                    }
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleRemoveActivityInput(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddActivityInput}
                            style={{ alignSelf: 'flex-start' }}
                        >
                            Add Another Activity
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save Activities
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsActivityDialogOpen(false)} color="secondary">
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
