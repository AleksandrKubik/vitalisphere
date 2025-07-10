import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, FileText, Shield, Cookie, CreditCard, Crown } from 'lucide-react';
import LegalModal from './LegalModal';

const LegalSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const legalDocuments = [
    {
      title: 'Terms of Service',
      path: '/terms',
      description: 'Our terms and conditions for using the service',
      icon: <FileText className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      title: 'Privacy Policy',
      path: '/privacy',
      description: 'How we collect, use, and protect your data',
      icon: <Shield className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      title: 'Cookie Policy',
      path: '/cookies',
      description: 'Information about cookies and tracking technologies',
      icon: <Cookie className="h-5 w-5" />,
      color: 'text-orange-600'
    },
    {
      title: 'Subscription Terms',
      path: '/subscription-terms',
      description: 'Terms and conditions for subscription services',
      icon: <Crown className="h-5 w-5" />,
      color: 'text-indigo-600'
    },
    {
      title: 'Cancellation & Refund Policy',
      path: '/refund',
      description: 'Our policies for cancellations and refunds',
      icon: <CreditCard className="h-5 w-5" />,
      color: 'text-purple-600'
    }
  ];

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal Information</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Important legal documents and policies that govern your use of our service. 
              We're committed to transparency and protecting your rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {legalDocuments.map((doc) => (
              <div
                key={doc.path}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg bg-gray-100 ${doc.color}`}>
                    {doc.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {doc.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {doc.description}
                </p>
                
                <Link
                  to={doc.path}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Read More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="h-5 w-5 mr-2" />
              View All Legal Documents
            </button>
          </div>

          {/* Company Information */}
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Contact Details</h4>
                <div className="space-y-2 text-gray-600">
                  <p><strong>VITALISPHERE LIMITED</strong></p>
                  <p>2314, Nicosia, Cyprus</p>
                  <p>Glyfou, 29A</p>
                  <p>Email: <a href="mailto:help@vitalisphereltd.com" className="text-blue-600 hover:text-blue-700">help@vitalisphereltd.com</a></p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Service Information</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Website: <a href="https://edfuncontent.com" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">https://edfuncontent.com</a></p>
                  <p>Service: ContentHubMedia Platform</p>
                  <p>Jurisdiction: Cyprus</p>
                  <p>Last Updated: January 15, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LegalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default LegalSection; 