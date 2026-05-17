import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import ScrollReveal from '../components/ui/ScrollReveal';
import KolamDivider from '../components/ui/KolamDivider';
import PageTransition from '../components/layout/PageTransition';
import { supabase } from '../lib/supabase';
import { PHONE, EMAIL, ADDRESS, GALLERY_IMAGES } from '../lib/constants';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  event_type: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.from('contacts').insert([data]);
    setLoading(false);
    if (error) { toast.error('Failed to send message.'); return; }
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/75" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-accent text-sm tracking-widest uppercase mb-2">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-accent font-bold text-cream">Contact Us</h1>
          <div className="flex items-center justify-center gap-2 text-cream/50 text-sm mt-4">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link><span>/</span><span className="text-accent">Contact</span>
          </div>
        </div>
      </section>

      <div className="bg-surface"><KolamDivider /></div>

      {/* Contact Form + Info */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <p className="text-primary text-sm tracking-widest uppercase mb-2">Send Us A Message</p>
            <h2 className="text-3xl font-accent font-bold text-text-dark mb-6">We'd Love to Hear From You</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1">Full Name *</label>
                  <input {...register('name')} placeholder="Your name" className="w-full px-4 py-3 border border-border rounded-xl bg-cream focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all" />
                  {errors.name && <p className="text-primary text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1">Email *</label>
                  <input {...register('email')} type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-border rounded-xl bg-cream focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all" />
                  {errors.email && <p className="text-primary text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1">Phone</label>
                  <input {...register('phone')} placeholder="+91 XXXXXXXXXX" className="w-full px-4 py-3 border border-border rounded-xl bg-cream focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1">Event Type</label>
                  <select {...register('event_type')} className="w-full px-4 py-3 border border-border rounded-xl bg-cream focus:border-primary focus:outline-none transition-all">
                    <option value="">Select...</option>
                    <option>Wedding</option><option>Corporate</option><option>Birthday</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-1">Message *</label>
                <textarea {...register('message')} rows={5} placeholder="Tell us about your event..." className="w-full px-4 py-3 border border-border rounded-xl bg-cream focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none" />
                {errors.message && <p className="text-primary text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50">
                <Send size={16} /> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Phone', value: PHONE, href: `tel:${PHONE}` },
                { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: MapPin, label: 'Address', value: ADDRESS, href: '#map' },
                { icon: Clock, label: 'Hours', value: 'Mon - Sun: 7:00 AM - 10:00 PM', href: '' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-cream rounded-xl border border-border">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-heading font-bold text-text-dark hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-heading font-bold text-text-dark">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-dark"><KolamDivider /></div>

      {/* Map */}
      <section id="map" className="py-12 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-3xl font-accent font-bold text-cream">Find Us in Madurai</h2>
          </ScrollReveal>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-accent/10 h-[400px]">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.!2d78.149749!3d9.947258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTYnNTAuMSJOIDc4wrAwOCc1OS4xIkU!5e0!3m2!1sen!2sin!4v1`}
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Sai Catering Location"
            />
          </div>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="py-6 bg-dark overflow-hidden">
        <div className="gallery-strip">
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} className="h-40 w-60 object-cover rounded-lg mx-2 shrink-0" />
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
