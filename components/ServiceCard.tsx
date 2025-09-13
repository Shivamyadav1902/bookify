
import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import MapPinIcon from './icons/MapPinIcon';
import StarRating from './StarRating';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link to={`/service/${service.id}`} className="block group">
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="relative">
                <img className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" src={service.imageUrl} alt={service.name} />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{service.category}</div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate group-hover:text-primary transition-colors">{service.name}</h3>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span>{service.location}</span>
                </div>
                <div className="flex items-center justify-between">
                    <StarRating rating={service.rating} reviewCount={service.reviewCount} />
                    <div className="text-right">
                        <p className="text-lg font-bold text-primary">${service.price}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">/ {service.priceUnit}</p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default ServiceCard;
