import React from 'react';
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
    // Sample data for charts
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
        labels: ['Caregiver A', 'Caregiver B', 'Caregiver C', 'Caregiver D'],
        datasets: [
            {
                label: 'Performance Score',
                data: [75, 85, 90, 80],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
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
                        <Bar data={caregiverPerformanceData} />
                    </Box>

                    <Box sx={{ marginTop: '40px' }}>
                        <Typography variant="h5" gutterBottom>
                            Child Activity Distribution
                        </Typography>
                        <Pie data={childActivityData} />
                    </Box>
                </Box>
            </main>
            <Footer />
        </div>
    );
};

export default Reports;
