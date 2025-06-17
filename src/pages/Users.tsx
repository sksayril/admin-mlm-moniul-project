import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, UserPlus, Eye, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';

// Define the types based on the API response
interface ApiUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  subscription: {
    active: boolean;
    expiryDate: string | null;
    plan: string | null;
  };
  tpin: {
    active: boolean;
    requestDate: string | null;
  };
  paymentDetails: {
    paymentId: string;
    amount: number;
    currency: string;
    status: string;
    screenshot: string;
    date: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  results: number;
  data: {
    users: ApiUser[];
  };
}

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get auth token from local storage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get<ApiResponse>('https://api.forlifetradingindia.life/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUsers(response.data.data.users);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'An error occurred fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  

  // Helper function to determine user status based on subscription
  const getUserStatus = (user: ApiUser): 'active' | 'inactive' => {
    return user.subscription && user.subscription.active ? 'active' : 'inactive';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const userStatus = getUserStatus(user);
    const matchesStatus = statusFilter === 'all' || userStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading users...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error loading users</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor user accounts</p>
        </div>
        <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:from-sky-500 hover:to-sky-600 transform hover:scale-105 transition-all duration-200">
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Role</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Join Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Last Login</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      getUserStatus(user) === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {getUserStatus(user)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-sky-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-sky-500 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default Users;