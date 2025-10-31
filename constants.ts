import type { Bus } from './types';

const generateSeats = (): { id: string, number: string, isBooked: boolean }[] => {
  const seats = [];
  const rows = 10;
  const cols = ['A', 'B', 'C', 'D'];
  for (let i = 1; i <= rows; i++) {
    for (const col of cols) {
      seats.push({
        id: `${i}${col}`,
        number: `${i}${col}`,
        isBooked: Math.random() > 0.7,
      });
    }
  }
  return seats;
};

export const TRANSPORT_COMPANIES = [
  {
    name: 'Kigali Express',
    logoUrl: 'https://i.imgur.com/3Yx3m5A.png',
    busImageUrl: 'https://i.imgur.com/rLsmhJb.jpeg',
  },
  {
    name: 'Volcano Express',
    logoUrl: 'https://i.imgur.com/u0v2z9e.png',
    busImageUrl: 'https://i.imgur.com/G4hScvN.jpeg',
  },
  {
    name: 'Horizon Coaches',
    logoUrl: 'https://i.imgur.com/nL1Y3a8.png',
    busImageUrl: 'https://i.imgur.com/yS4f2aX.jpeg',
  },
  {
    name: 'Ritco Ltd',
    logoUrl: 'https://i.imgur.com/b5v9f3d.png',
    busImageUrl: 'https://i.imgur.com/k2e4B2j.jpeg',
  },
];


export const MOCK_BUSES: Bus[] = [
  {
    id: 'B1',
    operator: 'Kigali Express',
    from: 'Kigali',
    to: 'Huye',
    departureTime: '08:00 AM',
    arrivalTime: '10:30 AM',
    duration: '2h 30m',
    price: 5000,
    rating: 4.5,
    seats: generateSeats(),
    amenities: { wifi: true, ac: true, power: true },
    stops: ['Kigali', 'Muhanga', 'Huye'],
    status: 'On Route',
    occupancy: 85,
  },
  {
    id: 'B2',
    operator: 'Volcano Express',
    from: 'Kigali',
    to: 'Huye',
    departureTime: '09:30 AM',
    arrivalTime: '12:00 PM',
    duration: '2h 30m',
    price: 5500,
    rating: 4.8,
    seats: generateSeats(),
    amenities: { wifi: true, ac: true, power: false },
    stops: ['Kigali', 'Nyanza', 'Huye'],
    status: 'Parked',
    occupancy: 60,
  },
  {
    id: 'B3',
    operator: 'Horizon Coaches',
    from: 'Kigali',
    to: 'Musanze',
    departureTime: '07:00 AM',
    arrivalTime: '09:00 AM',
    duration: '2h 0m',
    price: 4000,
    rating: 4.2,
    seats: generateSeats(),
    amenities: { wifi: false, ac: true, power: true },
    stops: ['Kigali', 'Nyabugogo', 'Musanze'],
    status: 'On Route',
    occupancy: 95,
  },
  {
    id: 'B4',
    operator: 'Kigali Express',
    from: 'Kigali',
    to: 'Musanze',
    departureTime: '11:00 AM',
    arrivalTime: '01:00 PM',
    duration: '2h 0m',
    price: 4200,
    rating: 4.6,
    seats: generateSeats(),
    amenities: { wifi: true, ac: true, power: true },
    stops: ['Kigali', 'Gakenke', 'Musanze'],
    status: 'Maintenance',
    occupancy: 0,
  },
   {
    id: 'B5',
    operator: 'Volcano Express',
    from: 'Huye',
    to: 'Kigali',
    departureTime: '02:00 PM',
    arrivalTime: '04:30 PM',
    duration: '2h 30m',
    price: 5000,
    rating: 4.7,
    seats: generateSeats(),
    amenities: { wifi: true, ac: false, power: false },
    stops: ['Huye', 'Nyanza', 'Kigali'],
    status: 'Parked',
    occupancy: 70,
  },
  {
    id: 'B6',
    operator: 'Horizon Coaches',
    from: 'Musanze',
    to: 'Kigali',
    departureTime: '03:00 PM',
    arrivalTime: '05:00 PM',
    duration: '2h 0m',
    price: 4000,
    rating: 4.3,
    seats: generateSeats(),
    amenities: { wifi: true, ac: true, power: true },
    stops: ['Musanze', 'Base', 'Kigali'],
    status: 'On Route',
    occupancy: 92,
  },
  {
    id: 'B7',
    operator: 'Ritco Ltd',
    from: 'Kigali',
    to: 'Huye',
    departureTime: '10:00 AM',
    arrivalTime: '12:30 PM',
    duration: '2h 30m',
    price: 4800,
    rating: 4.9,
    seats: generateSeats(),
    amenities: { wifi: true, ac: true, power: true },
    stops: ['Kigali', 'Ruyenzi', 'Muhanga', 'Huye'],
    status: 'On Route',
    occupancy: 90,
  },
  {
    id: 'B8',
    operator: 'Ritco Ltd',
    from: 'Kigali',
    to: 'Musanze',
    departureTime: '01:30 PM',
    arrivalTime: '03:30 PM',
    duration: '2h 0m',
    price: 4100,
    rating: 4.8,
    seats: generateSeats(),
    amenities: { wifi: true, ac: true, power: false },
    stops: ['Kigali', 'Nyabugogo', 'Gakenke', 'Musanze'],
    status: 'Parked',
    occupancy: 55,
  },
];

export const RWANDA_CITIES = ['Kigali', 'Huye', 'Musanze', 'Rubavu', 'Nyagatare', 'Muhanga'];

export const DASHBOARD_DATA = {
    revenueByRoute: [
        { name: 'Kigali - Huye', revenue: 450000 },
        { name: 'Kigali - Musanze', revenue: 380000 },
        { name: 'Huye - Kigali', revenue: 320000 },
        { name: 'Musanze - Rubavu', revenue: 210000 },
        { name: 'Kigali - Nyagatare', revenue: 510000 },
    ],
    bookingsOverTime: [
        { name: 'Mon', bookings: 34 },
        { name: 'Tue', bookings: 45 },
        { name: 'Wed', bookings: 61 },
        { name: 'Thu', bookings: 55 },
        { name: 'Fri', bookings: 78 },
        { name: 'Sat', bookings: 95 },
        { name: 'Sun', bookings: 82 },
    ],
    operatorMarketShare: [
        { name: 'Kigali Express', value: 400 },
        { name: 'Volcano Express', value: 300 },
        { name: 'Horizon Coaches', value: 250 },
        { name: 'Other', value: 100 },
    ],
    occupancyByRoute: [
        { name: 'Kigali - Huye', occupancy: 88 },
        { name: 'Kigali - Musanze', occupancy: 95 },
        { name: 'Huye - Kigali', occupancy: 75 },
        { name: 'Musanze - Rubavu', occupancy: 65 },
        { name: 'Kigali - Nyagatare', occupancy: 92 },
    ]
};