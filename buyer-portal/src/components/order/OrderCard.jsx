import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatPrice, formatDate, getStatusColor } from '../../utils/helpers';

const statusVariant = {
  Pending: 'yellow',
  Processing: 'blue',
  Shipped: 'purple',
  Delivered: 'green',
  Cancelled: 'red',
};

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-charcoal-lighter">{formatDate(order.date)}</p>
          <p className="text-sm font-bold text-charcoal mt-0.5">{order.id}</p>
        </div>
        <Badge variant={statusVariant[order.status] || 'gray'}>{order.status}</Badge>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {order.items.slice(0, 3).map((item, i) => (
          <img key={i} src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-border" />
        ))}
        {order.items.length > 3 && (
          <div className="w-12 h-12 rounded-lg bg-cream flex items-center justify-center text-xs font-bold text-charcoal-lighter border border-border">
            +{order.items.length - 3}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-charcoal">{formatPrice(order.total)}</p>
        <Link
          to={`/orders/${order.id}`}
          className="flex items-center gap-1 text-xs text-gold font-semibold hover:text-gold-dark transition-colors"
        >
          Voir détails <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
