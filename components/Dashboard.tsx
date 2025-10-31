
import React, { useState } from 'react';
import { SearchSection } from './SearchSection';
import { BusList } from './BusList';
import { BUSES } from '../constants';
import type { Bus, Seat } from '../types';

interface DashboardProps {
    onBook: (bus: Bus, seats: Seat[]) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBook }) => {
    const [filteredBuses, setFilteredBuses] = useState<Bus[]>(BUSES.filter(b => b.from === 'Kigali' && b.to === 'Musanze'));

    const handleSearch = (from: string, to: string, date: string) => {
        // In a real app, you'd fetch this data. Here we filter the mock data.
        console.log(`Searching for buses from ${from} to ${to} on ${date}`);
        const results = BUSES.filter(bus => bus.from === from && bus.to === to);
        setFilteredBuses(results);
    };

    return (
        <div>
            <SearchSection onSearch={handleSearch} />
            <BusList buses={filteredBuses} onBook={onBook} />
        </div>
    );
};
