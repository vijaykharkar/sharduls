import React from 'react';
import { Box } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/switchboardComponents/${name}`, import.meta.url).href; } catch { return ''; } };

const SwitchboardComponentsPage = () => {
  const features = ['Panel Building', 'DIN Rail Systems', 'IP Rated', 'Custom Solutions', 'IEC Compliant', 'Fast Delivery'];

  const products = [
    { name: 'Panel Enclosures', image: prodImg('panelenclosures.jpg') },
    { name: 'Busbars', image: prodImg('busbar.jpg') },
    { name: 'Terminal Blocks', image: prodImg('terminalblocks.jpg') },
    { name: 'DIN Rails', image: prodImg('dinrails.jpg') },
    { name: 'Cable Ducts', image: prodImg('cableducts.jpg') },
    { name: 'Mounting Plates', image: prodImg('mountingplates.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Box}
      title="Switchboard"
      titleHighlight="Components"
      description="Complete switchboard and panel building components including enclosures, busbars, terminal blocks, and cable management systems."
      features={features}
      products={products}
    />
  );
};

export default SwitchboardComponentsPage;
