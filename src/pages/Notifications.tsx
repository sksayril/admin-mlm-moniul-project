import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, AlertCircle, CheckCircle, Settings, Send } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'system' | 'user' | 'transaction' | 'security';
}

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'info',
      title: 'New User Registration',
      message: 'A new user has registered: jane.smith@example.com',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      category: 'user'
    },
    {
      id: '2',
      type: 'warning',
      title: 'High Transaction Volume',
      message: 'Transaction volume has exceeded normal limits',
      timestamp: '2024-01-20T09:15:00Z',
      read: false,
      category: 'transaction'
    },
    {
      id: '3',
      type: 'success',
      title: 'System Backup Completed',
      message: 'Daily system backup completed successfully',
      timestamp: '2024-01-20T08:00:00Z',
      read: true,
      category: 'system'
    },
    {
      id: '4',
      type: 'error',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected',
      timestamp: '2024-01-19T22:45:00Z',
      read: false,
      category: 'security'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'error':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-800`;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.category === activeTab;
  });

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600 mt-1">Stay updated with system alerts and messages</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 transition-colors">
            <Send className="w-4 h-4" />
            <span>Send Notification</span>
          </button>
          <button className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{notifications.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Mail className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {notifications.filter(n => !n.read).length}
              </p>
              <p className="text-sm text-gray-600">Unread</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {notifications.filter(n => n.type === 'warning' || n.type === 'error').length}
              </p>
              <p className="text-sm text-gray-600">Alerts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {notifications.filter(n => n.read).length}
              </p>
              <p className="text-sm text-gray-600">Read</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Tabs and List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All Notifications' },
              { id: 'unread', label: 'Unread' },
              { id: 'system', label: 'System' },
              { id: 'user', label: 'Users' },
              { id: 'transaction', label: 'Transactions' },
              { id: 'security', label: 'Security' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-800">
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                      )}
                    </h3>
                    <span className={getNotificationBadge(notification.type)}>
                      {notification.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button className="text-xs text-sky-600 hover:text-sky-700 font-medium">
                          Mark as Read
                        </button>
                      )}
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No notifications found</p>
            <p className="text-sm text-gray-400">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;