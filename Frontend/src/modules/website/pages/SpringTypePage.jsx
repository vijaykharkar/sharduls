import React from 'react';
import { Package } from 'lucide-react';
import ProductCategoryLayout from '../components/ProductCategoryLayout';

const imgUrl = (name) => { try { return new URL(`../../../assets/images/${name}`, import.meta.url).href; } catch { return ''; } };

const SpringTypePage = () => {
  const features = ['Custom Design', 'Multiple Materials', 'High Fatigue Life', 'Precision Tolerances', 'Various Types', 'Quality Tested'];

  const products = [
    { name: 'Compression Springs', image: imgUrl('compressionsprings.jpg') },
    { name: 'Replacement Springs', image: imgUrl('springsreplacement.jpg') },
    { name: 'Stainless Steel Springs', image: imgUrl('springstainless.jpg') },
    { name: 'Copper Coil Springs', image: imgUrl('coppercoilmcb.jpeg') },
    { name: 'Wire Forms & Clips', image: imgUrl('clipmetalicovarilla.jpg') },
    { name: 'Oil Level Dipstick Springs', image: imgUrl('oilleveldipstick.jpg') },
  ];

  return (
    <ProductCategoryLayout
      icon={Package}
      title="Spring Type"
      titleHighlight="Components"
      description="Custom-engineered springs and wire forms for diverse industrial applications including compression, extension, torsion, and specialty springs."
      features={features}
      products={products}
    />
  );
};

export default SpringTypePage;
