import React from 'react';
import { TrendingUp, Users, DollarSign, Activity, BarChart3, PieChart, LineChart } from 'lucide-react';

const Analytics: React.FC = () => {
  const metrics = [
    {
      title: 'Revenue Growth',
      value: '+23.5%',
      change: '+4.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'User Acquisition',
      value: '+18.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Transaction Volume',
      value: '$2.4M',
      change: '+12.8%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Platform Activity',
      value: '94.2%',
      change: '-1.2%',
      changeType: 'negative',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.color}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                metric.changeType === 'positive' 
                  ? 'text-green-700 bg-green-100' 
                  : 'text-red-700 bg-red-100'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Trends</h2>
            <LineChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-t from-sky-50 to-transparent rounded-lg flex items-center justify-center border-2 border-dashed border-sky-200">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-sky-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Revenue Line Chart</p>
              <p className="text-sm text-gray-500">Interactive chart would display here</p>
            </div>
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">User Distribution</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-t from-purple-50 to-transparent rounded-lg flex items-center justify-center border-2 border-dashed border-purple-200">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">User Pie Chart</p>
              <p className="text-sm text-gray-500">Distribution visualization</p>
            </div>
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Transaction Volume</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-t from-green-50 to-transparent rounded-lg flex items-center justify-center border-2 border-dashed border-green-200">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Volume Bar Chart</p>
              <p className="text-sm text-gray-500">Monthly transaction data</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Performance Metrics</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Success Rate</span>
              <span className="text-sm font-bold text-green-600">98.5%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Response Time</span>
              <span className="text-sm font-bold text-blue-600">1.2s</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Uptime</span>
              <span className="text-sm font-bold text-purple-600">99.9%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;