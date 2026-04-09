import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Minus, Plus, Truck, ChevronRight, MapPin } from 'lucide-react';
import products from '../../data/products';
import artisans from '../../data/artisans';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import { useToast } from '../../components/common/Toast';
import { formatPrice } from '../../utils/helpers';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProductCard from '../../components/product/ProductCard';
import Skeleton from '../../components/ui/Skeleton';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = products.find((p) => p.id === Number(id));
  const artisan = product ? artisans.find((a) => a.id === product.artisanId) : null;
  const wishlisted = product ? isInWishlist(product.id) : false;
  const related = product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : [];

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    setSelectedImage(0);
    setQuantity(1);
    return () => clearTimeout(t);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">🎨</p>
        <p className="text-charcoal font-semibold">Produit non trouvé</p>
        <Link to="/shop" className="text-gold text-sm font-semibold mt-2 inline-block">Retour à la boutique</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`${product.name} ajouté au panier!`, 'success');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-96 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-charcoal-lighter">
        <Link to="/dashboard" className="hover:text-charcoal">Accueil</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-charcoal">Boutique</Link>
        <ChevronRight size={12} />
        <Link to={`/shop?cat=${product.category}`} className="hover:text-charcoal">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-charcoal font-medium truncate max-w-[150px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative bg-white rounded-2xl border border-border overflow-hidden h-80 sm:h-96"
          >
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            {product.isNew && <div className="absolute top-3 left-3"><Badge variant="gold">Nouveau</Badge></div>}
          </motion.div>
          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${i === selectedImage ? 'border-gold shadow-gold' : 'border-border hover:border-gold/50'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <Badge variant="gold">{product.category}</Badge>
          <h1 className="text-2xl font-serif font-bold text-charcoal mt-2 mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              <Star size={12} fill="white" /> {product.rating}
            </div>
            <span className="text-xs text-charcoal-lighter">({product.reviews} avis)</span>
          </div>

          <p className="text-3xl font-bold text-charcoal mb-4">{formatPrice(product.price)}</p>
          <p className="text-sm text-charcoal-lighter leading-relaxed mb-4">{product.description}</p>
          <p className="text-xs text-charcoal-lighter mb-5">Dimensions : {product.dimensions}</p>

          {/* Quantity + Actions */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-charcoal-lighter hover:bg-cream cursor-pointer"><Minus size={16} /></button>
              <span className="px-4 py-2 text-sm font-bold text-charcoal bg-cream min-w-[48px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-charcoal-lighter hover:bg-cream cursor-pointer"><Plus size={16} /></button>
            </div>
          </div>

          <div className="flex gap-3 mb-5">
            <Button onClick={handleAddToCart} className="flex-1" size="lg" disabled={!product.inStock}>
              {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
            </Button>
            <button
              onClick={() => { toggleWishlist(product); addToast(wishlisted ? 'Retiré de la wishlist' : 'Ajouté à la wishlist', 'info'); }}
              className={`px-4 rounded-xl border-2 cursor-pointer transition-all ${wishlisted ? 'border-red-300 bg-red-50 text-red-500' : 'border-border text-charcoal-lighter hover:border-gold'}`}
            >
              <Heart size={20} className={wishlisted ? 'fill-red-500' : ''} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-charcoal-lighter mb-5">
            <Truck size={14} /> Livraison estimée : 5-7 jours ouvrés
          </div>

          {/* Artisan Card */}
          {artisan && (
            <div className="bg-cream rounded-2xl p-4 flex items-center gap-4 border border-border">
              <img src={artisan.avatar} alt={artisan.name} className="w-12 h-12 rounded-full object-cover border-2 border-gold/30" />
              <div>
                <p className="text-sm font-semibold text-charcoal">{artisan.name}</p>
                <p className="text-[10px] text-charcoal-lighter flex items-center gap-1"><MapPin size={10} /> {artisan.location}</p>
                <p className="text-[10px] text-gold font-medium">{artisan.specialty}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-border">
        <div className="flex border-b border-border">
          {['description', 'details', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition-colors cursor-pointer ${activeTab === tab ? 'text-gold border-b-2 border-gold' : 'text-charcoal-lighter hover:text-charcoal'}`}
            >
              {tab === 'description' ? 'Description' : tab === 'details' ? 'Détails' : `Avis (${product.reviews})`}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'description' && <p className="text-sm text-charcoal-lighter leading-relaxed">{product.description} Chaque pièce est unique et fabriquée à la main par nos artisans qualifiés utilisant des techniques traditionnelles transmises de génération en génération.</p>}
          {activeTab === 'details' && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-border"><span className="text-charcoal-lighter">Dimensions</span><span className="text-charcoal font-medium">{product.dimensions}</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span className="text-charcoal-lighter">Catégorie</span><span className="text-charcoal font-medium">{product.category}</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span className="text-charcoal-lighter">Artisan</span><span className="text-charcoal font-medium">{product.artisan}</span></div>
              <div className="flex justify-between py-2"><span className="text-charcoal-lighter">En stock</span><span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>{product.inStock ? 'Oui' : 'Non'}</span></div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {[{ name: 'Marie L.', rating: 5, comment: 'Absolument magnifique ! La qualité est incroyable.', date: '12 mars 2024' },
                { name: 'Pierre D.', rating: 4, comment: 'Très beau travail artisanal, livraison rapide.', date: '8 mars 2024' },
                { name: 'Claire B.', rating: 5, comment: 'Un vrai chef-d\'œuvre ! Je recommande vivement.', date: '1 mars 2024' },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 p-4 bg-cream rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm flex-shrink-0">{r.name[0]}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-charcoal">{r.name}</span>
                      <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={10} className={j < r.rating ? 'text-gold fill-gold' : 'text-gray-300'} />)}</div>
                    </div>
                    <p className="text-xs text-charcoal-lighter">{r.comment}</p>
                    <p className="text-[10px] text-charcoal-lighter mt-1">{r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-charcoal mb-4">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
