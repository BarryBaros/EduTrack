"use client";
import React from 'react';
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the data type for the chart data
interface ChartData {
    name: string;
    present: number;
    absent: number;
}

// Sample data for the chart
const data: ChartData[] = [
    { name: 'Monday', present: 100, absent:6},
    { name: 'Tuesday', present: 94, absent: 12 },
    { name: 'Wednesday', present: 102, absent: 4 },
    { name: 'Thursday', present: 80, absent: 26 },
    { name: 'Friday', present: 106, absent: 0 },
    { name: 'Saturday', present: 71, absent: 35 },
];

// Define the props for the custom tooltip
interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: ChartData; value: number }[];
}

// Custom tooltip component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-300 rounded-lg shadow-md p-3">
                <p className="font-semibold">{`Day: ${payload[0].payload.name}`}</p>
                <p>{`Present: ${payload[0].value}`}</p>
                <p>{`Absent: ${payload[1]?.value || 0}`}</p> {/* Ensure there are no unescaped characters */}
            </div>
        );
    }
    return null;
};

// Main AttendanceChart component
const AttendanceChart: React.FC = () => {
    return (
        <div className="bg-white rounded-lg p-4 h-full shadow-lg">
            <h1 className="font-medium text-lg mb-2">Attendance</h1>
            <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="present" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="absent" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="yellow" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AttendanceChart;
