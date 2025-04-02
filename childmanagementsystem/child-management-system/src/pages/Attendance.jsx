import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@mui/material'; // Import LinearProgress

const Attendance = () => {
    const [attendanceList, setAttendanceList] = useState([]); // State to store attendance records
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [selectedRecord, setSelectedRecord] = useState(null); // State to store selected record for viewing
    const [isLoading, setIsLoading] = useState(false); // State to manage progress bar visibility

    const handleMarkAttendance = (record) => {
        setAttendanceList([...attendanceList, record]); // Add new attendance record
        setIsDialogOpen(false); // Close the dialog after submission
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
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
                            const record = {
                                name: formData.get('name'),
                                date: formData.get('date'),
                                status: formData.get('status'),
                            };
                            handleMarkAttendance(record);
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" name="date" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" required>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                            </select>
                        </div>
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
