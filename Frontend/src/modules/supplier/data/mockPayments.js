const mockPayments = [
  { id: 'PAY-001', date: '2024-04-01', orderId: 'ORD-10001', amount: 4500, status: 'Paid' },
  { id: 'PAY-002', date: '2024-04-03', orderId: 'ORD-10002', amount: 6200, status: 'Paid' },
  { id: 'PAY-003', date: '2024-04-05', orderId: 'ORD-10003', amount: 12000, status: 'Pending' },
  { id: 'PAY-004', date: '2024-04-06', orderId: 'ORD-10004', amount: 3800, status: 'Pending' },
  { id: 'PAY-005', date: '2024-04-08', orderId: 'ORD-10006', amount: 5200, status: 'Paid' },
  { id: 'PAY-006', date: '2024-04-09', orderId: 'ORD-10007', amount: 9500, status: 'Processing' },
  { id: 'PAY-007', date: '2024-04-11', orderId: 'ORD-10010', amount: 5800, status: 'Paid' },
];

export const paymentSummary = {
  totalEarned: 47000,
  pending: 15800,
  thisMonth: 32200,
  lastMonth: 28500,
};

export default mockPayments;
