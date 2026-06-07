import React from 'react';
import { CheckCircle } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const imgUrl = (name) => { try { return new URL(`../../../assets/images/${name}`, import.meta.url).href; } catch { return ''; } };

const OtherProductsPage = () => {
  const features = ['Custom Solutions', 'Wide Range', 'Quality Certified', 'Bulk Available', 'Fast Delivery', 'Competitive Pricing'];

  const products = [
    { name: 'Clamps & Nuts', image: imgUrl('clampsandnuts.png') },
    { name: 'Hose Clips & Clamps', image: imgUrl('hoseclipsclamps.png') },
    { name: 'Copper Braid Strip Connectors', image: imgUrl('copperbraidstripconnector.jpg') },
    { name: 'Cable Clips', image: imgUrl('cableclips.png') },
  ];

  return (
    <ProductCategoryLayout
      icon={CheckCircle}
      title="Other"
      titleHighlight="Products"
      description="Explore our additional product categories including clamps, clips, connectors, and other industrial hardware solutions."
      features={features}
      products={products}
    />
  );
};

export default OtherProductsPage;
