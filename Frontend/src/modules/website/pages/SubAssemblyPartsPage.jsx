import React from 'react';
import { Layers } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/${name}`, import.meta.url).href; } catch { return ''; } };

const SubAssemblyPartsPage = () => {
  const features = ['Complete Assemblies', 'Quality Tested', 'Custom Design', 'Multiple Components', 'Ready to Install', 'Cost Effective'];

  const products = [
    { name: 'Mechanical Sub-Assemblies', image: prodImg('mechassembly.jpg') },
    { name: 'Electrical Sub-Assemblies', image: prodImg('electricalassmebly.jpg') },
    { name: 'Hydraulic Assemblies', image: prodImg('mechassembly.jpg') },
    { name: 'Pneumatic Assemblies', image: prodImg('electricalassmebly.jpg') },
    { name: 'Custom Kitting', image: prodImg('mechassembly.jpg') },
    { name: 'Multi-Component Assemblies', image: prodImg('electricalassmebly.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Layers}
      title="Sub-Assembly"
      titleHighlight="Parts"
      description="Complete sub-assembly solutions combining multiple components into ready-to-install units, reducing your assembly time and costs."
      features={features}
      products={products}
    />
  );
};

export default SubAssemblyPartsPage;
