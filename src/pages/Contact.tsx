import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <MainLayout>
      <div className="pt-24 pb-20 section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Have a question or want to schedule a consultation? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: MapPin, title: 'Visit Us', text: '123 Luxury Ave, Suite 500\nNew York, NY 10001' },
                { icon: Phone, title: 'Call Us', text: '+1 (555) 000-1234\nMon–Fri, 9am–6pm EST' },
                { icon: Mail, title: 'Email Us', text: 'hello@luxestate.com\ninfo@luxestate.com' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                      <input type="text" required placeholder="John" className="input-search w-full" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                      <input type="text" required placeholder="Doe" className="input-search w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input type="email" required placeholder="john@example.com" className="input-search w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone (optional)</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="input-search w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <textarea required rows={5} placeholder="Tell us how we can help..." className="input-search w-full resize-none" />
                  </div>
                  <button type="submit" className="btn-gradient w-full flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
