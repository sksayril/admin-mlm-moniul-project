import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  AlertCircle,
  Check,
  RefreshCw
} from 'lucide-react';

// Interface for TPIN request data
interface TpinRequest {
  _id: string;
  name: string;
  email: string;
  subscription: {
    active: boolean;
    plan: string;
    expiryDate: string;
  };
  tpin: {
    active: boolean;
    requestDate: string;
  };
}

const TpinRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tpinRequests, setTpinRequests] = useState<TpinRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Fetch TPIN requests
  const fetchTpinRequests = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      // Get auth token from local storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('https://api.forlifetradingindia.life/api/admin/tpin/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setTpinRequests(data.data.pendingRequests || []);
        setLastRefreshed(new Date());
      }
    } catch (error) {
      console.error('Error fetching TPIN requests:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTpinRequests();
  }, []);
  
  // Handle manual refresh
  const handleRefresh = () => {
    fetchTpinRequests(true);
  };

  // Handle TPIN approval
  const handleApprove = async (userId: string) => {
    try {
      // Get auth token from local storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('https://api.forlifetradingindia.life/api/admin/tpin/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('🎉 TPIN request approved successfully! User has been notified.');
        fetchTpinRequests(); // Refresh the list
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        console.error('TPIN approval failed:', result);
      }
    } catch (error) {
      console.error('Error approving TPIN request:', error);
    }
  };

  const filteredRequests = tpinRequests.filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get subscription badge class
  const getSubscriptionBadgeClass = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      case 'basic':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">TPIN Requests</h1>
      
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="bg-sky-50 p-3 rounded-full">
            <AlertCircle className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{tpinRequests.length}</p>
            <p className="text-sm text-gray-600">Pending TPIN Requests</p>
          </div>
        </div>
      </div>

      {/* TPIN Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Pending TPIN Requests ({tpinRequests.length})</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </span>
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-1.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No TPIN requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{request.name}</span>
                        <span className="text-sm text-gray-500">{request.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadgeClass(request.subscription.plan)}`}>
                        {request.subscription.plan}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">
                          {formatDate(request.tpin.requestDate)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">
                          {formatDate(request.subscription.expiryDate)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TpinRequests;
