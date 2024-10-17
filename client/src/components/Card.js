import React from 'react';

const Card = ({ children, title }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="bg-gradient-to-r from-blue-400 to-purple-600 p-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
