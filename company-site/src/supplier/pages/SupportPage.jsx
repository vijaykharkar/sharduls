import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Send, HelpCircle } from 'lucide-react';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Support request submitted:', formData);
    // TODO: Integrate with API
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Support Center</h1>
        <p className="text-gray-600 mt-2">We're here to help you succeed</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Phone Support</h3>
          <p className="text-gray-600 text-sm mb-3">Mon-Fri, 9AM-6PM IST</p>
          <a href="tel:+911234567890" className="text-blue-600 hover:text-blue-700 font-medium">
            +91 1234567890
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
          <p className="text-gray-600 text-sm mb-3">Response within 24 hours</p>
          <a href="mailto:support@shardul-ge.com" className="text-blue-600 hover:text-blue-700 font-medium">
            support@shardul-ge.com
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm mb-3">Available 24/7</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Start Chat
          </button>
        </div>
      </div>

      {/* Support Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit a Request</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="account">Account & Profile</option>
                <option value="catalog">Catalog Upload</option>
                <option value="orders">Orders & Payments</option>
                <option value="technical">Technical Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please describe your issue or question in detail..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Send className="h-5 w-5" />
            <span>Submit Request</span>
          </button>
        </form>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: 'How long does it take to verify my account?',
              a: 'Account verification typically takes 24-48 hours after you submit all required documents.',
            },
            {
              q: 'What documents do I need to upload?',
              a: 'You need to upload GST certificate, PAN card, and business registration documents.',
            },
            {
              q: 'How do I upload my product catalog?',
              a: 'Download the Excel template, fill in your product details, and upload it through the Catalog section.',
            },
            {
              q: 'When will I receive payments?',
              a: 'Payments are processed within 7-10 business days after order delivery confirmation.',
            },
          ].map((faq, index) => (
            <details key={index} className="border border-gray-200 rounded-lg">
              <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium text-gray-800">
                {faq.q}
              </summary>
              <div className="px-4 py-3 border-t border-gray-200 text-gray-600">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
