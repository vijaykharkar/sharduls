import React from 'react';
import { Flame } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/${name}`, import.meta.url).href; } catch { return ''; } };

const ThermoPlasticPartsPage = () => {
  const features = ['Injection Molding', 'Custom Designs', 'Multiple Polymers', 'High Precision', 'Color Matching', 'Quality Assured'];

  const products = [
    { name: 'Injection Molded Parts', image: prodImg('thermoplasticcomponent.jpg') },
    { name: 'CNC Machined Plastics', image: prodImg('turning-parts.jpg') },
    { name: 'Extruded Profiles', image: prodImg('thermoplasticcomponent.jpg') },
    { name: 'Thermoformed Components', image: prodImg('turning-parts.jpg') },
    { name: 'Plastic Fasteners', image: prodImg('thermoplasticcomponent.jpg') },
    { name: 'Custom Plastic Parts', image: prodImg('turning-parts.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Flame}
      title="Thermo Plastic"
      titleHighlight="Parts"
      description="Custom thermoplastic components manufactured through injection molding, CNC machining, and extrusion for diverse industrial applications."
      features={features}
      products={products}
    />
  );
};

export default ThermoPlasticPartsPage;
