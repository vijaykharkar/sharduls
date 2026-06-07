import React from 'react';
import { Plug } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/lugsConnectors/${name}`, import.meta.url).href; } catch { return ''; } };

const LugsConnectorsPage = () => {
  const features = ['High Conductivity', 'Precision Manufacturing', 'Multiple Materials', 'Custom Sizes', 'Quality Tested', 'Competitive Pricing'];

  const products = [
    { name: 'Cable Lugs', image: prodImg('cablelugs.jpg') },
    { name: 'Ring Terminals', image: prodImg('ringterminals.jpg') },
    { name: 'Spade Terminals', image: prodImg('spadeterminals.avif') },
    { name: 'Bimetallic Connectors', image: prodImg('bimetallicconnectors.jpg') },
    { name: 'Compression Lugs', image: prodImg('compressionlugs.jpg') },
    { name: 'Tubular Lugs', image: prodImg('tubularlugs.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Plug}
      title="Lugs &"
      titleHighlight="Connectors"
      description="High-quality copper and aluminum lugs, terminals, and connectors for reliable electrical connections."
      features={features}
      products={products}
    />
  );
};

export default LugsConnectorsPage;
