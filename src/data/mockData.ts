import { Event, User } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user' },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    description: 'The biggest technology conference of the year featuring top speakers from around the globe.',
    date: '2025-06-15T09:00:00',
    location: 'Convention Center, San Francisco',
    price: 299,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000',
    coordinators: [
      { name: 'Sarah Smith', phone: '+1 234 567 8900', email: 'sarah@techsummit.com' }
    ],
    offer: 'Early Bird 15% OFF',
    attendees: 120
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'A weekend of live music, food, and art under the stars.',
    date: '2025-07-20T16:00:00',
    location: 'Central Park, New York',
    price: 150,
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1459749411177-0473ef7161a8?auto=format&fit=crop&q=80&w=2000',
    coordinators: [
      { name: 'Mike Ross', phone: '+1 987 654 3210', email: 'mike@musicfest.com' }
    ],
    attendees: 450
  },
  {
    id: '3',
    title: 'Startup Networking Night',
    description: 'Connect with founders, investors, and innovators in the startup ecosystem.',
    date: '2025-05-10T18:00:00',
    location: 'WeWork, Austin',
    price: 0,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000',
    coordinators: [
      { name: 'Alex Chen', phone: '+1 555 123 4567', email: 'alex@startup.com' }
    ],
    offer: 'Free Entry for Students',
    attendees: 85
  }
];
