
import React from 'react';
import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className="w-5 h-5 text-yellow-400" />
        ))}
        {halfStar && (
          <div className="relative">
             <StarIcon className="w-5 h-5 text-gray-300 dark:text-gray-600" />
             <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                <StarIcon className="w-5 h-5 text-yellow-400" />
             </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default StarRating;
