import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, GitCompareArrows, Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { usePropertyStore } from '@/store/usePropertyStore';
import { formatPrice, formatArea } from '@/utils/format';

interface Props {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: Props) {
  const { favorites, compareList, toggleFavorite, addToCompare, removeFromCompare } = usePropertyStore();
  const isFav = favorites.includes(property.id);
  const isCompare = compareList.includes(property.id);

  const statusLabel = property.status === 'for-sale' ? 'For Sale' : property.status === 'for-rent' ? 'For Rent' : 'Sold';
  const statusColor =
    property.status === 'for-sale'
      ? 'bg-success text-success-foreground'
      : property.status === 'for-rent'
      ? 'bg-primary text-primary-foreground'
      : 'bg-muted text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-property group"
    >
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            <span className={`badge-status ${statusColor}`}>{statusLabel}</span>
          </div>

          {property.featured && (
            <div className="absolute top-3 right-14">
              <span className="badge-status bg-accent text-accent-foreground">Featured</span>
            </div>
          )}
        </div>
      </Link>

      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
          className="p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-accent text-accent' : 'text-foreground'}`} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            isCompare ? removeFromCompare(property.id) : addToCompare(property.id);
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
            isCompare ? 'bg-primary text-primary-foreground' : 'bg-card/80 hover:bg-card text-foreground'
          }`}
        >
          <GitCompareArrows className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs">{property.city}, {property.state}</span>
        </div>

        <Link to={`/property/${property.id}`}>
          <h3 className="font-heading font-semibold text-foreground text-base leading-snug mb-2 line-clamp-1 hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>

        <p className="text-xl font-heading font-bold text-primary mb-4">
          {formatPrice(property.price)}
          {property.status === 'for-rent' && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize className="w-4 h-4" />
            <span className="text-sm">{formatArea(property.area)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
