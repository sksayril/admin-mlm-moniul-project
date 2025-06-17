import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  // Settings,
  // BarChart3,
  // CreditCard,
  // Shield,
  // Bell,
  // FileText,
  // HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Key
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, isCollapsed, onCollapse }) => {
  const { logout, user } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/deposits', icon: ArrowDownToLine, label: 'Deposit Requests' },
    { path: '/tpin-requests', icon: Key, label: 'TPIN Requests' },
    { path: '/withdrawals', icon: ArrowUpFromLine, label: 'Withdrawal Requests' },
    // { path: '/transactions', icon: CreditCard, label: 'Transactions' },
    // { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    // { path: '/security', icon: Shield, label: 'Security' },
    // { path: '/notifications', icon: Bell, label: 'Notifications' },
    // { path: '/reports', icon: FileText, label: 'Reports' },
    // { path: '/settings', icon: Settings, label: 'Settings' },
    // { path: '/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-lg
        ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
        w-64 border-r border-gray-200
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className={`flex items-center space-x-3 transition-all duration-300 ${isCollapsed ? 'lg:justify-center lg:space-x-0' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-800 lg:block">Admin Panel</h1>
            )}
          </div>
          
          {/* Desktop collapse button */}
          <button
            onClick={onCollapse}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-3 px-4'} py-3 rounded-xl transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600 hover:transform hover:scale-105'
                }
              `}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          {!isCollapsed ? (
            <>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {user?.name.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name.charAt(0) || 'A'}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group relative"
              >
                <LogOut className="w-4 h-4" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;