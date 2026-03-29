import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Lux<span className="text-primary">Estate</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium real estate platform connecting buyers with their dream properties. Trusted by thousands of homeowners worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: '/listings', label: 'Browse Listings' },
                { to: '/favorites', label: 'My Favorites' },
                { to: '/compare', label: 'Compare' },
                { to: '/about', label: 'About Us' },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Property Types</h4>
            <div className="flex flex-col gap-2.5">
              {['Houses', 'Apartments', 'Penthouses', 'Villas', 'Lofts'].map((t) => (
                <span key={t} className="text-sm text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>123 Luxury Ave, New York, NY</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (555) 000-1234</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@luxestate.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; 2024 LuxEstate. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms</span>
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
