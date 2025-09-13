
import React, { useState } from 'react';
import { generateItinerary } from '../services/geminiService';
import { GeneratedItinerary } from '../types';
import SparklesIcon from '../components/icons/SparklesIcon';

const ItineraryPlannerPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const result = await generateItinerary(prompt);
      setItinerary(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <SparklesIcon className="w-12 h-12 mx-auto text-primary" />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-4">AI Itinerary Planner</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Describe your dream trip, and let our AI create a personalized itinerary just for you.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <label htmlFor="trip-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What kind of trip are you planning?
          </label>
          <textarea
            id="trip-prompt"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A relaxing 3-day weekend in a cozy mountain town with some light hiking and good food.'"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full flex justify-center items-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
                <>
                <SparklesIcon className="w-5 h-5"/>
                Generate Itinerary
                </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-8 bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {itinerary && (
        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">{itinerary.title}</h2>
          <div className="space-y-8">
            {[...new Set(itinerary.itinerary.map(item => item.day))].map(day => (
              <div key={day}>
                <h3 className="text-2xl font-semibold mb-4 border-b-2 border-primary pb-2">Day {day}</h3>
                <ul className="space-y-4">
                  {itinerary.itinerary.filter(item => item.day === day).map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="bg-primary text-white rounded-md text-sm font-bold w-24 text-center py-1 flex-shrink-0">{item.time}</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{item.activity}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryPlannerPage;
