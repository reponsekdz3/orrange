import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { AccountPage } from './components/AccountPage';
import { CompaniesPage } from './components/CompaniesPage';
import { MyBookings } from './components/MyBookings';
import { BusList } from './components/BusList';
import { BookingModal } from './components/BookingModal';
import { MOCK_BUSES, TRANSPORT_COMPANIES } from './constants';
import type { Bus, Booking, SearchParams, Seat } from './types';
import { View } from './types';

const BOOKINGS_STORAGE_KEY = 'safiri-bookings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.SEARCH);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchResults, setSearchResults] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
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
    // Simulate API call, now it can handle broader searches
    const results = MOCK_BUSES.filter(bus => 
      bus.from.toLowerCase().includes(params.from.toLowerCase()) &&
      bus.to.toLowerCase().includes(params.to.toLowerCase())
    );
    setSearchResults(results);
    setCurrentView(View.SEARCH); // Ensure we are on the search view to see results
  }, []);

  const handleBookNow = useCallback((bus: Bus, seats: Seat[]) => {
    setSelectedBus(bus);
    setSelectedSeats(seats);
  }, []);

  const handleConfirmBooking = useCallback((passengerName: string, passengerContact: string) => {
    if (!selectedBus || selectedSeats.length === 0) return;

    const newBooking: Booking = {
      id: `SF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
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
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
    } catch (error) {
      console.error("Failed to save bookings to local storage", error);
    }
    
    const busIndex = MOCK_BUSES.findIndex(b => b.id === selectedBus.id);
    if(busIndex !== -1) {
        selectedSeats.forEach(seat => {
            const seatToUpdate = MOCK_BUSES[busIndex].seats.find(s => s.id === seat.id);
            if(seatToUpdate) seatToUpdate.isBooked = true;
        });
    }

    setSelectedBus(null);
    setSelectedSeats([]);
    alert(`Itike yawe ifashwe neza! Nimero y'itike ni ${newBooking.id}`);
    setCurrentView(View.BOOKINGS);
  }, [selectedBus, selectedSeats, bookings]);

  const handleCancelBooking = useCallback((bookingId: string) => {
    const bookingToCancel = bookings.find(b => b.id === bookingId);
    if (!bookingToCancel) return;

    if (!window.confirm("Urifuza koko guhagarika iyi tike? Iki gikorwa ntigishobora gusubizwa inyuma.")) {
        return;
    }

    const updatedBookings = bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'Cancelled' as 'Cancelled' } : b
    );
    setBookings(updatedBookings);

    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
    } catch (error) {
      console.error("Failed to save cancelled booking to local storage", error);
    }

    const busIndex = MOCK_BUSES.findIndex(b => b.id === bookingToCancel.bus.id);
    if (busIndex !== -1) {
        bookingToCancel.seats.forEach(seat => {
            const seatToUpdate = MOCK_BUSES[busIndex].seats.find(s => s.id === seat.id);
            if (seatToUpdate) seatToUpdate.isBooked = false;
        });
    }

    alert(`Itike ${bookingId} yahagaritswe.`);
  }, [bookings]);

  const handleRateBooking = useCallback((bookingId: string, rating: number) => {
      const updatedBookings = bookings.map(b => 
          b.id === bookingId ? { ...b, userRating: rating } : b
      );
      setBookings(updatedBookings);
       try {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
      } catch (error) {
        console.error("Failed to save rating to local storage", error);
      }
      alert('Murakoze gutanga amanota!');
  }, [bookings]);

  const renderContent = () => {
    switch (currentView) {
      case View.COMPANIES:
        return <CompaniesPage companies={TRANSPORT_COMPANIES} />;
      case View.ACCOUNT:
        return <AccountPage bookings={bookings} onRateBooking={handleRateBooking} />;
      case View.BOOKINGS:
        return <MyBookings bookings={bookings} onCancelBooking={handleCancelBooking} />;
      case View.SEARCH:
      default:
        return (
          <>
            <SearchSection onSearch={handleSearch} />
            {searchResults.length > 0 && <BusList buses={searchResults} onBookNow={handleBookNow} />}
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
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