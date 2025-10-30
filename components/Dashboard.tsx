
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DASHBOARD_DATA } from '../constants';

const COLORS = ['#ea580c', '#fb923c', '#fdba74', '#fed7aa'];

const StatCard: React.FC<{ title: string; value: string; change: string; }> = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    <p className="text-sm text-green-600 mt-2">{change}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Management Dashboard</h2>
      
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
              <Pie
                data={DASHBOARD_DATA.operatorMarketShare}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {DASHBOARD_DATA.operatorMarketShare.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
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
    </div>
  );
};
