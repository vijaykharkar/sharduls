import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const BecomeSupplier = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Become a Supplier</h1>
            <p className="text-xl mb-8 text-green-100">
              Join India's fastest-growing B2B marketplace and reach millions of buyers
            </p>
            <a
              href="http://localhost:5174/supplier/signup"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              <span>Register Now</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sell on SHARDUL-GE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Reach Millions of Buyers',
                description: 'Connect with verified businesses across India looking for your products',
              },
              {
                title: 'Zero Commission',
                description: 'List your products for free with no hidden charges or commissions',
              },
              {
                title: 'Quick Payments',
                description: 'Get paid on time with our secure payment system',
              },
              {
                title: 'Business Support',
                description: 'Dedicated account manager to help grow your business',
              },
              {
                title: 'Marketing Tools',
                description: 'Promote your products with our marketing and advertising tools',
              },
              {
                title: 'Analytics Dashboard',
                description: 'Track your sales, orders, and performance in real-time',
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Register Your Business',
                  description: 'Fill out the registration form with your business details',
                },
                {
                  step: '2',
                  title: 'Get Verified',
                  description: 'Our team will verify your business documents within 24-48 hours',
                },
                {
                  step: '3',
                  title: 'List Your Products',
                  description: 'Upload your product catalog and set competitive prices',
                },
                {
                  step: '4',
                  title: 'Start Selling',
                  description: 'Receive orders from verified buyers and grow your business',
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of suppliers already growing their business with us
          </p>
          <a
            href="http://localhost:5174/supplier/signup"
            className="inline-block px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Register as Supplier
          </a>
        </div>
      </section>
    </div>
  );
};

export default BecomeSupplier;
