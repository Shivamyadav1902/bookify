
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockServices, serviceCategories } from '../data/mockData';
import ServiceCard from '../components/ServiceCard';
import SearchIcon from '../components/icons/SearchIcon';
import MapPinIcon from '../components/icons/MapPinIcon';
import CalendarIcon from '../components/icons/CalendarIcon';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center rounded-xl overflow-hidden py-24 px-4 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/hero/1600/800')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Find & Book Amazing Services</h1>
          <p className="text-lg text-gray-200 mb-8">From hotels to salons, your next experience is just a search away.</p>
          <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-2xl flex flex-col md:flex-row items-center gap-2">
            <div className="relative flex-grow w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
              <input
                type="text"
                placeholder="Service, category, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
             <div className="relative flex-grow w-full md:border-l md:dark:border-gray-600">
               <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
               <input type="text" placeholder="Location" className="w-full p-3 pl-10 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none" />
             </div>
             <div className="relative flex-grow w-full md:border-l md:dark:border-gray-600">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
               <input type="date" className="w-full p-3 pl-10 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none" />
             </div>
            <button type="submit" className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {serviceCategories.map((category) => (
            <div key={category} className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <p className="text-lg font-semibold">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Popular Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockServices.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
