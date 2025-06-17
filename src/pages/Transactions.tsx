import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, CreditCard, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  description: string;
}

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const transactions: Transaction[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      type: 'deposit',
      amount: 500,
      currency: 'USD',
      status: 'completed',
      createdAt: '2024-01-20T10:00:00Z',
      description: 'Bank transfer deposit'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      type: 'withdrawal',
      amount: 300,
      currency: 'USD',
      status: 'pending',
      createdAt: '2024-01-20T09:30:00Z',
      description: 'PayPal withdrawal'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Wilson',
      type: 'transfer',
      amount: 150,
      currency: 'USD',
      status: 'completed',
      createdAt: '2024-01-19T15:20:00Z',
      description: 'Internal transfer'
    },
    {
      id: '4',
      userId: '4',
      userName: 'Sarah Johnson',
      type: 'deposit',
      amount: 750,
      currency: 'USD',
      status: 'failed',
      createdAt: '2024-01-19T14:10:00Z',
      description: 'Credit card deposit failed'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
        <p className="text-gray-600 mt-1">Monitor all financial transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <ArrowDownLeft className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {transactions.filter(t => t.type === 'deposit').length}
              </p>
              <p className="text-sm text-gray-600">Deposits</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <ArrowUpRight className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {transactions.filter(t => t.type === 'withdrawal').length}
              </p>
              <p className="text-sm text-gray-600">Withdrawals</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {transactions.filter(t => t.type === 'transfer').length}
              </p>
              <p className="text-sm text-gray-600">Transfers</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-sky-100 rounded-lg">
              <Calendar className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="transfer">Transfers</option>
              </select>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Transaction</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-800">#{transaction.id}</p>
                      <p className="text-sm text-gray-600">{transaction.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {transaction.userName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">{transaction.userName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(transaction.type)}
                      <span className="capitalize text-gray-700">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-semibold ${
                      transaction.type === 'deposit' ? 'text-green-600' : 
                      transaction.type === 'withdrawal' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toLocaleString()} {transaction.currency}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={getStatusBadge(transaction.status)}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;