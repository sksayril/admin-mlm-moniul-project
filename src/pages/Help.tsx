import React, { useState } from 'react';
import { BookOpen, FileQuestion, LifeBuoy, Mail, MessageCircle, Phone, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: 'How do I reset a user\'s password?',
      answer: 'Navigate to the Users page, find the user, click on their profile, and select "Reset Password". An email will be sent to the user with reset instructions.'
    },
    {
      id: 2,
      question: 'How can I approve deposit requests?',
      answer: 'Go to the Deposits page, review the pending requests, and click "Approve" or "Reject" for each request. You can also bulk approve multiple requests.'
    },
    {
      id: 3,
      question: 'What should I do if I notice suspicious activity?',
      answer: 'Check the Security page for alerts, review the transaction history, and if necessary, temporarily suspend the user account while investigating.'
    },
    {
      id: 4,
      question: 'How do I generate reports?',
      answer: 'Visit the Reports page, select your desired date range and report type, then click "Generate". Reports will be available for download once processed.'
    },
    {
      id: 5,
      question: 'Can I customize notification settings?',
      answer: 'Yes, go to Settings > Notifications to configure email alerts, push notifications, and security alerts according to your preferences.'
    }
  ];

  const helpCategories = [
    {
      title: 'User Management',
      icon: Book,
      color: 'bg-blue-500',
      articles: [
        'Adding new users',
        'Managing user roles',
        'User verification process',
        'Handling user complaints'
      ]
    },
    {
      title: 'Financial Operations',
      icon: Book,
      color: 'bg-green-500',
      articles: [
        'Processing deposits',
        'Handling withdrawals',
        'Transaction monitoring',
        'Financial reporting'
      ]
    },
    {
      title: 'Security & Compliance',
      icon: Book,
      color: 'bg-red-500',
      articles: [
        'Security best practices',
        'Compliance requirements',
        'Fraud detection',
        'Data protection'
      ]
    },
    {
      title: 'System Administration',
      icon: Book,
      color: 'bg-purple-500',
      articles: [
        'System configuration',
        'Backup procedures',
        'Performance monitoring',
        'Troubleshooting'
      ]
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
        <p className="text-gray-600 mt-1">Find answers and get assistance</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Live Chat</h3>
              <p className="text-sm text-gray-600">Get instant help from our support team</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email Support</h3>
              <p className="text-sm text-gray-600">Send us a detailed message</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone Support</h3>
              <p className="text-sm text-gray-600">Call us for urgent issues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <a
                      href="#"
                      className="flex items-center justify-between text-gray-600 hover:text-sky-600 transition-colors py-1"
                    >
                      <span>{article}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 support@example.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>🕒 Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Emergency Support</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 emergency@example.com</p>
              <p>📞 +1 (555) 999-0000</p>
              <p>🕒 24/7 for critical issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;