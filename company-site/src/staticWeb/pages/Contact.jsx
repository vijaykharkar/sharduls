import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Globe, ChevronDown, Upload, FileText } from 'lucide-react';

const Contact = () => {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [attachedFile, setAttachedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({ type: 'error', message: 'File size must be less than 5MB' });
        return;
      }
      setAttachedFile(file);
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      if (attachedFile) {
        formDataToSend.append('file', attachedFile);
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! We will get back to you within 24 hours.' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setAttachedFile(null);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      region: 'India (Asia)',
      icon: '🇮🇳',
      address: 'Shardul-GE Technologies Pvt. Ltd., Office No. 16, Upper Ground Floor, A Wing, Jay Ganesh Samrajya, Spine Road, Bhosari, Pune 411039',
      phone: '+91 9175582622',
      email: 'director@shardulge.com',
      businessHours: 'FOR EXPORT BUSINESS',
      businessHours1: 'FOR DOMESTIC BUSINESS (MRO/CAPEX ITEMS)',
      phone1: '+91 9175572622',
      email1: 'info@shardulge.com',
    },
    {
      region: 'Europe',
      icon: '🇪🇺',
      location: 'Paris, France',
      businessHours: 'SALES & MARKETING REPRESENTATIVE',
      phone: '+33',
      email: 'export@shardulge.com',
    },
    {
      region: 'North America',
      icon: '🇺🇸',
      location: 'Boston, Massachusetts, USA',
      email: 'export@shardulge.com'
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            GET IN TOUCH
          </span>

          <h1 className="scroll-animate delay-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Contact </span>
            <span className="text-[#d4a853]">Us</span>
          </h1>

          <p className="scroll-animate delay-200 text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or ready to partner with us? We're here to help you find the perfect solution.
          </p>
        </div>
      </section>

      {/* Contact Form & Global Presence Section */}
      <section className="py-20 bg-white">
        <div className="w-full mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Global Presence */}
            <div className="scroll-animate">
              <p className="text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                OUR LOCATIONS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-8">
                Global Presence
              </h2>

              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-[#1a3a5c] rounded-xl p-6 text-white"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#d4a853] rounded-lg flex items-center justify-center text-2xl">
                        {office.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{office.region}</h3>
                        {office.location && (
                          <p className="text-gray-400 text-sm">{office.location}</p>
                        )}
                      </div>
                    </div>

                    {office.address && (
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                        {office.address}
                      </p>
                    )}

                    {office.businessHours && (
                      <p className="text-[#d4a853] text-xs font-semibold mb-3 tracking-wide">
                        {office.businessHours}
                      </p>
                    )}

                    <div className="space-y-2">
                      {office.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-[#d4a853]" />
                          <a href={`tel:${office.phone}`} className="hover:text-[#d4a853] transition-colors">
                            {office.phone}
                          </a>
                        </div>
                      )}
                      {office.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={16} className="text-[#d4a853]" />
                          <a href={`mailto:${office.email}`} className="hover:text-[#d4a853] transition-colors">
                            {office.email}
                          </a>
                        </div>
                      )}
                    </div>

                    {office.businessHours1 && (
                      <p className="text-[#d4a853] text-xs font-semibold mb-3 tracking-wide mt-5">
                        {office.businessHours1}
                      </p>
                    )}

                    <div className="space-y-2">
                      {office.phone1 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-[#d4a853]" />
                          <a href={`tel:${office.phone1}`} className="hover:text-[#d4a853] transition-colors">
                            {office.phone1}
                          </a>
                        </div>
                      )}
                      {office.email1 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={16} className="text-[#d4a853]" />
                          <a href={`mailto:${office.email1}`} className="hover:text-[#d4a853] transition-colors">
                            {office.email1}
                          </a>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>

              {/* Quick Contact Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Phone className="mx-auto mb-3 text-[#d4a853]" size={32} />
                  <p className="text-gray-600 text-sm mb-1">Call Us</p>
                  <a href="tel:+919175582622" className="text-[#1a3a5c] font-semibold text-sm hover:text-[#d4a853] transition-colors">
                    +91 9175582622
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Mail className="mx-auto mb-3 text-[#d4a853]" size={32} />
                  <p className="text-gray-600 text-sm mb-1">Email Us</p>
                  <a href="mailto:director@shardulge.com" className="text-[#1a3a5c] font-semibold text-sm hover:text-[#d4a853] transition-colors break-all">
                    director@shardulge.com
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="scroll-animate delay-200">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <p className="text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-2">
                  SEND MESSAGE
                </p>
                <h3 className="text-2xl font-bold text-[#1a3a5c] mb-6">
                  Get in Touch
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Fill out the form below and we will get back to you within <span className="text-[#d4a853] font-semibold">24 hours</span>.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent outline-none transition-all appearance-none bg-white"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="product">Product Information</option>
                        <option value="quotation">Request Quotation</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a853] focus:border-transparent outline-none transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Status Message */}
                  {submitStatus.message && (
                    <div className={`p-4 rounded-lg ${submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                      }`}>
                      <p className="text-sm font-medium">{submitStatus.message}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#d4a853] hover:bg-[#c49843] text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span>✈️</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-gray-500 text-xs mt-4">
                  ⏱️ Average response time: <span className="text-[#d4a853] font-semibold">24 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our Office Section with Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="scroll-animate flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#d4a853] rounded-full flex items-center justify-center">
                <MapPin className="text-white" size={32} />
              </div>
            </div>

            <h2 className="scroll-animate delay-100 text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-6">
              Visit Our Office
            </h2>

            <p className="scroll-animate delay-200 text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Shardul-GE Technologies Pvt. Ltd., Office No. 16, Upper Ground Floor, A Wing, Jay Ganesh Samrajya, Spine Road, Bhosari, Pune 411039
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="scroll-animate delay-300 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.0286958774494!2d73.8438!3d18.6396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM4JzIyLjYiTiA3M8KwNTAnMzcuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shardul-GE Technologies Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
