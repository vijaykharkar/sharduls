import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, HelpCircle, MapPin, CreditCard } from 'lucide-react';
import ordersData from '../../data/orders';
import OrderTimeline from '../../components/order/OrderTimeline';
import Badge from '../../components/ui/Badge';
import { formatPrice, formatDate, getStatusColor } from '../../utils/helpers';

const statusVariant = { Pending: 'yellow', Processing: 'blue', Shipped: 'purple', Delivered: 'green', Cancelled: 'red' };

const OrderDetailPage = () => {
  const { id } = useParams();
  const order = ordersData.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">📦</p>
        <p className="text-charcoal font-semibold">Commande non trouvée</p>
        <Link to="/orders" className="text-gold text-sm font-semibold mt-2 inline-block">Retour aux commandes</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/orders" className="flex items-center gap-1.5 text-xs text-gold font-semibold hover:text-gold-dark transition-colors">
        <ArrowLeft size={14} /> Retour aux commandes
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-charcoal">{order.id}</h1>
          <p className="text-xs text-charcoal-lighter mt-0.5">Commandé le {formatDate(order.date)}</p>
        </div>
        <Badge variant={statusVariant[order.status] || 'gray'}>{order.status}</Badge>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <OrderTimeline status={order.status} />
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-sm font-bold text-charcoal mb-4">Articles</h2>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-border" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-charcoal truncate">{item.name}</p>
                <p className="text-xs text-charcoal-lighter">Qté: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-charcoal">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shipping */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-gold" />
            <h3 className="text-sm font-bold text-charcoal">Adresse de livraison</h3>
          </div>
          <div className="text-xs text-charcoal-lighter space-y-0.5">
            <p className="font-medium text-charcoal">{order.address.name}</p>
            <p>{order.address.line1}</p>
            <p>{order.address.city}, {order.address.postal}</p>
            <p>{order.address.country}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={16} className="text-gold" />
            <h3 className="text-sm font-bold text-charcoal">Paiement</h3>
          </div>
          <p className="text-xs text-charcoal-lighter">{order.paymentMethod}</p>
          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-charcoal-lighter">Sous-total</span><span className="font-medium text-charcoal">{formatPrice(order.total * 0.9)}</span></div>
            <div className="flex justify-between"><span className="text-charcoal-lighter">Livraison</span><span className="font-medium text-green-600">Gratuite</span></div>
            <div className="flex justify-between border-t border-border pt-1.5"><span className="font-bold text-charcoal">Total</span><span className="font-bold text-gold">{formatPrice(order.total)}</span></div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border rounded-xl text-xs font-semibold text-charcoal hover:border-charcoal cursor-pointer transition-colors">
          <Download size={14} /> Télécharger la facture
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border rounded-xl text-xs font-semibold text-charcoal hover:border-charcoal cursor-pointer transition-colors">
          <HelpCircle size={14} /> Besoin d'aide ?
        </button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
