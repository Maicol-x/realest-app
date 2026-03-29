import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AdvancedSearchBar from '@/components/AdvancedSearchBar';
import PropertyCard from '@/components/PropertyCard';
import MapSection from '@/components/MapSection';
import { usePropertyStore } from '@/store/usePropertyStore';
import heroImg from '@/assets/hero-property.jpg';

const stats = [
  { icon: Building2, value: '2,500+', label: 'Properties' },
  { icon: Users, value: '1,200+', label: 'Happy Clients' },
  { icon: Shield, value: '15+', label: 'Years Experience' },
  { icon: TrendingUp, value: '98%', label: 'Success Rate' },
];

export default function HomePage() {
  const { properties } = usePropertyStore();
  const featured = properties.filter((p) => p.featured).slice(0, 4);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury modern home" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-foreground/30" />
        </div>

        <div className="relative z-10 section-padding w-full py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/10">
              #1 Premium Real Estate Platform
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Find Your Dream<br />
              <span className="text-accent">Home Today</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mb-10 leading-relaxed">
              Discover exceptional properties curated for discerning buyers. From urban penthouses to coastal retreats.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AdvancedSearchBar />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding -mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-heading font-bold text-2xl text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl font-bold text-foreground"
            >
              Featured Properties
            </motion.h2>
            <p className="text-muted-foreground mt-2">Handpicked luxury listings</p>
          </div>
          <Link to="/listings" className="hidden sm:flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>

        <Link to="/listings" className="sm:hidden mt-6 btn-gradient inline-flex items-center gap-2">
          View all listings <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Map */}
      <section className="section-padding pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl font-bold text-foreground mb-6"
        >
          Explore on Map
        </motion.h2>
        <MapSection properties={properties} />
      </section>

      {/* CTA */}
      <section className="section-padding pb-20">
        <div className="rounded-3xl p-10 lg:p-16 text-center" style={{ background: 'var(--gradient-hero)' }}>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Let our expert agents guide you to the perfect property. Schedule a consultation today.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-card text-foreground font-semibold rounded-xl px-8 py-3.5 hover:bg-card/90 transition-colors">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
