
export enum ServiceCategory {
  Hotel = 'Hotel',
  Restaurant = 'Restaurant',
  Salon = 'Salon',
  Doctor = 'Doctor',
  Event = 'Event',
}

export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  location: string;
  price: number;
  priceUnit: 'night' | 'person' | 'hour';
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  gallery: string[];
  reviews: Review[];
  amenities: string[];
}

export interface ItineraryItem {
  day: number;
  time: string;
  activity: string;
  description: string;
}

export interface GeneratedItinerary {
  title: string;
  itinerary: ItineraryItem[];
}
