import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, Grid } from '@mui/material'; // Import Grid

const Attendance = () => {
    const [attendanceList, setAttendanceList] = useState([]); // State to store attendance records
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [selectedRecord, setSelectedRecord] = useState(null); // State to store selected record for viewing
    const [isLoading, setIsLoading] = useState(false); // State to manage progress bar visibility
    const [registeredChildren, setRegisteredChildren] = useState([]); // State to store registered children
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State to manage edit dialog visibility
    const [recordToEdit, setRecordToEdit] = useState(null); // State to store the record being edited

    useEffect(() => {
        const storedChildren = localStorage.getItem('registeredChildren');
        if (storedChildren) {
            setRegisteredChildren(JSON.parse(storedChildren)); // Load registered children from local storage
        }
    }, []);

    const handleMarkAttendance = (updatedAttendance) => {
        setAttendanceList(updatedAttendance); // Update attendance list
        setIsDialogOpen(false); // Close the dialog after submission
    };

    const handleEditAttendance = (record) => {
        setRecordToEdit(record); // Set the record to be edited
        setIsEditDialogOpen(true); // Open the edit dialog
    };

    const handleSaveEdit = (updatedRecord) => {
        setAttendanceList((prevList) =>
            prevList.map((record, index) =>
                index + 1 === updatedRecord.id ? { ...record, status: updatedRecord.status } : record
            )
        ); // Update the specific record in the attendance list by matching the ID
        setIsEditDialogOpen(false); // Close the edit dialog
    };

    const handleView = (record) => {
        setIsLoading(true); // Show progress bar
        setTimeout(() => {
            setSelectedRecord(record); // Set the selected record after a delay
            setIsLoading(false); // Hide progress bar
        }, 1000); // Simulate loading time
    };

    const handleCloseViewDialog = () => {
        setSelectedRecord(null); // Clear the selected record
    };

    const calculateAttendanceProgress = () => {
        const totalSessions = attendanceList.length;
        const attendedSessions = attendanceList.filter(record => record.status === 'Present').length;
        const absentSessions = totalSessions - attendedSessions;

        const attendedPercentage = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;
        const absentPercentage = totalSessions > 0 ? (absentSessions / totalSessions) * 100 : 0;

        return { attendedPercentage, absentPercentage };
    };

    const { attendedPercentage, absentPercentage } = calculateAttendanceProgress();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
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
                        onClick={() => handleEditAttendance(params.row)}
                    >
                        Edit
                    </Button>
                </>
            ),
        },
    ];

    const rows = attendanceList.map((record, index) => ({
        id: index + 1,
        name: record.name,
        date: record.date,
        status: record.status,
    }));

    return (
        <div>
            <Navbar />
            <main className="attendance-main">
                <div className="attendance-container">
                    <Typography variant="h4" gutterBottom>
                        Attendance Management
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Manage attendance records for children or caregivers. Mark, update, or view attendance.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsDialogOpen(true)}
                        className="add-button"
                    >
                        Mark Attendance
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom>
                                Attendance Progress
                            </Typography>
                            <Typography variant="body2">Present: {attendedPercentage.toFixed(1)}%</Typography>
                            <LinearProgress variant="determinate" value={attendedPercentage} color="primary" />
                            <Typography variant="body2" style={{ marginTop: '10px' }}>Absent: {absentPercentage.toFixed(1)}%</Typography>
                            <LinearProgress variant="determinate" value={absentPercentage} color="secondary" />
                        </Grid>
                        <Grid item xs={9}>
                            <div className="data-grid-container">
                                <Typography variant="h5" gutterBottom>
                                    Attendance Records
                                </Typography>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    checkboxSelection={false}
                                    disableSelectionOnClick
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </main>
            <Footer />
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Mark Attendance</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const updatedAttendance = registeredChildren.map((child) => ({
                                name: child.name,
                                date: new Date().toISOString().split('T')[0],
                                status: formData.get(`status-${child.id}`),
                            }));
                            handleMarkAttendance(updatedAttendance);
                        }}
                    >
                        {registeredChildren.map((child) => (
                            <div key={child.id} className="form-group">
                                <Typography variant="body1">{child.name}</Typography>
                                <label>
                                    <input
                                        type="radio"
                                        name={`status-${child.id}`}
                                        value="Present"
                                        required
                                    />
                                    Present
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    <input
                                        type="radio"
                                        name={`status-${child.id}`}
                                        value="Absent"
                                    />
                                    Absent
                                </label>
                            </div>
                        ))}
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
                <DialogTitle>Edit Attendance</DialogTitle>
                <DialogContent>
                    {recordToEdit && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const updatedRecord = {
                                    ...recordToEdit,
                                    status: formData.get('status'),
                                };
                                handleSaveEdit(updatedRecord);
                            }}
                        >
                            <Typography variant="body1"><strong>Name:</strong> {recordToEdit.name}</Typography>
                            <Typography variant="body1"><strong>Date:</strong> {recordToEdit.date}</Typography>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Present"
                                        defaultChecked={recordToEdit.status === 'Present'}
                                    />
                                    Present
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Absent"
                                        defaultChecked={recordToEdit.status === 'Absent'}
                                    />
                                    Absent
                                </label>
                            </div>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </form>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={!!selectedRecord} onClose={handleCloseViewDialog}>
                <DialogTitle>Attendance Details</DialogTitle>
                <DialogContent>
                    {isLoading ? (
                        <LinearProgress /> // Show progress bar while loading
                    ) : (
                        selectedRecord && (
                            <div>
                                <Typography variant="body1"><strong>Name:</strong> {selectedRecord.name}</Typography>
                                <Typography variant="body1"><strong>Date:</strong> {selectedRecord.date}</Typography>
                                <Typography variant="body1"><strong>Status:</strong> {selectedRecord.status}</Typography>
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

export default Attendance;
