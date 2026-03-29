import { motion } from 'framer-motion';
import { Award, Users, Home, Target } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

const values = [
  { icon: Award, title: 'Excellence', desc: 'We maintain the highest standards in every property we list and every client interaction.' },
  { icon: Users, title: 'Client First', desc: 'Your dream home is our priority. We listen, understand, and deliver beyond expectations.' },
  { icon: Home, title: 'Curated Selection', desc: 'Every property in our portfolio is hand-selected to ensure quality and value.' },
  { icon: Target, title: 'Market Expertise', desc: '15+ years of deep market knowledge to help you make informed decisions.' },
];

const team = [
  { name: 'Sarah Mitchell', role: 'CEO & Founder', bio: '20 years in luxury real estate' },
  { name: 'James Cooper', role: 'Head of Sales', bio: 'Specialist in urban properties' },
  { name: 'Elena Rodriguez', role: 'Client Relations', bio: 'Dedicated to client satisfaction' },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-padding py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-medium text-sm">About LuxEstate</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Redefining Real Estate<br />
              <span className="gradient-text">Since 2009</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              We connect discerning buyers with exceptional properties. Our curated approach ensures every listing meets our rigorous standards of quality, value, and lifestyle.
            </p>
          </motion.div>
        </section>

        {/* Values */}
        <section className="section-padding py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="section-padding py-16">
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-10">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-card rounded-2xl border border-border p-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-primary text-xl">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
