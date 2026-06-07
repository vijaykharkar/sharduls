import React from 'react';
import { Wrench } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/fixingsFasteners/${name}`, import.meta.url).href; } catch { return ''; } };

const FixingsFastenersPage = () => {
  const features = ['High Strength', 'Corrosion Resistant', 'Multiple Materials', 'Custom Sizes', 'Bulk Availability', 'Quality Certified'];

  const products = [
    { name: 'Bolts', image: prodImg('bolts.jpg') },
    { name: 'Screws', image: prodImg('screw.jpg') },
    { name: 'Nuts', image: prodImg('nuts.jpg') },
    { name: 'Washers', image: prodImg('lockwashers.webp') },
    { name: 'Anchors', image: prodImg('anchors.jpg') },
    { name: 'Rivets', image: prodImg('rivets.jpg') },
    { name: 'Threaded Rods', image: prodImg('threadedrods.jpg') },
    { name: 'Self Drilling Screws', image: prodImg('selfdrillingscrews.jpg') },
    { name: 'Spring Channel Nuts', image: prodImg('springchannelnuts.jpg') },
    { name: 'Mounting Brackets', image: prodImg('hinges.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Wrench}
      title="Fixings &"
      titleHighlight="Fasteners"
      description="Complete range of industrial fixings and fasteners including bolts, nuts, screws, anchors, and specialized hardware for all applications."
      features={features}
      products={products}
    />
  );
};

export default FixingsFastenersPage;
