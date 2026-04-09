import React from 'react';
import { CheckCircle, ArrowRight, Users, CreditCard, Headphones, BarChart3, Megaphone, ShieldCheck } from 'lucide-react';

const BecomeSupplier = () => {
  const benefits = [
    { icon: <Users size={24} />, title: 'Reach Millions of Buyers', description: 'Connect with verified businesses across India looking for your products' },
    { icon: <ShieldCheck size={24} />, title: 'Zero Commission', description: 'List your products for free with no hidden charges or commissions' },
    { icon: <CreditCard size={24} />, title: 'Quick Payments', description: 'Get paid on time with our secure payment system' },
    { icon: <Headphones size={24} />, title: 'Business Support', description: 'Dedicated account manager to help grow your business' },
    { icon: <Megaphone size={24} />, title: 'Marketing Tools', description: 'Promote your products with our marketing and advertising tools' },
    { icon: <BarChart3 size={24} />, title: 'Analytics Dashboard', description: 'Track your sales, orders, and performance in real-time' },
  ];

  const steps = [
    { step: '1', title: 'Register Your Business', description: 'Fill out the registration form with your business details' },
    { step: '2', title: 'Get Verified', description: 'Our team will verify your business documents within 24-48 hours' },
    { step: '3', title: 'List Your Products', description: 'Upload your product catalog and set competitive prices' },
    { step: '4', title: 'Start Selling', description: 'Receive orders from verified buyers and grow your business' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-navy-500 to-navy-900 text-white py-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-gold-400/10 text-gold-400 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">For Suppliers</span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Become a Supplier</h1>
            <p className="text-lg mb-8 text-white/70">
              Join India's fastest-growing B2B marketplace and reach millions of buyers
            </p>
            <a
              href="http://localhost:5174/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-400 hover:bg-gold-500 text-white rounded-xl font-bold transition-colors"
            >
              Register Now <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-500 text-center mb-10">Why Sell on SHARDUL-GE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-soft hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 bg-gold-400/10 rounded-xl flex items-center justify-center text-gold-400 mb-4">{b.icon}</div>
                <h3 className="font-bold text-navy-500 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-500 text-center mb-10">How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-soft transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-navy-500 to-navy-700 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-navy-500 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-navy-500 to-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Start Selling?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Join thousands of suppliers already growing their business with us
          </p>
          <a
            href="http://localhost:5174/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-400 hover:bg-gold-500 text-white rounded-xl font-bold transition-colors"
          >
            Register as Supplier <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default BecomeSupplier;
