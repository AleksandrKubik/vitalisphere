import React, { useState } from 'react';
import { X, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const legalLinks = [
    {
      title: 'Terms of Service',
      path: '/terms',
      description: 'Our terms and conditions for using the service'
    },
    {
      title: 'Privacy Policy',
      path: '/privacy',
      description: 'How we collect, use, and protect your data'
    },
    {
      title: 'Cookie Policy',
      path: '/cookies',
      description: 'Information about cookies and tracking technologies'
    },
    {
      title: 'Subscription Terms',
      path: '/subscription-terms',
      description: 'Terms and conditions for subscription services'
    },
    {
      title: 'Cancellation & Refund Policy',
      path: '/refund',
      description: 'Our policies for cancellations and refunds'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Legal Information</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {legalLinks.map((link) => (
              <div
                key={link.path}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {link.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Link>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Company Information */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Company Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>VITALISPHERE LIMITED</strong></p>
              <p>2314, Nicosia, Cyprus, Glyfou, 29A</p>
              <p>Email: <a href="mailto:help@vitalisphereltd.com" className="text-blue-600 hover:text-blue-700">help@vitalisphereltd.com</a></p>
              <p>Website: <a href="https://edfuncontent.com" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">https://edfuncontent.com</a></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} VITALISPHERE LIMITED. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal; 