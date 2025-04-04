import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box, Typography } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Reports = () => {
    const [caregivers, setCaregivers] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const storedCaregivers = localStorage.getItem('registeredCaregivers');
        if (storedCaregivers) {
            setCaregivers(JSON.parse(storedCaregivers)); // Load caregivers from local storage
        }

        const storedAttendance = localStorage.getItem('attendanceRecords');
        if (storedAttendance) {
            setAttendanceList(JSON.parse(storedAttendance)); // Load attendance records from local storage
        }

        const storedActivities = localStorage.getItem('childActivities');
        if (storedActivities) {
            setActivities(JSON.parse(storedActivities)); // Load activities from local storage
        }
    }, []);

    const calculateCaregiverPerformance = () => {
        if (!caregivers.length || !activities.length) return []; // Ensure data exists

        return caregivers.map((caregiver) => {
            const caregiverActivities = activities.filter(
                (activity) => activity.caregiverId === caregiver.id
            ).length;

            return {
                name: caregiver.name,
                performanceScore: caregiverActivities, // Performance score based on activity count
            };
        });
    };

    const caregiverPerformance = calculateCaregiverPerformance();

    const attendanceData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Attendance Trends',
                data: [85, 90, 80, 95, 88],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const caregiverPerformanceData = {
        labels: caregiverPerformance.map((caregiver) => caregiver.name), // Use caregiver names dynamically
        datasets: [
            {
                label: 'Performance Score (Activities)',
                data: caregiverPerformance.map((caregiver) => caregiver.performanceScore), // Use calculated scores
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
            },
        ],
    };

    const childActivityData = {
        labels: ['Reading', 'Drawing', 'Sports', 'Music'],
        datasets: [
            {
                label: 'Activity Distribution',
                data: [30, 20, 25, 25],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
            },
        ],
    };

    return (
        <div>
            <Navbar />
            <main className="reports-main">
                <Box sx={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Reports
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        View attendance trends, caregiver performance, and child activity reports.
                    </Typography>

                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Attendance Trends
                        </Typography>
                        <Line data={attendanceData} />
                    </Box>

                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Caregiver Performance
                        </Typography>
                        {caregiverPerformance.length > 0 ? (
                            <Bar data={caregiverPerformanceData} />
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No caregiver activities recorded yet.
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Child Activity Distribution
                        </Typography>
                        <Pie data={childActivityData} />
                    </Box>
                </Box>
            </main>
            
        </div>
    );
};

export default Reports;
