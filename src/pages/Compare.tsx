import { motion } from 'framer-motion';
import { GitCompareArrows, X, Bed, Bath, Maximize, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { usePropertyStore } from '@/store/usePropertyStore';
import { formatPrice, formatArea } from '@/utils/format';

export default function ComparePage() {
  const { getCompareProperties, removeFromCompare, clearCompare } = usePropertyStore();
  const compareProperties = getCompareProperties();

  const rows = [
    { label: 'Price', icon: DollarSign, getValue: (p: any) => formatPrice(p.price) },
    { label: 'Location', icon: MapPin, getValue: (p: any) => `${p.city}, ${p.state}` },
    { label: 'Type', icon: null, getValue: (p: any) => p.type.charAt(0).toUpperCase() + p.type.slice(1) },
    { label: 'Bedrooms', icon: Bed, getValue: (p: any) => String(p.bedrooms) },
    { label: 'Bathrooms', icon: Bath, getValue: (p: any) => String(p.bathrooms) },
    { label: 'Area', icon: Maximize, getValue: (p: any) => formatArea(p.area) },
    { label: 'Year Built', icon: Calendar, getValue: (p: any) => String(p.yearBuilt) },
    { label: 'Status', icon: null, getValue: (p: any) => p.status === 'for-sale' ? 'For Sale' : p.status === 'for-rent' ? 'For Rent' : 'Sold' },
  ];

  return (
    <MainLayout>
      <div className="pt-24 pb-20 section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <GitCompareArrows className="w-7 h-7 text-primary" />
                <h1 className="font-heading text-3xl font-bold text-foreground">Compare Properties</h1>
              </div>
              <p className="text-muted-foreground">{compareProperties.length} properties selected (max 4)</p>
            </div>
            {compareProperties.length > 0 && (
              <button onClick={clearCompare} className="text-sm text-destructive hover:underline font-medium">Clear all</button>
            )}
          </div>
        </motion.div>

        {compareProperties.length === 0 ? (
          <div className="text-center py-20">
            <GitCompareArrows className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">No properties to compare</h2>
            <p className="text-muted-foreground mb-6">Add properties from listings to compare them side by side</p>
            <Link to="/listings" className="btn-gradient inline-block">Browse Listings</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left p-4 w-40" />
                  {compareProperties.map((p) => (
                    <th key={p.id} className="p-4 text-center">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <Link to={`/property/${p.id}`}>
                          <img src={p.images[0]} alt={p.title} className="w-full aspect-[4/3] object-cover rounded-xl mb-3" loading="lazy" />
                          <p className="font-heading font-semibold text-foreground text-sm hover:text-primary transition-colors">{p.title}</p>
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-muted/30' : ''}>
                    <td className="p-4 font-medium text-sm text-foreground flex items-center gap-2">
                      {row.icon && <row.icon className="w-4 h-4 text-primary" />}
                      {row.label}
                    </td>
                    {compareProperties.map((p) => (
                      <td key={p.id} className="p-4 text-center text-sm text-muted-foreground">
                        {row.getValue(p)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 font-medium text-sm text-foreground">Features</td>
                  {compareProperties.map((p) => (
                    <td key={p.id} className="p-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {p.features.map((f) => (
                          <span key={f} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
