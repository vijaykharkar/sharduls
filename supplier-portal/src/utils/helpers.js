export const formatPrice = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const cn = (...c) => c.filter(Boolean).join(' ');

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const getStatusColor = (s) => ({
  Pending:    'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped:    'bg-purple-100 text-purple-700',
  Delivered:  'bg-green-100 text-green-700',
  Cancelled:  'bg-red-100 text-red-700',
  Active:     'bg-green-100 text-green-700',
  Inactive:   'bg-gray-100 text-gray-500',
  Approved:   'bg-green-100 text-green-700',
  Rejected:   'bg-red-100 text-red-700',
  Verified:   'bg-green-100 text-green-700',
  'Not Uploaded': 'bg-gray-100 text-gray-500',
  Uploaded:   'bg-blue-100 text-blue-700',
  Open:       'bg-blue-100 text-blue-700',
  'In Progress':'bg-purple-100 text-purple-700',
  Resolved:   'bg-green-100 text-green-700',
})[s] || 'bg-gray-100 text-gray-600';

export const validateGSTIN = (v) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);

export const validateIFSC = (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v);

export const validatePincode = (v) => /^[1-9][0-9]{5}$/.test(v);

export const lookupPincode = (pin) => {
  const map = {
    '110001': { state: 'Delhi', city: 'New Delhi' },
    '400001': { state: 'Maharashtra', city: 'Mumbai' },
    '500001': { state: 'Telangana', city: 'Hyderabad' },
    '600001': { state: 'Tamil Nadu', city: 'Chennai' },
    '700001': { state: 'West Bengal', city: 'Kolkata' },
    '302001': { state: 'Rajasthan', city: 'Jaipur' },
    '380001': { state: 'Gujarat', city: 'Ahmedabad' },
    '560001': { state: 'Karnataka', city: 'Bengaluru' },
  };
  return map[pin] || { state: 'Rajasthan', city: 'Udaipur' };
};

export const lookupIFSC = (ifsc) => {
  if (ifsc.startsWith('SBIN')) return { bank: 'State Bank of India', branch: 'Main Branch' };
  if (ifsc.startsWith('HDFC')) return { bank: 'HDFC Bank', branch: 'Main Branch' };
  if (ifsc.startsWith('ICIC')) return { bank: 'ICICI Bank', branch: 'Main Branch' };
  if (ifsc.startsWith('UTIB')) return { bank: 'Axis Bank', branch: 'Main Branch' };
  return { bank: 'Bank of India', branch: 'Central Branch' };
};
