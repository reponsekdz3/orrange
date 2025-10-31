
import React from 'react';
import type { Bus, Seat } from '../types';
import { SearchSection } from './SearchSection';
import { BusList } from './BusList';

interface DashboardProps {
    buses: Bus[];
    onBookNow: (bus: Bus, selectedSeats: Seat[]) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ buses, onBookNow }) => {
    const handleSearch = () => {
        // In a real app, this would trigger a new data fetch.
        // Here, we just log to the console and show an alert for demonstration.
        console.log('Searching for buses...');
        alert('Searching for buses from Kigali to Musanze...');
    }
    
    return (
        <div>
            <SearchSection onSearch={handleSearch} />
            <BusList buses={buses} onBookNow={onBookNow} />
        </div>
    );
};
