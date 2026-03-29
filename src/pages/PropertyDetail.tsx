import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Maximize, Calendar, MapPin, Heart, GitCompareArrows, Share2 } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import PropertyGallery from '@/components/PropertyGallery';
import ContactAgentForm from '@/components/ContactAgentForm';
import ScheduleVisitModal from '@/components/ScheduleVisitModal';
import MapSection from '@/components/MapSection';
import { usePropertyStore } from '@/store/usePropertyStore';
import { formatPrice, formatArea } from '@/utils/format';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById, favorites, toggleFavorite, compareList, addToCompare, removeFromCompare } = usePropertyStore();
  const property = getPropertyById(id || '');
  const [visitOpen, setVisitOpen] = useState(false);

  if (!property) {
    return (
      <MainLayout>
        <div className="pt-32 pb-20 text-center section-padding">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Property Not Found</h1>
          <Link to="/listings" className="text-primary font-medium hover:underline">Browse listings</Link>
        </div>
      </MainLayout>
    );
  }

  const isFav = favorites.includes(property.id);
  const isCompare = compareList.includes(property.id);

  return (
    <MainLayout>
      <div className="pt-24 pb-20">
        <div className="section-padding">
          {/* Back */}
          <Link to="/listings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              <PropertyGallery images={property.images} title={property.title} />

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                    </div>
                    <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">{property.title}</h1>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
                    {property.status === 'for-rent' && <span className="text-sm text-muted-foreground">/month</span>}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-6 p-5 bg-muted/50 rounded-2xl mb-8">
                  <div className="flex items-center gap-2"><Bed className="w-5 h-5 text-primary" /><span className="text-foreground font-medium">{property.bedrooms} Beds</span></div>
                  <div className="flex items-center gap-2"><Bath className="w-5 h-5 text-primary" /><span className="text-foreground font-medium">{property.bathrooms} Baths</span></div>
                  <div className="flex items-center gap-2"><Maximize className="w-5 h-5 text-primary" /><span className="text-foreground font-medium">{formatArea(property.area)}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /><span className="text-foreground font-medium">Built {property.yearBuilt}</span></div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <button onClick={() => toggleFavorite(property.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-colors font-medium text-sm ${isFav ? 'bg-accent/10 border-accent text-accent' : 'border-border text-foreground hover:bg-muted'}`}>
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-accent' : ''}`} /> {isFav ? 'Saved' : 'Save'}
                  </button>
                  <button onClick={() => isCompare ? removeFromCompare(property.id) : addToCompare(property.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-colors font-medium text-sm ${isCompare ? 'bg-primary/10 border-primary text-primary' : 'border-border text-foreground hover:bg-muted'}`}>
                    <GitCompareArrows className="w-4 h-4" /> {isCompare ? 'In Compare' : 'Compare'}
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-medium text-sm">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-lg text-foreground mb-3">About this property</h2>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-lg text-foreground mb-3">Features & Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 py-2 px-3 bg-muted/50 rounded-xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div>
                  <h2 className="font-heading font-bold text-lg text-foreground mb-3">Location</h2>
                  <MapSection properties={[property]} selectedId={property.id} />
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <button onClick={() => setVisitOpen(true)} className="btn-gradient w-full text-center">
                  Schedule a Visit
                </button>
                <ContactAgentForm property={property} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScheduleVisitModal property={property} open={visitOpen} onClose={() => setVisitOpen(false)} />
    </MainLayout>
  );
}
