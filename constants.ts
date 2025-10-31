
import type { Bus, Seat, Booking, Company } from './types';

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = 12;
  const cols = ['A', 'B', 'C', 'D'];
  let count = 0;
  for (let i = 1; i <= rows; i++) {
    for (const col of cols) {
      if (col === 'B') continue; // Aisle
      seats.push({
        id: `${i}${col}`,
        number: `${i}${col}`,
        isBooked: count > 4 && Math.random() > 0.7,
      });
      count++;
    }
  }
  return seats;
};

export const BUSES: Bus[] = [
  {
    id: '1',
    operator: 'Volcano Express',
    rating: 4.5,
    amenities: { wifi: true, ac: true, power: true },
    departureTime: '07:00',
    arrivalTime: '09:30',
    duration: '2h 30m',
    from: 'Kigali',
    to: 'Musanze',
    price: 3000,
    seats: generateSeats(),
  },
  {
    id: '2',
    operator: 'Ritco',
    rating: 4.2,
    amenities: { wifi: true, ac: true, power: false },
    departureTime: '08:15',
    arrivalTime: '11:00',
    duration: '2h 45m',
    from: 'Kigali',
    to: 'Musanze',
    price: 2800,
    seats: generateSeats(),
  },
  {
    id: '3',
    operator: 'Horizon Express',
    rating: 4.0,
    amenities: { wifi: false, ac: true, power: true },
    departureTime: '09:00',
    arrivalTime: '12:00',
    duration: '3h 0m',
    from: 'Kigali',
    to: 'Huye',
    price: 3500,
    seats: generateSeats(),
  },
    {
    id: '4',
    operator: 'Volcano Express',
    rating: 4.8,
    amenities: { wifi: true, ac: true, power: true },
    departureTime: '10:30',
    arrivalTime: '13:30',
    duration: '3h 0m',
    from: 'Kigali',
    to: 'Huye',
    price: 3500,
    seats: generateSeats(),
  },
];

export const BOOKINGS: Booking[] = [
    {
        id: 'B1',
        bus: BUSES[0],
        seats: [BUSES[0].seats[0], BUSES[0].seats[1]],
        bookingDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Confirmed',
        userRating: 5,
    },
    {
        id: 'B2',
        bus: BUSES[2],
        seats: [BUSES[2].seats[5]],
        bookingDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Confirmed'
    }
];

export const COMPANIES: Company[] = [
    {
        id: 'C1',
        name: 'Volcano Express',
        logo: 'https://www.volcanoexpress.co.rw/themes/volcano/assets/images/logo.png',
        rating: 4.6,
        totalBuses: 50,
        description: 'Providing reliable and comfortable transport across Rwanda for over 15 years. Known for punctuality and excellent customer service.',
        routes: [{ from: 'Kigali', to: 'Musanze' }, { from: 'Kigali', to: 'Huye'}, { from: 'Kigali', to: 'Rubavu'}],
    },
    {
        id: 'C2',
        name: 'Ritco',
        logo: 'https://pbs.twimg.com/profile_images/1164440398687313920/p2p2GTnB_400x400.jpg',
        rating: 4.2,
        totalBuses: 120,
        description: 'The largest public transport company in Rwanda, serving both urban and rural routes with a modern fleet of buses.',
        routes: [{ from: 'Kigali', to: 'Musanze' }, { from: 'Kigali', to: 'Rusizi'}, { from: 'Huye', to: 'Nyagatare'}],
    },
    {
        id: 'C3',
        name: 'Horizon Express',
        logo: 'https://media.licdn.com/dms/image/C4D0BAQG5kL5n3gYJKA/company-logo_200_200/0/1630653202495/horizon_express_ltd_logo?e=2147483647&v=beta&t=7w8V2fH_h9E4n-q5k3x7y2B4a3r1Y0w2_NlG6g4b3lI',
        rating: 4.0,
        totalBuses: 35,
        description: 'Focused on long-distance travel, Horizon Express offers comfortable journeys to all major towns in Rwanda.',
        routes: [{ from: 'Kigali', to: 'Huye' }, { from: 'Kigali', to: 'Karongi'}, { from: 'Musanze', to: 'Rubavu'}],
    }
]

export const DESTINATIONS = ["Kigali", "Musanze", "Huye", "Rubavu", "Karongi", "Nyagatare", "Rusizi"];
