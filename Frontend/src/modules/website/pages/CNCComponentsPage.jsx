import React from 'react';
import { Settings } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/${name}`, import.meta.url).href; } catch { return ''; } };

const CNCComponentsPage = () => {
  const features = ['CNC Machined', 'High Precision', 'Multiple Materials', 'Complex Geometries', 'Quick Turnaround', 'Quality Assured'];

  const products = [
    { name: 'CNC Turned Parts', image: prodImg('cncmachine.jpg') },
    { name: 'CNC Milled Components', image: prodImg('cncmachinecomponent.jpg') },
    { name: 'CNC Drilled Parts', image: prodImg('cncmachine.jpg') },
    { name: 'CNC Tapped Components', image: prodImg('cncmachinecomponent.jpg') },
    { name: 'CNC Engraved Parts', image: prodImg('cncmachine.jpg') },
    { name: 'CNC Shaped Components', image: prodImg('cncmachinecomponent.jpg') },
    { name: 'CNC Slotted Parts', image: prodImg('cncmachine.jpg') },
    { name: 'CNC Bored Components', image: prodImg('cncmachinecomponent.jpg') },
    { name: 'CNC Chamfered Parts', image: prodImg('cncmachine.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Settings}
      title="CNC"
      titleHighlight="Components"
      description="Precision CNC machined components with tight tolerances for automotive, aerospace, and industrial applications."
      features={features}
      products={products}
    />
  );
};

export default CNCComponentsPage;
