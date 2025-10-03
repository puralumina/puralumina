// src/pages/FAQ.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "How do I access my purchased products?",
      answer: "After purchase, you'll receive an email with download links..."
    },
    {
      question: "What is your refund policy?",
      answer: "Due to the digital nature of our products, we don't offer refunds..."
    }
    // Add more FAQ items
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            to="/links" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQ;