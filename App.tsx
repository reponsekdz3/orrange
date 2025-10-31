
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { MyBookings } from './components/MyBookings';
import { AccountPage } from './components/AccountPage';
import { BusTrackingMap } from './components/BusTrackingMap';
import { CompaniesPage } from './components/CompaniesPage';
import { CompanyDetail } from './components/CompanyDetail';
import type { Page, Booking, Bus, Seat, Company } from './types';
import { BOOKINGS as initialBookings, BUSES } from './constants';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('dashboard');
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [trackingBooking, setTrackingBooking] = useState<Booking | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const handleNavigate = (newPage: Page) => {
        setPage(newPage);
    };

    const handleBook = (bus: Bus, seats: Seat[]) => {
        const newBooking: Booking = {
            id: `B${Date.now()}`,
            bus,
            seats,
            bookingDate: new Date().toISOString(),
            status: 'Confirmed'
        };
        setBookings(prev => [newBooking, ...prev]);
        // Update booked status on the main bus list for UI consistency
        seats.forEach(bookedSeat => {
            const busToUpdate = BUSES.find(b => b.id === bus.id);
            if (busToUpdate) {
                const seatToUpdate = busToUpdate.seats.find(s => s.id === bookedSeat.id);
                if (seatToUpdate) {
                    seatToUpdate.isBooked = true;
                }
            }
        });
        alert(`Booking confirmed for ${seats.length} seat(s) on ${bus.operator}!`);
        setPage('my-bookings');
    };

    const handleTrackBus = (booking: Booking) => {
        setTrackingBooking(booking);
        setPage('tracking');
    }

    const handleCancelBooking = (bookingId: string) => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    };
    
    const handleRateBooking = (bookingId: string, rating: number) => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, userRating: rating } : b));
    }

    const handleSelectCompany = (company: Company) => {
        setSelectedCompany(company);
        setPage('company-detail');
    }

    const renderPage = () => {
        switch (page) {
            case 'dashboard':
                return <Dashboard onBook={handleBook} />;
            case 'my-bookings':
                return <MyBookings bookings={bookings} onTrackBus={handleTrackBus} onCancelBooking={handleCancelBooking} />;
            case 'companies':
                return <CompaniesPage onSelectCompany={handleSelectCompany} />;
            case 'account':
                return <AccountPage bookings={bookings} onRateBooking={handleRateBooking} />;
            case 'tracking':
                if (trackingBooking) {
                    return <BusTrackingMap booking={trackingBooking} onBack={() => setPage('my-bookings')} />;
                }
                return null;
            case 'company-detail':
                 if (selectedCompany) {
                    return <CompanyDetail company={selectedCompany} onBack={() => setPage('companies')} />;
                }
                return null;
            default:
                return <Dashboard onBook={handleBook} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Header activePage={page} onNavigate={handleNavigate} />
            <main className="container mx-auto px-4 pb-8">
                {renderPage()}
            </main>
        </div>
    );
};

export default App;
