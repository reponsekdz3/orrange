import React, { useState, useMemo } from 'react';
import type { Booking } from '../types';
import { UserIcon, StarIcon, StarFullIcon, ClockIcon } from './icons';

interface AccountPageProps {
    bookings: Booking[];
    onRateBooking: (bookingId: string, rating: number) => void;
}

const RatingModal: React.FC<{ booking: Booking; onClose: () => void; onRate: (bookingId: string, rating: number) => void }> = ({ booking, onClose, onRate }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = () => {
        if (rating > 0) {
            onRate(booking.id, rating);
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm text-center p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tanga Amanota</h3>
                <p className="text-gray-600 mb-4">Uha amanota angahe urugendo rwawe na <span className="font-semibold">{booking.bus.operator}</span>?</p>
                <div className="flex justify-center text-yellow-400 mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                        <div key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(star)}>
                           <StarFullIcon className={`w-10 h-10 cursor-pointer ${ (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}/>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4">
                    <button onClick={onClose} className="w-full py-2 px-4 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">Hagarika</button>
                    <button onClick={handleSubmit} disabled={rating === 0} className="w-full py-2 px-4 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 disabled:bg-orange-200">Emeza</button>
                </div>
            </div>
        </div>
    )
};


const PastTripCard: React.FC<{ booking: Booking; onRateClick: () => void }> = ({ booking, onRateClick }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
                <p className="font-bold">{booking.bus.operator}: {booking.bus.from} &rarr; {booking.bus.to}</p>
                <p className="text-sm text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</p>
            </div>
            {booking.userRating ? (
                 <div className="flex items-center text-yellow-500">
                    {[...Array(booking.userRating)].map((_, i) => <StarFullIcon key={i} className="w-5 h-5"/>)}
                    {[...Array(5-booking.userRating)].map((_, i) => <StarIcon key={i} className="w-5 h-5"/>)}
                </div>
            ) : (
                <button onClick={onRateClick} className="bg-orange-100 text-orange-600 font-semibold py-1 px-3 rounded-full hover:bg-orange-200 text-sm">
                    Tanga Inota
                </button>
            )}
        </div>
    )
}

export const AccountPage: React.FC<AccountPageProps> = ({ bookings, onRateBooking }) => {
    const [bookingToRate, setBookingToRate] = useState<Booking | null>(null);
    const pastBookings = useMemo(() => {
         // In a real app, this would filter by date. Here we simulate by showing all completed.
        return bookings.filter(b => b.status === 'Confirmed' || b.status === 'Cancelled').sort((a,b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
    }, [bookings]);

    return (
        <div>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex items-center space-x-6">
                <div className="bg-orange-100 p-4 rounded-full">
                    <UserIcon className="w-12 h-12 text-orange-500"/>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">Konti Yanjye</h2>
                    <p className="text-gray-600">Izina: Mugenzi Jean (Mock)</p>
                    <p className="text-gray-600">Terefone: 0788123456 (Mock)</p>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-4">Amateka y'Ingendo</h3>
                {pastBookings.length > 0 ? (
                    <div className="space-y-4">
                        {pastBookings.map(b => <PastTripCard key={b.id} booking={b} onRateClick={() => setBookingToRate(b)} />)}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-100 rounded-lg">
                        <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                        <p className="text-gray-500">Nta mateka y'ingendo arahari.</p>
                    </div>
                )}
            </div>
            {bookingToRate && <RatingModal booking={bookingToRate} onClose={() => setBookingToRate(null)} onRate={onRateBooking} />}
        </div>
    );
};