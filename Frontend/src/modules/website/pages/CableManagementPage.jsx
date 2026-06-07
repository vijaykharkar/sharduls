import React from 'react';
import { Cable } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/cableManagement/${name}`, import.meta.url).href; } catch { return ''; } };

const CableManagementPage = () => {
  const features = ['High-Quality Materials', 'International Standards', 'Corrosion Resistant', 'Easy Installation', 'Custom Solutions Available', 'Competitive Pricing'];

  const products = [
    { name: 'Cable Glands', image: prodImg('cableglandimg.jpg') },
    { name: 'Cable Trays', image: prodImg('cabletrays.jpg') },
    { name: 'Cable Ties', image: prodImg('cabletie.jpg') },
    { name: 'Cable Cleats', image: prodImg('cablecleats.jpg') },
    { name: 'Cable Conduits', image: prodImg('cableconduits.jpg') },
    { name: 'Cable Markers', image: prodImg('cablemarkers.jpg') },
    { name: 'Cable Clips', image: prodImg('cableclips.jpg') },
    { name: 'Cable Protectors', image: prodImg('cableprotectors.jpg') },
    { name: 'Cable Gland Accessories', image: prodImg('cableglandaccessories.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Cable}
      title="Cable"
      titleHighlight="Management"
      description="Keep your wires organized, protected, and easily accessible with our comprehensive cable management systems including conduits, trays, cable glands and accessories."
      features={features}
      products={products}
    />
  );
};

export default CableManagementPage;
