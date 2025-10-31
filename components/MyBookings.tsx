import React, { useState, useMemo } from 'react';
import type { Booking } from '../types';
import { BusIcon, MapPinIcon, ClockIcon, PrinterIcon, QrCodeIcon } from './icons';
import { BusTrackingMap } from './BusTrackingMap';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

const TicketView: React.FC<{ booking: Booking, onBack: () => void }> = ({ booking, onBack }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <style>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                #ticket-to-print, #ticket-to-print * {
                  visibility: visible;
                }
                #ticket-to-print {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
              }
            `}</style>
            <div className="mb-6">
                <button onClick={onBack} className="text-orange-600 font-semibold hover:underline">
                    &larr; Subira ku Matike Yanjye
                </button>
            </div>
            <div id="ticket-to-print" className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                <header className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-4">
                    <div>
                        <div className="flex items-center space-x-2">
                            <BusIcon className="w-8 h-8 text-orange-500" />
                            <h1 className="text-2xl font-bold text-orange-600">Safiri</h1>
                        </div>
                        <p className="text-gray-500">Itike yo ku Ikoranabuhanga</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">Nimero y'Itike</p>
                        <p className="font-mono text-gray-700">{booking.id}</p>
                    </div>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <p className="text-sm text-gray-500">Umugenzi</p>
                            <p className="font-bold text-lg text-gray-800">{booking.passengerName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Inzira</p>
                            <p className="font-bold text-lg text-gray-800">{booking.bus.from} &rarr; {booking.bus.to}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-sm text-gray-500">Itariki</p>
                                <p className="font-semibold text-gray-800">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Igihe cyo Guhaguruka</p>
                                <p className="font-semibold text-gray-800">{booking.bus.departureTime}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ikigo gitwara</p>
                                <p className="font-semibold text-gray-800">{booking.bus.operator}</p>
                            </div>
                             <div>
                                <p className="text-sm text-gray-500">Imyanya</p>
                                <p className="font-semibold text-gray-800">{booking.seats.map(s => s.number).join(', ')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
                        <QrCodeIcon className="w-32 h-32 text-gray-800"/>
                        <p className="text-sm text-gray-600 text-center">Sikanisha mbere yo kwinjira</p>
                    </div>
                </main>
                 <footer className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
                    Murakoze guhitamo Safiri. Urugendo ruhire!
                </footer>
            </div>
             <div className="mt-8 flex justify-center gap-4 print:hidden">
                <button 
                    onClick={handlePrint}
                    className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                    <PrinterIcon className="w-5 h-5"/>
                    <span>Capa Itike</span>
                </button>
            </div>
        </div>
    );
};


const BookingCard: React.FC<{ booking: Booking, onTrack: () => void, onCancel: () => void, onPrint: () => void }> = ({ booking, onTrack, onCancel, onPrint }) => {
  const isCancelled = booking.status === 'Cancelled';
  
  const statusLabels: Record<Booking['status'], string> = {
    'Confirmed': 'Byemejwe',
    'Cancelled': 'Byahagaritswe',
  };

  const statusClass = {
      'Confirmed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-gray-100 text-gray-500',
  }[booking.status];
  
  return (
      <div className={`bg-white rounded-lg shadow-md p-6 flex flex-col ${isCancelled ? 'opacity-60' : ''}`}>
          <div className="flex justify-between items-start border-b pb-4 mb-4">
              <div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusClass}`}>{statusLabels[booking.status]}</span>
                  <p className="text-gray-500 text-sm mt-2">Nimero y'Itike: {booking.id}</p>
              </div>
              <div className="text-right">
                  <p className={`font-bold text-lg ${isCancelled ? 'text-gray-500 line-through' : 'text-orange-600'}`}>{booking.bus.price * booking.seats.length} RWF</p>
                  <p className="text-gray-500 text-sm">{new Date(booking.bookingDate).toLocaleDateString()}</p>
              </div>
          </div>
          
          <div className="flex-grow">
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
          </div>
          
          <div className="mt-4 pt-4 border-t grid grid-cols-1 gap-2">
              <button 
                  onClick={onTrack} 
                  disabled={isCancelled}
                  className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-200 disabled:text-orange-400 disabled:cursor-not-allowed">
                  Kurikira Bisi
              </button>
              {!isCancelled && (
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                        onClick={onPrint}
                        className="w-full bg-transparent border border-orange-500 text-orange-500 font-bold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">
                        Capa Itike
                    </button>
                    <button 
                        onClick={onCancel}
                        className="w-full bg-transparent border border-red-500 text-red-500 font-bold py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                        Hagarika Itike
                    </button>
                  </div>
              )}
          </div>
      </div>
  );
};

export const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onCancelBooking }) => {
    const [trackingBooking, setTrackingBooking] = useState<Booking | null>(null);
    const [ticketToPrint, setTicketToPrint] = useState<Booking | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'Confirmed' | 'Cancelled'>('all');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const displayedBookings = useMemo(() => {
        if (!bookings) return [];
        return bookings
            .filter(b => filterStatus === 'all' || b.status === filterStatus)
            .sort((a, b) => {
                const dateA = new Date(a.bookingDate).getTime();
                const dateB = new Date(b.bookingDate).getTime();
                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            });
    }, [bookings, filterStatus, sortOrder]);

    if (trackingBooking) {
        return <BusTrackingMap booking={trackingBooking} onBack={() => setTrackingBooking(null)} />;
    }
    
    if (ticketToPrint) {
        return <TicketView booking={ticketToPrint} onBack={() => setTicketToPrint(null)} />;
    }

    if (!bookings || bookings.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-3xl font-bold mb-2">Nta Matike Urafata</h2>
                <p className="text-gray-500">Ingendo zawe zizaza n'izashize zizagaragara hano.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Amatike Yanjye</h2>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div>
                        <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700">Rongoza ukurikije uko bihagaze</label>
                        <select 
                            id="filterStatus"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                        >
                            <option value="all">Byose</option>
                            <option value="Confirmed">Byemejwe</option>
                            <option value="Cancelled">Byahagaritswe</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Rongoza ukurikije itariki</label>
                        <select 
                            id="sortOrder"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as any)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                        >
                            <option value="newest">Ibishya Mbere</option>
                            <option value="oldest">Ibishaje Mbere</option>
                        </select>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold">Habonetse itike {displayedBookings.length}</p>
                </div>
            </div>

            {displayedBookings.length === 0 ? (
                <div className="text-center py-16">
                    <h2 className="text-3xl font-bold mb-2">Nta Matike Abonotse</h2>
                    <p className="text-gray-500">Gerageza uhindure uko ushakisha.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedBookings.map(booking => (
                        <BookingCard 
                            key={booking.id} 
                            booking={booking} 
                            onTrack={() => setTrackingBooking(booking)} 
                            onCancel={() => onCancelBooking(booking.id)}
                            onPrint={() => setTicketToPrint(booking)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};