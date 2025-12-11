import React from 'react';
import { useApp } from '../../context/AppContext';
import QRCode from 'react-qr-code';
import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';

export function MyTickets() {
  const { tickets, events } = useApp();

  if (tickets.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">No Tickets Yet</h2>
        <p className="text-gray-500 mt-2">You haven't RSVP'd to any events yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tickets.map((ticket) => {
          const event = events.find(e => e.id === ticket.eventId);
          if (!event) return null;

          return (
            <div key={ticket.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col sm:flex-row">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                      {ticket.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                    {format(new Date(event.date), 'PPP p')}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                    {event.location}
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  Ticket ID: {ticket.id} <br/>
                  Purchased: {format(new Date(ticket.purchaseDate), 'PP')}
                </div>
              </div>

              <div className="bg-gray-50 p-6 flex items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-200">
                <div className="bg-white p-2 rounded shadow-sm">
                  <QRCode value={ticket.qrCodeData} size={120} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
