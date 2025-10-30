import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { Dashboard } from './components/Dashboard';
import { MyBookings } from './components/MyBookings';
import { BusList } from './components/BusList';
import { BookingModal } from './components/BookingModal';
import { MOCK_BUSES } from './constants';
import type { Bus, Booking, SearchParams, Seat } from './types';
import { View } from './types';

const BOOKINGS_STORAGE_KEY = 'orrange-bookings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.SEARCH);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchResults, setSearchResults] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    // Load bookings from local storage on initial render
    try {
      const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error("Failed to load bookings from local storage", error);
    }
  }, []);

  const handleSearch = useCallback((params: SearchParams) => {
    // Simulate API call
    const results = MOCK_BUSES.filter(bus => 
      bus.from.toLowerCase() === params.from.toLowerCase() &&
      bus.to.toLowerCase() === params.to.toLowerCase()
    );
    setSearchResults(results);
  }, []);

  const handleBookNow = useCallback((bus: Bus, seats: Seat[]) => {
    setSelectedBus(bus);
    setSelectedSeats(seats);
  }, []);

  const handleConfirmBooking = useCallback((passengerName: string, passengerContact: string) => {
    if (!selectedBus || selectedSeats.length === 0) return;

    const newBooking: Booking = {
      id: `OR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      bus: selectedBus,
      seats: selectedSeats,
      passengerName,
      passengerContact,
      bookingDate: new Date().toISOString(),
      status: 'Confirmed',
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    
    try {
      // Save updated bookings to local storage
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
    } catch (error) {
      console.error("Failed to save bookings to local storage", error);
    }
    
    // Update bus availability in mock data
    const busIndex = MOCK_BUSES.findIndex(b => b.id === selectedBus.id);
    if(busIndex !== -1) {
        selectedSeats.forEach(seat => {
            const seatToUpdate = MOCK_BUSES[busIndex].seats.find(s => s.id === seat.id);
            if(seatToUpdate) seatToUpdate.isBooked = true;
        });
    }

    setSelectedBus(null);
    setSelectedSeats([]);
    alert(`Booking successful! Your booking ID is ${newBooking.id}`);
    setCurrentView(View.BOOKINGS);
  }, [selectedBus, selectedSeats, bookings]);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard />;
      case View.BOOKINGS:
        return <MyBookings bookings={bookings} />;
      case View.SEARCH:
      default:
        return (
          <>
            <SearchSection onSearch={handleSearch} />
            <BusList buses={searchResults} onBookNow={handleBookNow} />
          </>
        );
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen font-sans text-gray-800">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      {selectedBus && (
        <BookingModal
          bus={selectedBus}
          selectedSeats={selectedSeats}
          onClose={() => { setSelectedBus(null); setSelectedSeats([]); }}
          onConfirmBooking={handleConfirmBooking}
        />
      )}
    </div>
  );
}