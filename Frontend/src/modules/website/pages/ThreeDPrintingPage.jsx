import React from 'react';
import { Box } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/${name}`, import.meta.url).href; } catch { return ''; } };

const ThreeDPrintingPage = () => {
  const features = ['Rapid Prototyping', 'Multiple Technologies', 'Various Materials', 'Complex Geometries', 'Fast Turnaround', 'Cost Effective'];

  const products = [
    { name: 'FDM Printing', image: prodImg('fdm.png') },
    { name: 'Vacuum Casting', image: prodImg('vacumcasting.png') },
    { name: 'Multi Jet Fusion', image: prodImg('multijet.png') },
    { name: 'DMLS (Metal Printing)', image: prodImg('dmls.png') },
  ];

  return (
    <ProductCategoryLayout
      icon={Box}
      title="3D"
      titleHighlight="Printing"
      description="Advanced additive manufacturing services including FDM, SLA, Multi Jet Fusion, and DMLS for rapid prototyping and low-volume production."
      features={features}
      products={products}
    />
  );
};

export default ThreeDPrintingPage;
