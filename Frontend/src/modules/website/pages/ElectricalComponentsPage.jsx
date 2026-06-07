import React from 'react';
import { Lightbulb } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/electricalComponents/${name}`, import.meta.url).href; } catch { return ''; } };

const ElectricalComponentsPage = () => {
  const features = ['Premium Quality', 'Safety Certified', 'Wide Range', 'Technical Support', 'Fast Delivery', 'Best Prices'];

  const products = [
    { name: 'Circuit Breakers', image: prodImg('circuitbreakers.jpg') },
    { name: 'Contactors', image: prodImg('circuitbreakers.jpg') },
    { name: 'Relays', image: prodImg('circuitbreakers.jpg') },
    { name: 'Timers', image: prodImg('circuitbreakers.jpg') },
    { name: 'Protection Devices', image: prodImg('circuitbreakers.jpg') },
    { name: 'Switches & Indicators', image: prodImg('circuitbreakers.jpg') },
    { name: 'Motor Starters', image: prodImg('circuitbreakers.jpg') },
    { name: 'Terminal Blocks', image: prodImg('circuitbreakers.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Lightbulb}
      title="Electrical"
      titleHighlight="Components"
      description="Complete range of low-voltage electrical components for panel building, automation, and industrial applications."
      features={features}
      products={products}
    />
  );
};

export default ElectricalComponentsPage;
