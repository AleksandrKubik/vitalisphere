import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img src="/logo.svg" alt="ContentHub Logo" className="h-8 w-auto mr-2" />
                <span className="text-xl font-bold">ContentHubMedia</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The ultimate platform for all your media needs. Videos, music, articles, courses, and games - all in one subscription.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <a href="#video" className="text-gray-400 hover:text-white transition-colors">Videos</a>
                </li>
                <li>
                  <a href="#music" className="text-gray-400 hover:text-white transition-colors">Music</a>
                </li>
                <li>
                  <a href="#articles" className="text-gray-400 hover:text-white transition-colors">Articles</a>
                </li>
                <li>
                  <a href="#courses" className="text-gray-400 hover:text-white transition-colors">Courses</a>
                </li>
                <li>
                  <a href="#games" className="text-gray-400 hover:text-white transition-colors">Games</a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
                </li>
                <li>
                  <Link to="/subscription" className="text-gray-400 hover:text-white transition-colors">Subscription</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">
                    VITALISPHERE LIMITED<br />
                    2314, Nicosia, Cyprus<br />
                    Glyfou, 29A
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">+357 22 123456</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">help@vitalisphereltd.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} VITALISPHERE LIMITED. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center space-x-4">
                <Link to="/terms" className="hover:text-white transition-colors mb-2 md:mb-0">Terms</Link>
                <Link to="/privacy" className="hover:text-white transition-colors mb-2 md:mb-0">Privacy</Link>
                <Link to="/cookies" className="hover:text-white transition-colors mb-2 md:mb-0">Cookies</Link>
                <Link to="/subscription-terms" className="hover:text-white transition-colors mb-2 md:mb-0">Subscription</Link>
                <Link to="/refund" className="hover:text-white transition-colors mb-2 md:mb-0">Refund</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
