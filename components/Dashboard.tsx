import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DASHBOARD_DATA, MOCK_BUSES } from '../constants';
import type { Bus } from '../types';

const COLORS = ['#ea580c', '#fb923c', '#fdba74', '#fed7aa'];

const StatCard: React.FC<{ title: string; value: string; change: string; }> = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    <p className="text-sm text-green-600 mt-2">{change}</p>
  </div>
);

const FleetStatusTable: React.FC = () => {
  const getStatusClass = (status: Bus['status']) => {
    switch (status) {
      case 'On Route': return 'bg-green-100 text-green-800';
      case 'Parked': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4">Live Fleet Status</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="p-3">Bus ID</th>
                        <th className="p-3">Operator</th>
                        <th className="p-3">Route</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Occupancy</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_BUSES.map(bus => (
                        <tr key={bus.id} className="border-b hover:bg-orange-50">
                            <td className="p-3 font-mono text-sm">{bus.id}</td>
                            <td className="p-3 font-semibold">{bus.operator}</td>
                            <td className="p-3">{bus.from} &rarr; {bus.to}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(bus.status)}`}>
                                    {bus.status}
                                </span>
                            </td>
                            <td className="p-3 text-right font-semibold">{bus.occupancy}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Analytics Overview' },
    { id: 'fleet', label: 'Fleet Management' },
    { id: 'performance', label: 'Route Performance' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Management Dashboard</h2>
        <div>
          <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Today</option>
          </select>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
              {tabs.map(tab => (
                  <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-1 border-b-2 font-medium text-lg transition-colors ${
                        activeTab === tab.id
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                      {tab.label}
                  </button>
              ))}
          </nav>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Bookings (Month)" value="1,284" change="+12% from last month" />
            <StatCard title="Total Revenue (Month)" value="6,420,000 RWF" change="+8% from last month" />
            <StatCard title="Active Routes" value="12" change="+2 new routes" />
            <StatCard title="Customer Satisfaction" value="95%" change="+1.5% from last month" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Bookings Overview (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={DASHBOARD_DATA.bookingsOverTime} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#ea580c" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Operator Market Share</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={DASHBOARD_DATA.operatorMarketShare} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {DASHBOARD_DATA.operatorMarketShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {activeTab === 'fleet' && (
        <FleetStatusTable />
      )}

      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4">Revenue by Route</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={DASHBOARD_DATA.revenueByRoute} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={120}/>
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()} RWF`} />
                        <Legend />
                        <Bar dataKey="revenue" fill="#f97316" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4">Occupancy Rate by Route</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={DASHBOARD_DATA.occupancyByRoute} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis unit="%" />
                        <Tooltip formatter={(value: number) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="occupancy" fill="#fb923c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      )}
    </div>
  );
};