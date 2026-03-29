import { useState } from 'react';
import { Send, MessageCircle, CheckCircle } from 'lucide-react';
import { Property } from '@/types/property';
import { getInitials } from '@/utils/format';

interface Props {
  property: Property;
}

export default function ContactAgentForm({ property }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: `Hi, I'm interested in "${property.title}". Could you provide more details?` });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const whatsappLink = `https://wa.me/${property.agent.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hi ${property.agent.name}, I'm interested in ${property.title}`
  )}`;

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold">
          {getInitials(property.agent.name)}
        </div>
        <div>
          <p className="font-heading font-semibold text-foreground">{property.agent.name}</p>
          <p className="text-sm text-muted-foreground">Listing Agent</p>
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-6">
          <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
          <p className="font-heading font-semibold text-foreground">Message Sent!</p>
          <p className="text-sm text-muted-foreground">The agent will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="input-search w-full text-sm"
          />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Your email"
            className="input-search w-full text-sm"
          />
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="input-search w-full text-sm resize-none"
          />
          <button type="submit" className="btn-gradient w-full flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      )}

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-success/10 text-success font-medium text-sm hover:bg-success/20 transition-colors"
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
    </div>
  );
}
