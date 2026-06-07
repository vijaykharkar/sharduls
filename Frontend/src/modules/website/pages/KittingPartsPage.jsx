import React from 'react';
import { Package } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/${name}`, import.meta.url).href; } catch { return ''; } };

const KittingPartsPage = () => {
  const features = ['Custom Kitting', 'Pre-Packed Sets', 'Labeling Service', 'Quality Checked', 'Ready to Use', 'Cost Efficient'];

  const products = [
    { name: 'Hardware Kits', image: prodImg('kitpouch.jpg') },
    { name: 'Fastener Kits', image: prodImg('kittingproducts.jpeg') },
    { name: 'Electrical Kits', image: prodImg('kitpouch.jpg') },
    { name: 'Maintenance Kits', image: prodImg('kittingproducts.jpeg') },
    { name: 'Custom Assembly Kits', image: prodImg('kitpouch.jpg') },
    { name: 'Spare Parts Kits', image: prodImg('kittingproducts.jpeg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Package}
      title="Kitting"
      titleHighlight="Parts"
      description="Pre-packaged kitting solutions combining multiple components into ready-to-use sets, streamlining your production and maintenance operations."
      features={features}
      products={products}
    />
  );
};

export default KittingPartsPage;
