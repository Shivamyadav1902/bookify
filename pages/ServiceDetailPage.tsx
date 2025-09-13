
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockServices } from '../data/mockData';
import StarRating from '../components/StarRating';
import MapPinIcon from '../components/icons/MapPinIcon';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import BookingModal from '../components/BookingModal';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = mockServices.find(s => s.id === id);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!service) {
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold">Service not found</h1>
            <Link to="/" className="text-primary hover:underline mt-4 inline-block">Go back home</Link>
        </div>
    );
  }

  return (
    <div>
      <Link to="/search" className="inline-flex items-center text-primary hover:underline mb-6">
        <ChevronLeftIcon className="w-5 h-5 mr-1" />
        Back to results
      </Link>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{service.name}</h1>
        <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
            <StarRating rating={service.rating} reviewCount={service.reviewCount} />
            <span className="mx-2">·</span>
            <MapPinIcon className="w-5 h-5 mr-1" />
            <span>{service.location}</span>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 h-[500px] mb-12">
        <div className="md:row-span-2">
            <img src={service.gallery[0] || service.imageUrl} alt="Main gallery view" className="w-full h-full object-cover rounded-xl"/>
        </div>
        <div className="hidden md:block">
            <img src={service.gallery[1] || 'https://picsum.photos/seed/placeholder1/600/400'} alt="Gallery view 2" className="w-full h-full object-cover rounded-xl"/>
        </div>
        <div className="hidden md:block">
            <img src={service.gallery[2] || 'https://picsum.photos/seed/placeholder2/600/400'} alt="Gallery view 3" className="w-full h-full object-cover rounded-xl"/>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About this service</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
          
          <h3 className="text-xl font-bold mt-8 mb-4">What's included</h3>
          <ul className="grid grid-cols-2 gap-4">
            {service.amenities.map(amenity => (
              <li key={amenity} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> {amenity}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6">Reviews</h2>
          <div className="space-y-6">
            {service.reviews.map(review => (
              <div key={review.id} className="flex items-start space-x-4">
                <img src={review.avatarUrl} alt={review.author} className="w-12 h-12 rounded-full"/>
                <div>
                    <div className="flex items-center">
                        <h4 className="font-semibold">{review.author}</h4>
                        <span className="text-xs text-gray-400 ml-3">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Booking Card */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
              <p className="text-2xl font-bold mb-4">
                <span className="text-primary">${service.price}</span>
                <span className="text-base font-normal text-gray-500 dark:text-gray-400"> / {service.priceUnit}</span>
              </p>
              <button onClick={() => setIsBookingModalOpen(true)} className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors">
                Book Now
              </button>
          </div>
        </div>
      </div>
      {isBookingModalOpen && <BookingModal service={service} onClose={() => setIsBookingModalOpen(false)} />}
    </div>
  );
};

export default ServiceDetailPage;
