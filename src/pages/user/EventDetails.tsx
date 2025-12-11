import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';
import { Calendar, MapPin, User, Phone, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, rsvpEvent } = useApp();
  const [rsvpAmount, setRsvpAmount] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const event = events.find(e => e.id === id);

  if (!event) return <div className="p-8">Event not found</div>;

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = event.price > 0 ? event.price : (Number(rsvpAmount) || 0);
    rsvpEvent(event.id, amount);
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">RSVP Confirmed!</h2>
        <p className="text-gray-600 mb-8">
          You have successfully registered for <strong>{event.title}</strong>. 
          Your ticket and QR code have been generated.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => navigate('/my-tickets')}>View Ticket</Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 pl-0 hover:bg-transparent hover:text-indigo-600">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="relative h-96">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {event.category}
              </span>
              <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center space-x-6 text-lg">
                <span className="flex items-center"><Calendar className="w-5 h-5 mr-2"/> {format(new Date(event.date), 'PPP p')}</span>
                <span className="flex items-center"><MapPin className="w-5 h-5 mr-2"/> {event.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">About Event</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{event.description}</p>
            </section>

            {event.offer && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-800 mb-1">Special Offer!</h4>
                <p className="text-orange-700">{event.offer}</p>
              </div>
            )}

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Event Coordinators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.coordinators.map((coord, idx) => (
                  <div key={idx} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-full shadow-sm mr-4">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{coord.name}</p>
                      <div className="mt-1 space-y-1 text-sm text-gray-500">
                        <p className="flex items-center"><Phone className="w-3 h-3 mr-2"/> {coord.phone}</p>
                        <p className="flex items-center"><Mail className="w-3 h-3 mr-2"/> {coord.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">RSVP Now</h3>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Price per person</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {event.price === 0 ? 'Free' : formatCurrency(event.price)}
                </p>
              </div>

              <form onSubmit={handleRSVP} className="space-y-4">
                {event.price === 0 && (
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount (Optional)</label>
                     <div className="relative rounded-md shadow-sm">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <span className="text-gray-500 sm:text-sm">$</span>
                       </div>
                       <input
                         type="number"
                         min="0"
                         className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                         placeholder="0.00"
                         value={rsvpAmount}
                         onChange={(e) => setRsvpAmount(e.target.value)}
                       />
                     </div>
                   </div>
                )}
                
                <Button type="submit" className="w-full" size="lg">
                  Confirm RSVP
                </Button>
                <p className="text-xs text-center text-gray-500">
                  By clicking confirm, you agree to our terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
