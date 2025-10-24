import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            {/* New Cartoon AI Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-white"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M9.5 8.5c.9-1 2.2-1.5 3.5-1.5s2.6.5 3.5 1.5"></path>
              <path d="M14.5 12.5c.9 1 2.2 1.5 3.5 1.5"></path>
              <path d="M9.5 12.5c-.9 1-2.2 1.5-3.5 1.5"></path>
              <path d="M14.5 8.5c-.9-1-2.2-1.5-3.5-1.5"></path>
              <path d="M12 11.5v-3"></path>
            </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-100">Elastic Hybrid Quanta Agent</h1>
      </div>
    </header>
  );
};

export default Header;