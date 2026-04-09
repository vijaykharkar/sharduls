export const ADMIN_ACCOUNT = {
  id: 'ADMIN-001',
  name: 'NexaForge Admin',
  email: 'admin@nexaforge.com',
  phone: '9999999999',
  password: 'Admin@2026',
  role: 'admin',
  otp: '000000',
};

export const SEED_SUPPLIER = {
  id: 'SUP-000001',
  name: 'Rajesh Kumar',
  businessName: 'Kumar Precision Parts Pvt. Ltd.',
  email: 'supplier@nexaforge.com',
  phone: '9876543210',
  password: 'Supplier@2026',
  role: 'supplier',
  otp: '123456',
};

export const DEFAULT_OTP = '123456';
export const ADMIN_OTP = '000000';

export const maskPhone = (phone) => {
  if (!phone || phone.length < 4) return phone;
  return 'X'.repeat(phone.length - 4) + phone.slice(-4);
};
