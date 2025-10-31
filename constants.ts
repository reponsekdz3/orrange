
import type { Bus, Seat, Booking, Company } from './types';

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  for (let i = 1; i <= 30; i++) {
    seats.push({
      id: `seat-${i}-${Math.random()}`,
      number: `S${i}`,
      isBooked: Math.random() < 0.3, // 30% chance of being booked
    });
  }
  return seats;
};

export const BUS_DATA: Bus[] = [
  {
    id: 'bus-1',
    operator: 'Volcano Express',
    rating: 4.5,
    amenities: { wifi: true, ac: true, power: true },
    departureTime: '07:00',
    arrivalTime: '10:30',
    duration: '3h 30m',
    from: 'Kigali',
    to: 'Musanze',
    price: 3500,
    seats: generateSeats(),
  },
  {
    id: 'bus-2',
    operator: 'Ritco',
    rating: 4.2,
    amenities: { wifi: true, ac: true, power: false },
    departureTime: '08:30',
    arrivalTime: '12:00',
    duration: '3h 30m',
    from: 'Kigali',
    to: 'Huye',
    price: 3200,
    seats: generateSeats(),
  },
  {
    id: 'bus-3',
    operator: 'Horizon Express',
    rating: 4.8,
    amenities: { wifi: true, ac: true, power: true },
    departureTime: '09:00',
    arrivalTime: '13:00',
    duration: '4h 00m',
    from: 'Kigali',
    to: 'Rubavu',
    price: 4000,
    seats: generateSeats(),
  },
  {
    id: 'bus-4',
    operator: 'Kigali Bus Service',
    rating: 4.0,
    amenities: { wifi: false, ac: true, power: false },
    departureTime: '10:00',
    arrivalTime: '11:30',
    duration: '1h 30m',
    from: 'Kigali',
    to: 'Rwamagana',
    price: 1500,
    seats: generateSeats(),
  },
];

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: 'booking-1',
        bus: BUS_DATA[0],
        seats: [BUS_DATA[0].seats[5], BUS_DATA[0].seats[6]],
        totalPrice: 7000,
        bookingDate: '2023-10-25T10:00:00Z',
        status: 'Confirmed',
        userRating: 5,
    },
    {
        id: 'booking-2',
        bus: BUS_DATA[2],
        seats: [BUS_DATA[2].seats[10]],
        totalPrice: 4000,
        bookingDate: '2023-10-22T14:30:00Z',
        status: 'Confirmed',
        userRating: 4,
    }
];

export const COMPANIES_DATA: Company[] = [
    { name: 'Volcano Express', logoUrl: '/logos/volcano.png', busImageUrl: '/buses/bus1.jpg' },
    { name: 'Ritco', logoUrl: '/logos/ritco.png', busImageUrl: '/buses/bus2.jpg' },
    { name: 'Horizon Express', logoUrl: '/logos/horizon.png', busImageUrl: '/buses/bus3.jpg' },
    { name: 'Kigali Bus Service', logoUrl: '/logos/kbs.png', busImageUrl: '/buses/bus4.jpg' },
];
