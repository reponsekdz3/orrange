
import React, { useState } from 'react';
import type { Booking } from '../types';
import { BusIcon, MapPinIcon, ClockIcon } from './icons';
import { BusTrackingMap } from './BusTrackingMap';

interface MyBookingsProps {
  bookings: Booking[];
}

const BookingCard: React.FC<{ booking: Booking, onTrack: () => void }> = ({ booking, onTrack }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex justify-between items-start border-b pb-4 mb-4">
      <div>
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">{booking.status}</span>
        <p className="text-gray-500 text-sm mt-2">Booking ID: {booking.id}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg text-orange-600">{booking.bus.price * booking.seats.length} RWF</p>
        <p className="text-gray-500 text-sm">{new Date(booking.bookingDate).toLocaleDateString()}</p>
      </div>
    </div>
    
    <div className="flex items-center space-x-4 mb-4">
      <BusIcon className="w-10 h-10 text-orange-500" />
      <div>
        <h4 className="font-bold text-lg">{booking.bus.operator}</h4>
        <p className="text-gray-600">{booking.passengerName}</p>
      </div>
    </div>

    <div className="space-y-2 text-sm">
      <div className="flex items-center">
        <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
        <span>{booking.bus.from} to {booking.bus.to}</span>
      </div>
      <div className="flex items-center">
        <ClockIcon className="w-4 h-4 mr-2 text-gray-500" />
        <span>{booking.bus.departureTime} - {booking.bus.arrivalTime}</span>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t">
        <button onClick={onTrack} className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
            Track Bus
        </button>
    </div>
  </div>
);

export const MyBookings: React.FC<MyBookingsProps> = ({ bookings }) => {
    const [trackingBooking, setTrackingBooking] = useState<Booking | null>(null);

    if (trackingBooking) {
        return <BusTrackingMap booking={trackingBooking} onBack={() => setTrackingBooking(null)} />;
    }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-2">No Bookings Yet</h2>
        <p className="text-gray-500">Your upcoming and past trips will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} onTrack={() => setTrackingBooking(booking)} />
        ))}
      </div>
    </div>
  );
};
