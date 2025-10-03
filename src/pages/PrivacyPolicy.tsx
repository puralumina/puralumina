// src/pages/PrivacyPolicy.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            to="/links" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3 mt-8">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us...</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 mt-8">2. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes...</p>
          </section>

          {/* Add more sections as needed */}
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;