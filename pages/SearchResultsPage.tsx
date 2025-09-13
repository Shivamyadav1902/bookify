
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockServices, serviceCategories } from '../data/mockData';
import { ServiceCategory } from '../types';
import ServiceCard from '../components/ServiceCard';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [selectedCategories, setSelectedCategories] = useState<Set<ServiceCategory>>(new Set());
  const [priceRange, setPriceRange] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);

  const handleCategoryChange = (category: ServiceCategory) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const filteredServices = useMemo(() => {
    return mockServices.filter(service => {
      const matchesQuery = query ? service.name.toLowerCase().includes(query.toLowerCase()) || service.location.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesCategory = selectedCategories.size > 0 ? selectedCategories.has(service.category) : true;
      const matchesPrice = service.price <= priceRange;
      const matchesRating = service.rating >= minRating;
      return matchesQuery && matchesCategory && matchesPrice && matchesRating;
    });
  }, [query, selectedCategories, priceRange, minRating]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="lg:w-1/4">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg sticky top-24">
          <h2 className="text-xl font-bold mb-6">Filters</h2>
          
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="space-y-2">
              {serviceCategories.map(category => (
                <label key={category} className="flex items-center cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" checked={selectedCategories.has(category)} onChange={() => handleCategoryChange(category)} />
                  <span className="ml-3 text-gray-600 dark:text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Max Price</h3>
            <input type="range" min="0" max="500" step="10" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <div className="text-center mt-2 text-gray-600 dark:text-gray-300">${priceRange}</div>
          </div>
          
          {/* Rating Filter */}
           <div className="mt-6">
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map(rating => (
                 <button key={rating} onClick={() => setMinRating(rating)} className={`w-10 h-10 rounded-full transition ${minRating >= rating ? 'bg-yellow-400 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>{rating}</button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <main className="lg:w-3/4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {query ? `Results for "${query}"` : 'Explore All Services'} ({filteredServices.length})
        </h1>
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
           <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
             <p className="text-xl text-gray-500 dark:text-gray-400">No services found matching your criteria.</p>
           </div>
        )}
      </main>
    </div>
  );
};

export default SearchResultsPage;
