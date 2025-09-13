
import React, { useState } from 'react';
import { Service } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import ClockIcon from './icons/ClockIcon';
import UserIcon from './icons/UserIcon';
import XMarkIcon from './icons/XMarkIcon';

interface BookingModalProps {
  service: Service;
  onClose: () => void;
}

type BookingStep = 'select' | 'confirm' | 'complete';

const BookingModal: React.FC<BookingModalProps> = ({ service, onClose }) => {
  const [step, setStep] = useState<BookingStep>('select');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleNext = () => {
    if (step === 'select' && selectedDate && selectedTime) {
      setStep('confirm');
    } else if (step === 'confirm') {
      // Simulate payment processing
      setStep('complete');
    }
  };

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('select');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'select':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Select Date & Time</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'confirm':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Confirm Your Booking</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <p><strong>Service:</strong> {service.name}</p>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p className="text-lg font-bold"><strong>Total:</strong> ${service.price}</p>
            </div>
             <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" placeholder="John Doe" className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                </div>
              </div>
          </div>
        );
      case 'complete':
        return (
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">Booking Confirmed!</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Your booking for {service.name} is complete. A confirmation has been sent to your email.</p>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BookingID-12345-${service.id}`} alt="QR Code" className="mx-auto mt-4" />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <XMarkIcon className="w-6 h-6"/>
        </button>
        {renderStep()}
        <div className="mt-6 flex justify-between">
          {step === 'confirm' && (
            <button onClick={handleBack} className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition">Back</button>
          )}
          {step !== 'complete' ? (
            <button
              onClick={handleNext}
              disabled={step === 'select' && (!selectedDate || !selectedTime)}
              className="px-6 py-2 rounded-md text-white bg-primary hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed ml-auto"
            >
              {step === 'select' ? 'Next' : 'Confirm & Pay'}
            </button>
          ) : (
             <button onClick={onClose} className="w-full px-6 py-2 rounded-md text-white bg-primary hover:bg-primary-700 transition">Done</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
