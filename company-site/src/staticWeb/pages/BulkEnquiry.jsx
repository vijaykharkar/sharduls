import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Phone, Mail, Send, Package, Clock, Shield, Building2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const BulkEnquiry = () => {
  const pageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    product_category: '',
    product_name: '',
    quantity: '',
    unit: 'pieces',
    delivery_timeline: '',
    description: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = pageRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/enquiry/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to submit enquiry');
      }

      setIsSubmitted(true);
      setFormData({
        company_name: '',
        contact_person: '',
        email: '',
        phone: '',
        product_category: '',
        product_name: '',
        quantity: '',
        unit: 'pieces',
        delivery_timeline: '',
        description: '',
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const productCategories = [
    'Cable Management',
    'Earthing Accessories',
    'Lugs & Connectors',
    'Switchboard Components',
    'Electrical Components',
    'Fixings & Fasteners',
    'High Precision Parts',
    'CNC Components',
    'Thermo Plastic Parts',
    'Sub Assembly Parts',
    'Kitting Parts',
    'Springs',
    'Silver Plating',
    '3D Printing',
    'Other',
  ];

  const benefits = [
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Competitive Pricing',
      description: 'Get the best bulk rates directly from manufacturer',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24hr Response',
      description: 'Our team responds to every enquiry within 24 hours',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Quality Assured',
      description: 'ISO 9001 certified manufacturing and quality control',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Custom Solutions',
      description: 'Tailored manufacturing to meet your specific requirements',
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="scroll-animate flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#d4a853] rounded-xl flex items-center justify-center">
              <Send className="text-[#1a3a5c]" size={32} />
            </div>
          </div>
          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            BULK ORDERS
          </span>
          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Bulk </span>
            <span className="text-[#d4a853]">Enquiry</span>
          </h1>
          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Submit your bulk order requirements and receive competitive quotes from our expert team. We specialize in high-volume manufacturing with consistent quality and on-time delivery.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, index) => (
              <div key={index} className="scroll-animate flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-[#d4a853]/10 rounded-xl flex items-center justify-center text-[#d4a853] mb-3">
                  {item.icon}
                </div>
                <h3 className="text-[#1a3a5c] font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">SUBMIT YOUR REQUIREMENTS</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Get a Quote Today</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Fill in the details below and our sales team will get back to you with a competitive quote.
          </p>

          {isSubmitted ? (
            <div className="scroll-animate bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a3a5c] mb-4">Enquiry Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Thank you for your enquiry. Our team will review your requirements and get back to you within 24 hours with a competitive quote.
              </p>
              <p className="text-gray-500 text-sm mb-8">A confirmation email has been sent to your email address.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#d4a853] hover:bg-[#c49843] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <div className="scroll-animate bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#1a3a5c] to-[#102a43] p-6">
                <h3 className="text-xl font-bold text-white">Enquiry Form</h3>
                <p className="text-gray-300 text-sm">Fields marked with * are required</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Company & Contact */}
                <div>
                  <h4 className="text-[#1a3a5c] font-bold mb-4 text-sm uppercase tracking-wider">Company Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Person *</label>
                      <input
                        type="text"
                        name="contact_person"
                        value={formData.contact_person}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Product Details */}
                <div>
                  <h4 className="text-[#1a3a5c] font-bold mb-4 text-sm uppercase tracking-wider">Product Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Category *</label>
                      <select
                        name="product_category"
                        value={formData.product_category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition bg-white"
                        required
                      >
                        <option value="">Select Category</option>
                        {productCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name / Part No. *</label>
                      <input
                        type="text"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity Required *</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="e.g. 5000"
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition"
                          required
                          min="1"
                        />
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          className="w-28 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition bg-white"
                        >
                          <option value="pieces">Pieces</option>
                          <option value="kg">Kg</option>
                          <option value="meters">Meters</option>
                          <option value="sets">Sets</option>
                          <option value="lots">Lots</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery Timeline</label>
                      <select
                        name="delivery_timeline"
                        value={formData.delivery_timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition bg-white"
                      >
                        <option value="">Select Timeline</option>
                        <option value="1-2 weeks">1-2 Weeks</option>
                        <option value="2-4 weeks">2-4 Weeks</option>
                        <option value="1-2 months">1-2 Months</option>
                        <option value="2-3 months">2-3 Months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Specifications / Requirements</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Please provide detailed specifications, drawings, material requirements, tolerances, surface finish, packaging needs, etc."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#d4a853] hover:bg-[#c49843] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">NEED HELP?</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Prefer to Talk Directly?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our sales team is available to discuss your requirements in detail and provide expert guidance.
          </p>
          <div className="scroll-animate flex flex-wrap justify-center gap-4">
            <a href="tel:+919175582622" className="flex items-center gap-2 bg-[#d4a853] hover:bg-[#c49843] text-white px-6 py-3 rounded font-semibold transition-colors">
              <Phone size={18} /> +91 9175582622
            </a>
            <a href="mailto:director@shardulge.com" className="flex items-center gap-2 bg-transparent border-2 border-white hover:border-[#d4a853] hover:text-[#d4a853] text-white px-6 py-3 rounded font-semibold transition-colors">
              <Mail size={18} /> director@shardulge.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BulkEnquiry;
