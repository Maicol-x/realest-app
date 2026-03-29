import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import PropertyCard from '@/components/PropertyCard';
import { usePropertyStore } from '@/store/usePropertyStore';

export default function FavoritesPage() {
  const { getFavoriteProperties, favorites } = usePropertyStore();
  const favProperties = getFavoriteProperties();

  return (
    <MainLayout>
      <div className="pt-24 pb-20 section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-7 h-7 text-accent" />
            <h1 className="font-heading text-3xl font-bold text-foreground">My Favorites</h1>
          </div>
          <p className="text-muted-foreground mb-10">{favorites.length} saved properties</p>
        </motion.div>

        {favProperties.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Start saving properties you love</p>
            <Link to="/listings" className="btn-gradient inline-block">Browse Listings</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favProperties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
