import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPrice } from '@/utils/format';
import { Link } from 'react-router-dom';

interface Props {
  properties: Property[];
  selectedId?: string;
}

export default function MapSection({ properties, selectedId }: Props) {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-muted border border-border">
      {/* Simulated map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted to-accent/5" />
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.5
      }} />

      {/* Property markers */}
      {properties.map((property, index) => {
        const x = 10 + (index * 11) % 80;
        const y = 15 + ((index * 17 + 5) % 70);
        const isSelected = property.id === selectedId;

        return (
          <Link key={property.id} to={`/property/${property.id}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="absolute group"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className={`relative cursor-pointer ${isSelected ? 'z-10' : ''}`}>
                <div className={`p-2 rounded-full transition-all ${
                  isSelected ? 'bg-accent text-accent-foreground scale-125' : 'bg-primary text-primary-foreground hover:scale-110'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-card rounded-xl border border-border shadow-elegant p-3 whitespace-nowrap">
                    <p className="font-heading font-semibold text-sm text-foreground">{property.title}</p>
                    <p className="text-xs text-primary font-bold">{formatPrice(property.price)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}

      {/* Map label */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-border">
        <p className="text-xs text-muted-foreground font-medium">{properties.length} properties shown • Interactive map</p>
      </div>
    </div>
  );
}
