import React from 'react';
import { Target } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/${name}`, import.meta.url).href; } catch { return ''; } };

const HighPrecisionPartsPage = () => {
  const features = ['Tight Tolerances', 'Advanced Materials', 'Quality Inspection', 'Custom Specifications', 'ISO Certified', 'Global Standards'];

  const products = [
    { name: 'Precision Shafts', image: prodImg('high-precicion-parts-first.jpg') },
    { name: 'Precision Pins', image: prodImg('turning-parts.jpg') },
    { name: 'Precision Bushings', image: prodImg('high-precicion-parts-first.jpg') },
    { name: 'Precision Sleeves', image: prodImg('turning-parts.jpg') },
    { name: 'Precision Spacers', image: prodImg('high-precicion-parts-first.jpg') },
    { name: 'Precision Collets', image: prodImg('turning-parts.jpg') },
    { name: 'Precision Adapters', image: prodImg('high-precicion-parts-first.jpg') },
    { name: 'Precision Inserts', image: prodImg('turning-parts.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Target}
      title="High Precision"
      titleHighlight="Parts"
      description="Ultra-precision machined components with tolerances as tight as ±0.001mm for critical applications in aerospace, medical, and automotive industries."
      features={features}
      products={products}
    />
  );
};

export default HighPrecisionPartsPage;
