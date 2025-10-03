// src/pages/TermsOfService.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Effective date: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>By accessing or using our website, you agree to be bound by these Terms...</p>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 mt-8">1. Acceptance of Terms</h2>
            <p>These Terms of Service constitute a legally binding agreement...</p>
          </section>

          {/* Your terms content */}
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;