import React, { useState } from 'react';
import { Send, Clock, Users, ShieldCheck } from 'lucide-react';

const BulkEnquiry = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    product_name: '',
    quantity: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bulk enquiry submitted:', formData);
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400 outline-none transition-all";

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block bg-gold-400/10 text-gold-400 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wider uppercase">Bulk Orders</span>
            <h1 className="text-3xl font-bold text-navy-500 mb-3">Submit Bulk Enquiry</h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Submit your bulk order requirements and get competitive quotes from verified suppliers within 24 hours
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Company Name *</label>
                  <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} className={inputClass} placeholder="Your company name" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Contact Person *</label>
                  <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} className={inputClass} placeholder="Full name" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="email@company.com" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 1234567890" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Product Name *</label>
                  <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} className={inputClass} placeholder="What are you looking for?" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Quantity Required *</label>
                  <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className={inputClass} placeholder="e.g., 1000 units" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-500 mb-1.5">Additional Requirements</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Please provide detailed requirements, specifications, delivery timeline, etc."
                  className={`${inputClass} resize-none`}
                ></textarea>
              </div>

              <button type="submit" className="w-full py-3 bg-gradient-to-r from-navy-500 to-navy-700 text-white rounded-xl font-semibold hover:from-navy-600 hover:to-navy-800 transition-all cursor-pointer flex items-center justify-center gap-2">
                Submit Enquiry <Send size={16} />
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 bg-navy-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock size={22} className="text-navy-500" />
              </div>
              <div className="text-2xl font-bold text-navy-500 mb-1">24h</div>
              <p className="text-gray-500 text-xs">Response Time</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 bg-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users size={22} className="text-gold-400" />
              </div>
              <div className="text-2xl font-bold text-navy-500 mb-1">1000+</div>
              <p className="text-gray-500 text-xs">Verified Suppliers</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheck size={22} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold text-navy-500 mb-1">Free</div>
              <p className="text-gray-500 text-xs">No Hidden Charges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEnquiry;
