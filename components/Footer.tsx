
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Bookify</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">Help Center</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
               {/* Add social icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bookify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
