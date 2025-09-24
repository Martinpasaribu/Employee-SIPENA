// src/components/LoadingSpinner.tsx

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 bg-opacity-80 transition-opacity duration-300 ease-out">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-green-700 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 text-lg font-semibold">Memuat data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;