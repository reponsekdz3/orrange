
import React, { useMemo } from 'react';
import type { Booking } from '../types';
import { ClockIcon } from './icons';

interface MyBookingsProps {
    bookings: Booking[];
    onTrackBus: (booking: Booking) => void;
    onCancelBooking: (bookingId: string) => void;
}

const BookingCard: React.FC<{ booking: Booking; isUpcoming: boolean; onTrack: () => void; onCancel: () => void }> = ({ booking, isUpcoming, onTrack, onCancel }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg">{booking.bus.operator}</p>
                    <p className="text-gray-600">{booking.bus.from} &rarr; {booking.bus.to}</p>
                    <p className="text-sm text-gray-500">Itariki: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
                <div className={`text-sm font-bold px-3 py-1 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {booking.status}
                </div>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">Imyanya: <span className="font-semibold text-gray-800">{booking.seats.map(s => s.number).join(', ')}</span></p>
                    <p className="text-sm text-gray-500">Igiciro: <span className="font-semibold text-orange-600">{(booking.bus.price * booking.seats.length).toLocaleString()} RWF</span></p>
                </div>
                {isUpcoming && booking.status === 'Confirmed' && (
                    <div className="flex gap-2">
                         <button onClick={onCancel} className="bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 text-sm">Hagarika</button>
                         <button onClick={onTrack} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 text-sm">Kurikira Live</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onTrackBus, onCancelBooking }) => {
    const { upcomingBookings, pastBookings } = useMemo(() => {
        const now = new Date();
        const upcoming = bookings.filter(b => b.status === 'Confirmed' && new Date(b.bookingDate) >= now).sort((a,b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime());
        const past = bookings.filter(b => b.status !== 'Confirmed' || new Date(b.bookingDate) < now).sort((a,b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
        return { upcomingBookings: upcoming, pastBookings: past };
    }, [bookings]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Amatike Yanjye</h2>

            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Ingendo Ziri Imbere</h3>
                {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingBookings.map(b => <BookingCard key={b.id} booking={b} isUpcoming={true} onTrack={() => onTrackBus(b)} onCancel={() => onCancelBooking(b.id)} />)}
                    </div>
                ) : (
                    <p className="text-gray-500 bg-gray-50 p-6 rounded-lg">Nta ngendo ziri imbere zibonetse.</p>
                )}
            </div>

             <div>
                <h3 className="text-xl font-bold mb-4">Ingendo Zashize</h3>
                 {pastBookings.length > 0 ? (
                    <div className="space-y-4">
                        {pastBookings.map(b => <BookingCard key={b.id} booking={b} isUpcoming={false} onTrack={() => {}} onCancel={() => {}} />)}
                    </div>
                ) : (
                     <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                        <p className="text-gray-500">Nta mateka y'ingendo arahari.</p>
                    </div>
                )}
            </div>

        </div>
    );
};
