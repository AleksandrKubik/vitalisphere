import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "What is ContentHubMedia?",
      answer: "ContentHubMedia is an all-in-one platform that brings together videos, music, articles, courses, and games in a single subscription. It's designed to be your go-to destination for entertainment, education, and inspiration."
    },
    {
      question: "How much does ContentHubMedia cost?",
      answer: "ContentHubMedia Premium costs $49.99 per month. We offer a 1-day trial for just $0.01 so you can experience all the premium features before committing to a full subscription."
    },
    {
      question: "Can I access ContentHubMedia on multiple devices?",
      answer: "Yes, you can access ContentHubMedia on any device with a web browser. We also have dedicated apps for iOS and Android devices, allowing you to enjoy your content wherever you go."
    },
    {
      question: "Is there a limit to how much content I can consume?",
      answer: "No, your subscription gives you unlimited access to all content on the platform. Watch as many videos, listen to as much music, read as many articles, take as many courses, and play as many games as you want."
    },
    {
      question: "Can I download content for offline viewing?",
      answer: "Yes, Premium subscribers can download videos, music, articles, and course materials for offline access. This is perfect for when you're traveling or in areas with limited internet connectivity."
    },
    {
      question: "How often is new content added?",
      answer: "We add new content daily across all categories. Our team works with creators and publishers to ensure a steady stream of fresh, high-quality content for our users."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. There are no long-term commitments or cancellation fees. You can cancel your subscription at any time, and you'll continue to have access until the end of your current billing period. If you have any question regarding your subscription please contact our support team help@vitalisphereltd.com."
    },
    {
      question: "Is ContentHubMedia available in my country?",
      answer: "ContentHubMedia is available in most countries worldwide. Some content may vary by region due to licensing restrictions, but we strive to provide a consistent experience for all users regardless of location."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about ContentHubMedia and our subscription service.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-xl overflow-hidden ${openIndex === index ? 'border-blue-300 shadow-md' : 'border-gray-200'}`}
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`px-6 pb-4 text-gray-600 ${openIndex === index ? 'block' : 'hidden'}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help.
            </p>
            <a 
              href="mailto:help@vitalisphereltd.com" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
