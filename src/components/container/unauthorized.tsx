import React, { type FC } from 'react';

const Unauthorized: FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center p-8 max-w-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You don't have the permissions to view this page. Please check your access rights or return to the previous page.
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href="/"
          className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          Home
        </a>
        <a
          href="/contact"
          className="px-5 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:outline-none"
        >
          Contact Support
        </a>
      </div>
    </div>
  </div>
);

export default Unauthorized;
