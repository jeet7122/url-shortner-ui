import React from 'react';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler
} from "chart.js";

ChartJS.register(
    BarElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    Legend,
    Filler
);

const NEON_COLOR = '#00eaff';
const FONT_COLOR = '#e5e7eb';
const AXIS_COLOR = '#a1a1aa';
const GRID_COLOR_X = 'rgba(55, 65, 81, 0.15)';
const GRID_COLOR_Y = 'rgba(55, 65, 81, 0.4)';

const Graph = ({ graphData }) => {
    const hasData = graphData && graphData.length > 0;

    // Labels and dataset values
    const labels = hasData ? graphData.map(item => item.clickDate) : Array(10).fill('');
    const values = hasData ? graphData.map(item => item.count) : Array(10).fill(0);

    const data = {
        labels,
        datasets: [
            {
                label: "Total Clicks",
                data: values,
                backgroundColor: hasData ? 'rgba(0, 234, 255, 0.65)' : 'rgba(107, 114, 128, 0.3)', // faded gray if no data
                borderColor: hasData ? NEON_COLOR : 'rgba(107, 114, 128, 0.5)',
                borderWidth: 2,
                borderRadius: 6,
                hoverBackgroundColor: hasData ? NEON_COLOR : 'rgba(107, 114, 128, 0.5)',
                fill: true,
                tension: 0.4,
                maxBarThickness: 30,
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: FONT_COLOR,
                    font: { size: 14, weight: 'bold' }
                }
            },
            tooltip: {
                enabled: hasData, // disable tooltip if no data
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
                titleColor: NEON_COLOR,
                bodyColor: FONT_COLOR,
                borderColor: NEON_COLOR,
                borderWidth: 1,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: GRID_COLOR_Y, borderColor: 'transparent' },
                ticks: { color: AXIS_COLOR },
                title: {
                    display: true,
                    text: "Number of Clicks",
                    color: FONT_COLOR,
                    font: { size: 16, weight: "bold" }
                }
            },
            x: {
                grid: { color: GRID_COLOR_X, borderColor: 'transparent' },
                ticks: { color: AXIS_COLOR },
                title: {
                    display: true,
                    text: "Date",
                    color: FONT_COLOR,
                    font: { size: 16, weight: "bold" }
                },
            },
        },
        elements: {
            bar: {
                borderSkipped: false,
            }
        },
        layout: {
            padding: 10
        }
    };

    return <Bar data={data} options={options} className={`transition-opacity duration-500 ${hasData ? 'opacity-100' : 'opacity-40'}`} />;
};

export default Graph;
