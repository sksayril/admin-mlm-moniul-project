import React, { useState, useEffect } from 'react';
import { Users, ArrowDownToLine, ArrowUpFromLine, TrendingUp, DollarSign, Activity, Loader2 } from 'lucide-react';
import { DashboardResponse, DashboardStats } from '../types/dashboard';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setIsLoading(false);
          return;
        }

        const response = await fetch('https://api.forlifetradingindia.life/api/admin/dashboard/stats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching dashboard data: ${response.statusText}`);
        }

        const data: DashboardResponse = await response.json();
        if (data.status === 'success') {
          setDashboardData(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred fetching dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = dashboardData ? [
    {
      title: 'Total Users',
      value: dashboardData.userStats.totalUsers.toLocaleString(),
      change: `${dashboardData.userStats.newUsers > 0 ? '+' : ''}${dashboardData.userStats.newUsers} new`,
      changeType: dashboardData.userStats.newUsers >= 0 ? 'positive' : 'negative',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Subscriptions',
      value: dashboardData.userStats.activeSubscriptions.toLocaleString(),
      change: `${dashboardData.userStats.pendingSubscriptions} pending`,
      changeType: 'neutral',
      icon: ArrowDownToLine,
      color: 'bg-green-500'
    },
    {
      title: 'Active T-pins',
      value: dashboardData.userStats.activeTpins.toLocaleString(),
      change: `${dashboardData.userStats.pendingTpins} pending`,
      changeType: 'neutral',
      icon: ArrowUpFromLine,
      color: 'bg-orange-500'
    },
    {
      title: 'Total Revenue',
      value: `$${dashboardData.financialStats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: `${dashboardData.financialStats.transactionsInPeriod} transactions`,
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'MLM Income',
      value: `$${(dashboardData.mlmStats.totalDirectIncome + dashboardData.mlmStats.totalMatrixIncome + dashboardData.mlmStats.totalSelfIncome).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: `${dashboardData.mlmStats.activeReferrers} active referrers`,
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-emerald-500'
    }
  ] : [];

    // We could fetch real activities from an API endpoint if available
  // Generate activity entries based on dashboard data instead of using mock data
  const recentActivities = dashboardData ? [
    { id: 1, action: `${dashboardData.userStats.newUsers} new user registrations`, user: 'Today', time: new Date().toLocaleTimeString() },
    { id: 2, action: `${dashboardData.financialStats.transactionsInPeriod} transactions processed`, user: 'Revenue', time: `$${dashboardData.financialStats.revenueInPeriod.toFixed(2)}` },
    { id: 3, action: `${dashboardData.userStats.activeSubscriptions} active subscriptions`, user: 'Subscriptions', time: `${dashboardData.userStats.pendingSubscriptions} pending` },
    { id: 4, action: `${dashboardData.mlmStats.activeReferrers} active referrers`, user: 'MLM', time: `Team size: ${dashboardData.mlmStats.totalTeamSize}` },
    { id: 5, action: `Total withdrawals pending: ${dashboardData.financialStats.totalWithdrawals.pending.count}`, user: 'Withdrawals', time: `$${dashboardData.financialStats.totalWithdrawals.pending.totalAmount.toFixed(2)}` },
  ] : [];

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <Loader2 className="w-12 h-12 text-sky-500 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl max-w-md text-center">
          <p className="font-medium mb-2">Error loading dashboard</p>
          <p className="text-sm">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'text-green-700 bg-green-100' 
                  : stat.changeType === 'negative'
                  ? 'text-red-700 bg-red-100'
                  : 'text-blue-700 bg-blue-100'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-sky-100 text-sky-600 rounded-lg">7D</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">30D</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">90D</button>
            </div>
          </div>
          
          {dashboardData && dashboardData.chartData ? (
            <div className="h-64 bg-gradient-to-t from-sky-50 to-transparent rounded-lg flex flex-col items-center justify-center border-2 border-sky-200 p-4">
              {/* A basic chart visualization using the data from chartData */}
              <div className="w-full h-full flex items-end justify-between space-x-1">
                {dashboardData.chartData.labels.slice(-10).map((label: string, index: number) => {
                  const revenue = dashboardData.chartData.datasets.revenue[dashboardData.chartData.datasets.revenue.length - 10 + index] || 0;
                  const maxRevenue = Math.max(...dashboardData.chartData.datasets.revenue.filter(val => typeof val === 'number')) || 1;
                  const normalizedHeight = revenue > 0 
                    ? Math.max(10, Math.min(100, (revenue / maxRevenue) * 100))
                    : 5;
                  
                  return (
                    <div key={label} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-sky-400 rounded-t-sm" 
                        style={{ height: `${normalizedHeight}%` }}
                        title={`$${revenue.toFixed(2)}`}
                      ></div>
                      {index % 3 === 0 && (
                        <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                          {new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-gray-700">
                  Recent Revenue: ${dashboardData.financialStats.revenueInPeriod.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-64 bg-gradient-to-t from-sky-50 to-transparent rounded-lg flex items-center justify-center border-2 border-dashed border-sky-200">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-sky-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">Revenue Chart</p>
                <p className="text-sm text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          
          {dashboardData ? (
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-2 h-2 bg-sky-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-600 truncate">{activity.user}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500">No activity data available</p>
            </div>
          )}
          
          <button className="w-full mt-4 py-2 text-sm text-sky-600 hover:bg-sky-50 rounded-lg transition-colors font-medium">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;