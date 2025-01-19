import React, { type FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar */}
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Real Estate</h2>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Welcome</h1>
          <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Logout
          </button>
        </div>
      </header>

      {/* Children Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  </div>
);

export default SidebarLayout;
