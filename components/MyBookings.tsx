
import React from 'react';
import type { Booking } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
  onTrackBus: (booking: Booking) => void;
}

const BookingCard: React.FC<{ booking: Booking, onTrackBus: (booking: Booking) => void }> = ({ booking, onTrackBus }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
            <p className="font-bold text-lg">{booking.bus.operator}: {booking.bus.from} &rarr; {booking.bus.to}</p>
            <p className="text-sm text-gray-500">Igihe cyo guhaguruka: {booking.bus.departureTime} &bull; Imyanya: {booking.seats.map(s => s.number).join(', ')}</p>
            <p className="text-sm text-gray-500">Status: <span className="font-semibold text-green-600">{booking.status}</span></p>
        </div>
        <button onClick={() => onTrackBus(booking)} className="w-full sm:w-auto bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">
            Kurikira Bisi
        </button>
    </div>
);


export const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onTrackBus }) => {
  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed');

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Amatike Yanjye</h2>
      {upcomingBookings.length > 0 ? (
        <div className="space-y-4">
          {upcomingBookings.map(b => <BookingCard key={b.id} booking={b} onTrackBus={onTrackBus} />)}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Nta matike afatitse ufite.</p>
        </div>
      )}
    </div>
  );
};
