import React, { useState } from 'react';
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [reportType, setReportType] = useState('all');

  const reportTemplates = [
    {
      id: 1,
      name: 'User Activity Report',
      description: 'Comprehensive user engagement and activity metrics',
      icon: BarChart3,
      color: 'bg-blue-500',
      lastGenerated: '2024-01-20',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Financial Summary',
      description: 'Revenue, deposits, withdrawals, and transaction analysis',
      icon: TrendingUp,
      color: 'bg-green-500',
      lastGenerated: '2024-01-19',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Security Audit',
      description: 'Security events, failed logins, and threat analysis',
      icon: PieChart,
      color: 'bg-red-500',
      lastGenerated: '2024-01-18',
      size: '956 KB'
    },
    {
      id: 4,
      name: 'Performance Metrics',
      description: 'System performance, uptime, and response times',
      icon: BarChart3,
      color: 'bg-purple-500',
      lastGenerated: '2024-01-17',
      size: '1.2 MB'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Monthly User Report - January 2024',
      type: 'User Activity',
      generatedAt: '2024-01-20T10:00:00Z',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Financial Summary - Q4 2023',
      type: 'Financial',
      generatedAt: '2024-01-19T15:30:00Z',
      size: '3.1 MB',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Security Audit - Weekly',
      type: 'Security',
      generatedAt: '2024-01-18T09:00:00Z',
      size: '1.5 MB',
      status: 'processing'
    }
  ];

  const handleGenerateReport = (templateId: number) => {
    console.log('Generating report for template:', templateId);
  };

  const handleDownloadReport = (reportId: number) => {
    console.log('Downloading report:', reportId);
  };

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Generate and download comprehensive reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">24</p>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">156</p>
              <p className="text-sm text-gray-600">Downloads</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">7</p>
              <p className="text-sm text-gray-600">Scheduled</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">12.8 MB</p>
              <p className="text-sm text-gray-600">Total Size</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Generate New Report</h2>
        
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="lastyear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Data</option>
              <option value="users">Users Only</option>
              <option value="financial">Financial Only</option>
              <option value="security">Security Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${template.color}`}>
                  <template.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-800 truncate">{template.name}</h3>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">{template.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>Last: {template.lastGenerated}</span>
                <span>{template.size}</span>
              </div>
              <button
                onClick={() => handleGenerateReport(template.id)}
                className="w-full bg-sky-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                Generate
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-800">Report Name</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-800">Type</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-800">Generated</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-800">Size</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-800">Status</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-800">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(report.generatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{report.size}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {report.status === 'completed' ? (
                      <button
                        onClick={() => handleDownloadReport(report.id)}
                        className="inline-flex items-center space-x-1 text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500">Processing...</span>
                    )}
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

export default Reports;