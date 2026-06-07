import React from 'react';
import { Zap } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/earthingAccessories/${name}`, import.meta.url).href; } catch { return ''; } };

const EarthingAccessoriesPage = () => {
  const features = ['IS & IEC Standards', 'High Conductivity', 'Corrosion Resistant', 'Long Service Life', 'Complete Solutions', 'Expert Support'];

  const products = [
    { name: 'Earthing Clamps', image: prodImg('earthingclamps.jpg') },
    { name: 'Earthing Straps', image: prodImg('earthingstraps.jpg') },
    { name: 'Earthing Rods', image: prodImg('earthingrods.jpg') },
    { name: 'Earthing Plates', image: prodImg('earthingplates.jpg') },
    { name: 'Earth Bars', image: prodImg('earthbars.jpg') },
    { name: 'Earthing Connectors', image: prodImg('earthingconnectors.jpg') },
    { name: 'Lightning Arresters', image: prodImg('lightningarresters.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Zap}
      title="Earthing"
      titleHighlight="Accessories"
      description="Complete earthing and grounding solutions for electrical installations conforming to IS and IEC standards."
      features={features}
      products={products}
    />
  );
};

export default EarthingAccessoriesPage;
