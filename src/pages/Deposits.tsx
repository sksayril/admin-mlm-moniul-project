import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Eye, 
  CheckCircle,
  Clock, 
  DollarSign,
  User,
  Mail,
  XCircle,
  RefreshCw
} from 'lucide-react';

interface PaymentDetails {
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  screenshot: string;
  date: string;
}

interface PendingRequest {
  userId: string;
  userName: string;
  userEmail: string;
  paymentId: string;
  paymentDetails: PaymentDetails;
  subscriptionPlan: string;
}

// Only focusing on pending requests

const Deposits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Only showing pending requests
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PendingRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Fetch pending subscription payment requests
  const fetchPendingRequests = async (isRefresh = false) => {
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

      const response = await fetch('https://api.forlifetradingindia.life/api/admin/subscriptions/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setPendingRequests(data.data.pendingRequests || []);
        setLastRefreshed(new Date());
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // No longer fetching approved requests

  useEffect(() => {
    fetchPendingRequests();
  }, []);
  
  // Handle manual refresh
  const handleRefresh = () => {
    fetchPendingRequests(true);
  };

  // Handle approval
  const handleApprove = async (userId: string, paymentId: string) => {
    try {
      // Get auth token from local storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('https://api.forlifetradingindia.life/api/admin/subscriptions/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, paymentId }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('🎉 Subscription approved successfully! User has been notified.');
        fetchPendingRequests(); // Refresh pending list
        setShowModal(false);
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        console.error('Approval failed:', result);
      }
    } catch (error) {
      console.error('Error approving subscription:', error);
    }
  };

  const filteredRequests = pendingRequests.filter(request => {
    const matchesSearch = 
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.paymentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getPlanBadge = (plan: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize";
    switch (plan.toLowerCase()) {
      case 'premium':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'basic':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <p className="text-green-800 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Subscription Payments</h1>
        <p className="text-gray-600 mt-1">Review and manage user subscription payment requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{pendingRequests.length}</p>
              <p className="text-sm text-gray-600">Pending Reviews</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">-</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-sky-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                0
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Pending Requests ({pendingRequests.length})</h2>
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or payment ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Requests List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">User Details</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Payment Info</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Plan</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
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
                    No pending requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request.paymentId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{request.userName}</p>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span>{request.userEmail}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-800">
                          ${request.paymentDetails.amount} {request.paymentDetails.currency}
                        </div>
                        <div className="text-sm text-gray-600">
                          ID: {request.paymentId}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedImage(`http://localhost:3100${request.paymentDetails.screenshot}`);
                            setShowImageModal(true);
                          }}
                          className="text-xs text-sky-600 hover:text-sky-800 underline"
                        >
                          View Screenshot
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={getPlanBadge(request.subscriptionPlan)}>
                        {request.subscriptionPlan}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">
                          {new Date(request.paymentDetails.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedPayment(request);
                          setShowModal(true);
                        }}
                        className="inline-flex items-center px-3 py-1 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
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

      {/* Review Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Review Payment Request</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">User Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedPayment.userName}</p>
                    <p><span className="font-medium">Email:</span> {selectedPayment.userEmail}</p>
                    <p><span className="font-medium">User ID:</span> {selectedPayment.userId}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Payment Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Amount:</span> ${selectedPayment.paymentDetails.amount} {selectedPayment.paymentDetails.currency}</p>
                    <p><span className="font-medium">Payment ID:</span> {selectedPayment.paymentId}</p>
                    <p><span className="font-medium">Plan:</span> {selectedPayment.subscriptionPlan}</p>
                    <p><span className="font-medium">Date:</span> {new Date(selectedPayment.paymentDetails.date).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Payment Screenshot</h4>
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={`http://localhost:3100${selectedPayment.paymentDetails.screenshot}`}
                    alt="Payment Screenshot"
                    className="w-full max-h-64 object-contain bg-gray-50"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApprove(selectedPayment.userId, selectedPayment.paymentId)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve Payment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <XCircle className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Payment Screenshot"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposits;