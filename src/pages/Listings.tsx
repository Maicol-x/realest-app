import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search, LayoutGrid, List } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import PropertyCard from '@/components/PropertyCard';
import FilterSidebar from '@/components/FilterSidebar';
import { usePropertyStore } from '@/store/usePropertyStore';

export default function ListingsPage() {
  const { filters, setFilter, getFilteredProperties } = usePropertyStore();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = getFilteredProperties();

  return (
    <MainLayout>
      <div className="pt-24 pb-20">
        <div className="section-padding">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">Browse Properties</h1>
              <p className="text-muted-foreground mt-1">{filtered.length} properties found</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilter('search', e.target.value)}
                  placeholder="Search..."
                  className="input-search w-full pl-10 text-sm"
                />
              </div>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop filters */}
            <div className="hidden lg:block w-80 shrink-0">
              <FilterSidebar open={true} onClose={() => {}} />
            </div>

            {/* Mobile filters */}
            <div className="lg:hidden">
              <FilterSidebar open={filtersOpen} onClose={() => setFiltersOpen(false)} />
            </div>

            {/* Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No properties match your filters.</p>
                  <button onClick={() => usePropertyStore.getState().resetFilters()} className="mt-4 text-primary font-medium hover:underline">
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((property, i) => (
                    <PropertyCard key={property.id} property={property} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
