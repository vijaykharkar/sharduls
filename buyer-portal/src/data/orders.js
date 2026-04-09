const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    items: [
      { productId: 1, name: 'Mandala Dorée Classique', price: 89, quantity: 1, image: 'https://picsum.photos/100/100?random=1' },
      { productId: 6, name: 'Lippan Floral Carré', price: 165, quantity: 1, image: 'https://picsum.photos/100/100?random=6' },
    ],
    total: 254,
    status: 'Delivered',
    address: { name: 'Sophie Martin', line1: '12 Rue de la Paix', city: 'Paris', postal: '75002', country: 'France' },
    paymentMethod: 'Visa •••• 4242',
    trackingNumber: 'FR123456789',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-22',
    items: [
      { productId: 5, name: 'Art Mural Abstrait Doré', price: 220, quantity: 1, image: 'https://picsum.photos/100/100?random=5' },
    ],
    total: 220,
    status: 'Shipped',
    address: { name: 'Sophie Martin', line1: '12 Rue de la Paix', city: 'Paris', postal: '75002', country: 'France' },
    paymentMethod: 'Visa •••• 4242',
    trackingNumber: 'FR987654321',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-04-01',
    items: [
      { productId: 11, name: 'Lippan Art Éléphant', price: 250, quantity: 1, image: 'https://picsum.photos/100/100?random=11' },
      { productId: 14, name: 'Mini Cadre Doré', price: 45, quantity: 2, image: 'https://picsum.photos/100/100?random=14' },
    ],
    total: 340,
    status: 'Processing',
    address: { name: 'Sophie Martin', line1: '12 Rue de la Paix', city: 'Paris', postal: '75002', country: 'France' },
    paymentMethod: 'PayPal',
    trackingNumber: null,
  },
  {
    id: 'ORD-2024-004',
    date: '2024-04-05',
    items: [
      { productId: 13, name: 'Triptyque Mandala Rose', price: 350, quantity: 1, image: 'https://picsum.photos/100/100?random=13' },
    ],
    total: 350,
    status: 'Pending',
    address: { name: 'Sophie Martin', line1: '45 Avenue Montaigne', city: 'Lyon', postal: '69002', country: 'France' },
    paymentMethod: 'Mastercard •••• 8888',
    trackingNumber: null,
  },
  {
    id: 'ORD-2024-005',
    date: '2024-02-10',
    items: [
      { productId: 20, name: 'Mandala Zen Minimaliste', price: 65, quantity: 1, image: 'https://picsum.photos/100/100?random=20' },
    ],
    total: 65,
    status: 'Delivered',
    address: { name: 'Sophie Martin', line1: '12 Rue de la Paix', city: 'Paris', postal: '75002', country: 'France' },
    paymentMethod: 'Visa •••• 4242',
    trackingNumber: 'FR111222333',
  },
];

export default orders;
