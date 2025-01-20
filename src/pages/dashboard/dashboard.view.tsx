import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  newUserCount: number;
  existingUserCount: number;
  totalUserCount: number;
  dauData: { date: string; count: number }[];
  mauData: { date: string; count: number }[];
}

const DashboardView: React.FC<DashboardProps> = ({ newUserCount, existingUserCount, totalUserCount, dauData, mauData }) => {
  return (
    <div className="space-y-6">
      {/* User Count Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">New Users</h3>
          <p className="text-2xl font-bold text-blue-600">{newUserCount}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Existing Users</h3>
          <p className="text-2xl font-bold text-green-600">{existingUserCount}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
          <p className="text-2xl font-bold text-purple-600">{totalUserCount}</p>
        </div>
      </div>

      {/* DAU and MAU Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
        <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">DAU (Daily Active Users)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dauData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">MAU (Monthly Active Users)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mauData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
