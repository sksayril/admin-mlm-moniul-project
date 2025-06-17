import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Eye, 
  Clock, 
  Check,
  User,
  Mail,
  RefreshCw,
  DollarSign
} from 'lucide-react';

// Interface for withdrawal request data
interface WithdrawalRequest {
  userId: string;
  withdrawalId: string;
  userName: string;
  userEmail: string;
  amount: number;
  requestDate: string;
  paymentMethod: string;
  paymentDetails: {
    upiId?: string;
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      accountHolderName: string;
      bankName: string;
    };
  };
  userPaymentMethods: {
    upiId?: string | null;
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      accountHolderName: string;
      bankName: string;
    } | null;
  };
}

const Withdrawals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Fetch pending withdrawal requests
  const fetchWithdrawalRequests = async (isRefresh = false) => {
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

      const response = await fetch('https://api.forlifetradingindia.life/api/admin/mlm/withdrawal/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setWithdrawalRequests(data.data.pendingWithdrawals || []);
        setLastRefreshed(new Date());
      }
    } catch (error) {
      console.error('Error fetching withdrawal requests:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);
  
  // Handle manual refresh
  const handleRefresh = () => {
    fetchWithdrawalRequests(true);
  };

  // Handle withdrawal approval
  const handleApprove = async () => {
    if (!selectedWithdrawal || !transactionId.trim()) {
      return;
    }

    try {
      // Get auth token from local storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('https://api.forlifetradingindia.life/api/admin/mlm/withdrawal/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          userId: selectedWithdrawal.userId,
          withdrawalId: selectedWithdrawal.withdrawalId,
          transactionId: transactionId
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('🎉 Withdrawal approved successfully! User has been notified.');
        fetchWithdrawalRequests(); // Refresh the list
        setShowApprovalModal(false);
        setSelectedWithdrawal(null);
        setTransactionId('');
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        console.error('Withdrawal approval failed:', result);
      }
    } catch (error) {
      console.error('Error approving withdrawal:', error);
    }
  };

  const filteredRequests = withdrawalRequests.filter(request => {
    const matchesSearch = 
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
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

  // Get payment method badge class
  const getPaymentMethodBadgeClass = (method: string) => {
    switch (method.toLowerCase()) {
      case 'upi':
        return 'bg-purple-100 text-purple-800';
      case 'bank':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">MLM Withdrawal Requests</h1>
      
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="bg-yellow-50 p-3 rounded-full">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{withdrawalRequests.length}</p>
            <p className="text-sm text-gray-600">Pending Withdrawals</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              ${withdrawalRequests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Amount</p>
          </div>
        </div>
      </div>

      {/* Withdrawal Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Pending Withdrawal Requests ({withdrawalRequests.length})</h2>
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
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
                    No withdrawal requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request.withdrawalId} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{request.userName}</span>
                        <span className="text-sm text-gray-500">{request.userEmail}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800">
                        ${request.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentMethodBadgeClass(request.paymentMethod)}`}>
                        {request.paymentMethod.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">
                          {formatDate(request.requestDate)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedWithdrawal(request);
                            setShowModal(true);
                          }}
                          className="inline-flex items-center px-3 py-1 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWithdrawal(request);
                            setShowApprovalModal(true);
                          }}
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

      {/* View Details Modal */}
      {showModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Withdrawal Details</h3>
            </div>
            
            <div className="p-6 space-y-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{selectedWithdrawal.userName}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {selectedWithdrawal.userEmail}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Withdrawal Amount</p>
                <p className="text-2xl font-bold text-green-600">${selectedWithdrawal.amount.toLocaleString()}</p>
              </div>

              {/* Payment Details */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Payment Details</p>
                
                {selectedWithdrawal.paymentMethod === 'upi' && selectedWithdrawal.paymentDetails.upiId && (
                  <div>
                    <p className="text-sm font-medium text-gray-800">UPI ID</p>
                    <p className="text-blue-600 font-mono">{selectedWithdrawal.paymentDetails.upiId}</p>
                  </div>
                )}
                
                {selectedWithdrawal.paymentMethod === 'bank' && selectedWithdrawal.paymentDetails.bankDetails && (
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Account Holder</p>
                      <p className="text-gray-600">{selectedWithdrawal.paymentDetails.bankDetails.accountHolderName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Bank Name</p>
                      <p className="text-gray-600">{selectedWithdrawal.paymentDetails.bankDetails.bankName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Account Number</p>
                      <p className="text-gray-600 font-mono">{selectedWithdrawal.paymentDetails.bankDetails.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">IFSC Code</p>
                      <p className="text-gray-600 font-mono">{selectedWithdrawal.paymentDetails.bankDetails.ifscCode}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Request Date */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Requested on {formatDate(selectedWithdrawal.requestDate)}</span>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Approve Withdrawal</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">User: {selectedWithdrawal.userName}</p>
                <p className="text-sm text-gray-600">Amount: ${selectedWithdrawal.amount.toLocaleString()}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setTransactionId('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={!transactionId.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdrawals;