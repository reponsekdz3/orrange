
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { MyBookings } from './components/MyBookings';
import { BusTrackingMap } from './components/BusTrackingMap';
import { CompaniesPage } from './components/CompaniesPage';
import { AccountPage } from './components/AccountPage';
import { BookingModal } from './components/BookingModal';
import { BUS_DATA, MOCK_BOOKINGS, COMPANIES_DATA } from './constants';
import type { Page, Bus, Seat, Booking } from './types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
    const [buses, setBuses] = useState<Bus[]>(BUS_DATA);
    
    // State for booking flow
    const [bookingInfo, setBookingInfo] = useState<{ bus: Bus; seats: Seat[] } | null>(null);

    // State for bus tracking
    const [trackedBooking, setTrackedBooking] = useState<Booking | null>(null);

    const handleNavigate = (page: Page) => {
        setTrackedBooking(null); // Reset tracking when navigating
        setCurrentPage(page);
    };

    const handleBookNow = (bus: Bus, selectedSeats: Seat[]) => {
        setBookingInfo({ bus, seats: selectedSeats });
    };

    const handleConfirmBooking = () => {
        if (!bookingInfo) return;

        const newBooking: Booking = {
            id: `booking-${Date.now()}`,
            bus: bookingInfo.bus,
            seats: bookingInfo.seats,
            totalPrice: bookingInfo.bus.price * bookingInfo.seats.length,
            bookingDate: new Date().toISOString(),
            status: 'Confirmed',
        };

        setBookings(prev => [...prev, newBooking]);

        // Update bus seats to be booked
        setBuses(prevBuses => prevBuses.map(bus => {
            if (bus.id === bookingInfo.bus.id) {
                const newSeats = bus.seats.map(seat => {
                    if (bookingInfo.seats.find(s => s.id === seat.id)) {
                        return { ...seat, isBooked: true };
                    }
                    return seat;
                });
                return { ...bus, seats: newSeats };
            }
            return bus;
        }));

        setBookingInfo(null);
        alert('Itike yawe yemejwe neza!');
        setCurrentPage('my-bookings');
    };
    
    const handleRateBooking = (bookingId: string, rating: number) => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, userRating: rating } : b));
    };

    const handleTrackBus = (booking: Booking) => {
        setTrackedBooking(booking);
        setCurrentPage('bus-tracking');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard buses={buses} onBookNow={handleBookNow} />;
            case 'my-bookings':
                return <MyBookings bookings={bookings} onTrackBus={handleTrackBus} />;
            case 'bus-tracking':
                if (trackedBooking) {
                    return <BusTrackingMap booking={trackedBooking} onBack={() => handleNavigate('my-bookings')} />;
                }
                // Fallback if no booking is being tracked
                handleNavigate('my-bookings');
                return null;
            case 'companies':
                return <CompaniesPage companies={COMPANIES_DATA} />;
            case 'account':
                return <AccountPage bookings={bookings} onRateBooking={handleRateBooking} />;
            default:
                return <Dashboard buses={buses} onBookNow={handleBookNow} />;
        }
    };

    return (
        <div className="bg-orange-50 min-h-screen font-sans">
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {renderPage()}
            </main>
            {bookingInfo && (
                <BookingModal
                    bus={bookingInfo.bus}
                    selectedSeats={bookingInfo.seats}
                    onConfirm={handleConfirmBooking}
                    onClose={() => setBookingInfo(null)}
                />
            )}
        </div>
    );
};

export default App;
