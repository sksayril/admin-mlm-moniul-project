import React from 'react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle, Key, UserCheck } from 'lucide-react';

const Security: React.FC = () => {
  const securityAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Multiple Failed Login Attempts',
      description: 'User john.doe@example.com has 5 failed login attempts',
      time: '2 minutes ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Device Login',
      description: 'Admin login from new device detected',
      time: '15 minutes ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'critical',
      title: 'Suspicious Transaction Pattern',
      description: 'Unusual withdrawal pattern detected for user ID: 12345',
      time: '1 hour ago',
      severity: 'high'
    }
  ];

  const securityMetrics = [
    {
      title: 'Active Sessions',
      value: '247',
      icon: UserCheck,
      color: 'bg-blue-500',
      status: 'normal'
    },
    {
      title: 'Failed Logins (24h)',
      value: '12',
      icon: XCircle,
      color: 'bg-red-500',
      status: 'warning'
    },
    {
      title: 'Security Score',
      value: '94%',
      icon: Shield,
      color: 'bg-green-500',
      status: 'good'
    },
    {
      title: '2FA Enabled Users',
      value: '89%',
      icon: Key,
      color: 'bg-purple-500',
      status: 'good'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Eye className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertBadge = (severity: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize";
    switch (severity) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-800`;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Security Center</h1>
        <p className="text-gray-600 mt-1">Monitor and manage platform security</p>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.color}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`w-3 h-3 rounded-full ${
                metric.status === 'good' ? 'bg-green-400' :
                metric.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
              }`}></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Security Alerts and Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Security Alerts</h2>
            <AlertTriangle className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800">{alert.title}</p>
                    <span className={getAlertBadge(alert.severity)}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 text-sm text-sky-600 hover:bg-sky-50 rounded-lg transition-colors font-medium">
            View All Alerts
          </button>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-600">Enhanced login security</p>
                </div>
              </div>
              <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                Configure
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">SSL/TLS Encryption</p>
                  <p className="text-xs text-gray-600">Data transmission security</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Login Attempt Monitoring</p>
                  <p className="text-xs text-gray-600">Track failed login attempts</p>
                </div>
              </div>
              <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                Review
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">IP Whitelist</p>
                  <p className="text-xs text-gray-600">Restrict access by IP address</p>
                </div>
              </div>
              <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                Setup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Security Events</h2>
          <Eye className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Event</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">IP Address</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800">Login Attempt</td>
                <td className="py-3 px-4 text-sm text-gray-600">admin@example.com</td>
                <td className="py-3 px-4 text-sm text-gray-600">192.168.1.100</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Success
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">2 minutes ago</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800">Failed Login</td>
                <td className="py-3 px-4 text-sm text-gray-600">john.doe@example.com</td>
                <td className="py-3 px-4 text-sm text-gray-600">203.0.113.45</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Failed
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">5 minutes ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Security;