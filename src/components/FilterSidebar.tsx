import { motion } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { usePropertyStore } from '@/store/usePropertyStore';
import { PropertyType, PropertyStatus } from '@/types/property';

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'villa', label: 'Villa' },
  { value: 'loft', label: 'Loft' },
  { value: 'townhouse', label: 'Townhouse' },
];

const statusOptions: { value: PropertyStatus; label: string }[] = [
  { value: 'for-sale', label: 'For Sale' },
  { value: 'for-rent', label: 'For Rent' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ open, onClose }: Props) {
  const { filters, setFilter, resetFilters } = usePropertyStore();

  if (!open) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed left-0 top-0 bottom-0 w-80 bg-card border-r border-border z-50 overflow-y-auto lg:sticky lg:top-20 lg:z-auto lg:border-r-0"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-lg text-foreground">Filters</h3>
            <div className="flex gap-2">
              <button onClick={resetFilters} className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors lg:hidden">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Price Range</label>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                value={filters.minPrice || ''}
                onChange={(e) => setFilter('minPrice', Number(e.target.value) || 0)}
                placeholder="Min"
                className="input-search w-full text-sm"
              />
              <input
                type="number"
                value={filters.maxPrice < 10000000 ? filters.maxPrice : ''}
                onChange={(e) => setFilter('maxPrice', Number(e.target.value) || 10000000)}
                placeholder="Max"
                className="input-search w-full text-sm"
              />
            </div>
            <input
              type="range"
              min={0}
              max={5000000}
              step={50000}
              value={filters.maxPrice > 5000000 ? 5000000 : filters.maxPrice}
              onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {/* Property Type */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Property Type</label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((pt) => (
                <button
                  key={pt.value}
                  onClick={() => setFilter('type', filters.type === pt.value ? null : pt.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filters.type === pt.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Bedrooms</label>
            <div className="flex gap-2">
              {[null, 1, 2, 3, 4, 5].map((n) => (
                <button
                  key={String(n)}
                  onClick={() => setFilter('bedrooms', n)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                    filters.bedrooms === n
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {n === null ? 'Any' : `${n}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Bathrooms</label>
            <div className="flex gap-2">
              {[null, 1, 2, 3, 4].map((n) => (
                <button
                  key={String(n)}
                  onClick={() => setFilter('bathrooms', n)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                    filters.bathrooms === n
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {n === null ? 'Any' : `${n}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Status</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('status', null)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filters.status === null ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                All
              </button>
              {statusOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setFilter('status', s.value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                    filters.status === s.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Area */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Area (sq ft)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.minArea || ''}
                onChange={(e) => setFilter('minArea', Number(e.target.value) || 0)}
                placeholder="Min"
                className="input-search w-full text-sm"
              />
              <input
                type="number"
                value={filters.maxArea < 10000 ? filters.maxArea : ''}
                onChange={(e) => setFilter('maxArea', Number(e.target.value) || 10000)}
                placeholder="Max"
                className="input-search w-full text-sm"
              />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
