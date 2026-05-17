import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import KolamDivider from '../components/ui/KolamDivider';
import BookingModal from '../components/ui/BookingModal';
import PageTransition from '../components/layout/PageTransition';

const services = [
  {
    title: 'Wedding Events',
    subtitle: 'Tamil Nadu Kalyana Samayal',
    desc: 'Experience the grandeur of a traditional Tamil Nadu wedding feast. Our expert team handles everything from menu planning to live banana leaf service.',
    img: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=700',
    features: ['Traditional Banana Leaf Service', 'Live Cooking Counters', '250+ Menu Varieties', 'Kalyana Samayal Setup', 'Professional Staff of 50+', 'Mandapam Decoration Support'],
    reverse: false,
  },
  {
    title: 'Corporate Events',
    subtitle: 'Professional Catering',
    desc: 'Impress your clients and colleagues with our professional catering service. Punctual delivery, hygienic packaging, and diverse menu options.',
    img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=700',
    features: ['Buffet & Box Catering', 'Live Counters', 'Hygienic Packaging', 'On-Time Delivery', 'Custom Menus', 'Conference Tea & Snacks'],
    reverse: true,
  },
  {
    title: 'Birthday Events',
    subtitle: 'Celebration Catering',
    desc: 'From first birthdays to milestone 60th, 70th, and 80th celebrations — we create menus that make every age special in the Tamil tradition.',
    img: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=700',
    features: ['Milestone Birthday Packages', 'Theme-Based Menus', 'Cake & Dessert Counter', 'Kids Menu Options', 'Live Entertainment Support', 'Complete Decoration'],
    reverse: false,
  },
];

const otherServices = [
  { title: 'Seemantham Ceremony', img: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Traditional baby shower celebrations with authentic menu.' },
  { title: 'Annaprasana', img: 'https://images.pexels.com/photos/4331790/pexels-photo-4331790.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'First rice ceremony with complete traditional setup.' },
  { title: 'House Warming', img: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Breakfast & lunch catering for gruhapravesam.' },
  { title: 'Mehndi Function', img: 'https://images.pexels.com/photos/5638268/pexels-photo-5638268.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Colorful food counters for mehndi celebrations.' },
  { title: 'Retirement Function', img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Grand farewell feasts with personalized menus.' },
  { title: 'Live Counters & Stalls', img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Interactive food stalls for any event type.' },
];

const Services = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/3298687/pexels-photo-3298687.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/70" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-accent text-sm tracking-widest uppercase mb-2">What We Do Best</p>
          <h1 className="text-5xl md:text-6xl font-accent font-bold text-cream">Our Services</h1>
          <div className="flex items-center justify-center gap-2 text-cream/50 text-sm mt-4">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link><span>/</span><span className="text-accent">Services</span>
          </div>
        </div>
      </section>

      <KolamDivider />

      {/* Main Services */}
      {services.map((svc, i) => (
        <section key={i} className={`py-20 ${i % 2 === 0 ? 'bg-surface' : 'bg-dark kolam-bg'}`}>
          <div className={`max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center ${svc.reverse ? 'lg:flex-row-reverse' : ''}`}>
            <ScrollReveal direction={svc.reverse ? 'right' : 'left'} className={svc.reverse ? 'lg:order-2' : ''}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={svc.img} alt={svc.title} className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction={svc.reverse ? 'left' : 'right'} className={svc.reverse ? 'lg:order-1' : ''}>
              <p className={`text-sm tracking-widest uppercase mb-2 ${i % 2 === 0 ? 'text-primary' : 'text-accent'}`}>{svc.subtitle}</p>
              <h2 className={`text-4xl font-accent font-bold mb-4 ${i % 2 === 0 ? 'text-text-dark' : 'text-cream'}`}>{svc.title}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mb-6" />
              <p className={`leading-relaxed mb-6 ${i % 2 === 0 ? 'text-text-muted' : 'text-cream/60'}`}>{svc.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {svc.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Check size={16} className="text-accent shrink-0" />
                    <span className={`text-sm ${i % 2 === 0 ? 'text-text-muted' : 'text-cream/70'}`}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setBookingOpen(true)} className="btn-gold">Book This Service</button>
            </ScrollReveal>
          </div>
          {i < services.length - 1 && <KolamDivider />}
        </section>
      ))}

      <KolamDivider />

      {/* Other Services */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary text-sm tracking-widest uppercase mb-2">More Options</p>
            <h2 className="text-4xl font-accent font-bold text-text-dark">Other Services</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((svc, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="bg-cream rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all group">
                  <div className="h-48 overflow-hidden">
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-heading font-bold text-text-dark mb-2">{svc.title}</h3>
                    <p className="text-text-muted text-sm">{svc.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </PageTransition>
  );
};

export default Services;
