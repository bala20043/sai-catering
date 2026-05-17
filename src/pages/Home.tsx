import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Star, Leaf, ChefHat, Landmark, PartyPopper, TreePalm, Truck, ArrowRight, Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import KolamDivider from '../components/ui/KolamDivider';
import BookingModal from '../components/ui/BookingModal';
import { HERO_IMAGES, SLIDER_IMAGES, STATS, WHY_CHOOSE_US, GALLERY_IMAGES } from '../lib/constants';
import { supabase } from '../lib/supabase';
import type { Testimonial } from '../types';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';

const iconMap: Record<string, React.ElementType> = { Leaf, ChefHat, Landmark, PartyPopper, TreePalm, Truck };

const WEDDING_BG_IMAGES = [
  'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200', // Traditional Golden Mandapam
  'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200', // Authentic Tamil Nadu Feast (Banana Leaf Sappadu)
  'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1200', // Royal Stage Setup
  'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1200', // Steaming Traditional Tiffin Spread
  'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1200', // Marigold & Rose Wedding Decor
  'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1200', // Saffron Festive Biryani & Rice
  'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1200', // Clay Pot Traditional Feast Cookout
  'https://images.pexels.com/photos/6049609/pexels-photo-6049609.jpeg?auto=compress&cs=tinysrgb&w=1200', // Sweet Mysore Pak & Payasam Desserts
];

const Home = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [bgIdx, setBgIdx] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 3500);
    const tBg = setInterval(() => setBgIdx(i => (i + 1) % WEDDING_BG_IMAGES.length), 4000);
    return () => { clearInterval(t); clearInterval(tBg); };
  }, []);

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_approved', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setTestimonials(data); });
  }, []);

  return (
    <PageTransition>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-dark kolam-bg">
        {/* Background Tamil Nadu Wedding Slider with Deep Bleed to prevent sub-pixel gaps */}
        <div className="absolute -top-10 left-0 right-0 -bottom-36 z-0 overflow-hidden">
          {WEDDING_BG_IMAGES.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Tamil Nadu Wedding Background"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === bgIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{
                transition: 'opacity 1.2s ease-in-out, transform 4.5s linear',
                filter: 'brightness(1.12)',
                objectPosition: 'center 45%'
              }}
            />
          ))}
          {/* Directional overlay - very light right overlay for maximum vivid brightness */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-dark/2 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-8 items-center relative z-20 pt-24 pb-12">
          {/* Left Text */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
              <span className="text-accent text-sm font-tamil">சிறந்த விருந்து</span>
              <span className="text-accent/60 text-xs">• Premium Feast</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display mb-3 leading-tight">
              <span className="shimmer-text">SAI</span>{' '}
              <span className="text-cream block sm:inline mt-1 sm:mt-0">CATERING</span>
            </h1>
            <p className="text-accent/80 text-base sm:text-lg font-heading italic mb-4">Catering Service in Madurai</p>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-body mx-auto lg:mx-0">
              Elevating Your Events With Exceptional Food — 25+ Years of Tamil Nadu's Finest Catering
            </p>
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <button onClick={() => setBookingOpen(true)} className="btn-gold pulse-glow text-sm sm:text-base !py-3 !px-8">
                Book Now 🎉
              </button>
              <Link to="/menu" className="btn-primary flex items-center gap-2 text-sm sm:text-base !py-3 !px-8">
                View Menu <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8">
              {[{ v: '25+', l: 'Years' }, { v: '250+', l: 'Menus' }, { v: '12K+', l: 'Families' }].map(s => (
                <div key={s.l} className="text-center">
                  <p className="text-xl sm:text-2xl font-bold font-accent text-accent">{s.v}</p>
                  <p className="text-cream/40 text-[10px] sm:text-xs uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Carousel */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block">
            <div className="relative w-[420px] h-[500px] mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-accent/30 shadow-2xl">
                {HERO_IMAGES.map((img, i) => (
                  <img key={i} src={img} alt="Chef" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`} />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-3xl border border-accent/10 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Floating petals */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="petal text-accent/20 text-2xl" style={{
            left: `${15 + i * 18}%`, animationDelay: `${i * 1.5}s`,
            animation: `petal-fall ${6 + i}s linear infinite`,
          }}>🌸</div>
        ))}
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-20 bg-surface banana-leaf-bg">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <p className="text-primary font-heading text-sm tracking-widest uppercase mb-2">About Us</p>
            <h2 className="text-4xl font-accent font-bold text-text-dark mb-2">
              Over <span className="text-primary">25 Years</span> Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mb-6" />
            <p className="text-text-muted leading-relaxed mb-4">
              Based in the heart of Madurai, Sai Catering has been the trusted choice for Tamil Nadu weddings, 
              corporate events, and family celebrations. Our expert chefs blend traditional recipes with modern 
              presentation to create unforgettable dining experiences.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              From intimate family gatherings to grand weddings with 2000+ guests, we bring the authentic 
              flavors of Tamil Nadu to every celebration.
            </p>
            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Know More <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative">
              <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Food Spread" className="rounded-2xl shadow-2xl w-full h-[400px] object-cover" />
              <div className="absolute -bottom-4 -left-4 bg-primary text-cream px-6 py-3 rounded-xl font-heading font-bold shadow-xl">
                🏆 Best in Madurai
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-surface"><KolamDivider /></div>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="py-20 bg-dark kolam-bg">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <p className="text-accent text-sm tracking-widest uppercase mb-2">What We Offer</p>
            <h2 className="text-4xl font-accent font-bold text-cream">Our Services</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Wedding Events', desc: 'Tamil Nadu Kalyana Samayal — Grand wedding feasts with banana leaf service, live counters, and 250+ menu options.', img: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=500', color: 'from-primary to-primary-light' },
              { title: 'Corporate Events', desc: 'Professional buffet catering for conferences, team events, and celebrations with on-time delivery.', img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500', color: 'from-secondary to-blue-800' },
              { title: 'Birthday Events', desc: 'Make milestone celebrations memorable with customized menus and festive decorations.', img: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=500', color: 'from-accent to-accent-light' },
            ].map((svc, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -8, rotateY: 3, rotateX: -2 }} transition={{ type: 'spring' }}
                  className="card-3d group rounded-2xl overflow-hidden bg-secondary/30 border border-accent/10 shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${svc.color} opacity-40`} />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-dark/60 backdrop-blur px-3 py-1 rounded-full">
                      <Play size={12} className="text-accent" />
                      <span className="text-cream text-xs">View</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-cream mb-2">{svc.title}</h3>
                    <p className="text-cream/50 text-sm leading-relaxed">{svc.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-gold inline-flex items-center gap-2">
              Explore All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-dark"><KolamDivider /></div>

      {/* ===== FOOD SPECIALITIES SLIDER (Our Speciality) ===== */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          effect="fade"
          loop
          className="h-[400px] md:h-[500px]"
        >
          {SLIDER_IMAGES.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-accent text-sm tracking-widest uppercase mb-1">Our Speciality</p>
                  <h3 className="text-3xl font-heading font-bold text-cream">{img.caption}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="bg-surface"><KolamDivider /></div>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary text-sm tracking-widest uppercase mb-2">Our Promise</p>
            <h2 className="text-4xl font-accent font-bold text-text-dark">Why Choose Sai Catering?</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = iconMap[item.icon] || Leaf;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -5 }}
                    className="bg-cream p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-accent/40 transition-all group">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-accent/20 group-hover:to-primary/20 transition-all">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-text-dark mb-2">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-dark banana-leaf-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p className="text-cream/50 text-sm mt-2 uppercase tracking-wider">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-dark"><KolamDivider /></div>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary text-sm tracking-widest uppercase mb-2">Testimonials</p>
            <h2 className="text-4xl font-accent font-bold text-text-dark">What Our Clients Say</h2>
          </ScrollReveal>
          {testimonials.length > 0 ? (
            <Swiper modules={[Autoplay]} autoplay={{ delay: 4000 }} spaceBetween={24} slidesPerView={1}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} loop>
              {testimonials.map(t => (
                <SwiperSlide key={t.id}>
                  <div className="bg-cream p-6 rounded-2xl border border-border shadow-sm h-full">
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="text-accent fill-accent" />)}
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-4">"{t.content}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-cream font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-text-dark text-sm">{t.name}</p>
                        <p className="text-text-muted text-xs">{t.event_type}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Rajesh K.', event: 'Wedding', text: 'Absolutely unforgettable wedding feast. Every guest praised the food!', rating: 5 },
                { name: 'Priya S.', event: 'Corporate', text: 'Professional service, on-time delivery, outstanding variety.', rating: 5 },
                { name: 'Muthu L.', event: 'Birthday', text: 'My father\'s 80th birthday was made special by Sai Catering.', rating: 5 },
              ].map((t, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-cream p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} className="text-accent fill-accent" />)}
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed mb-4">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-cream font-bold">{t.name[0]}</div>
                      <div>
                        <p className="font-heading font-bold text-text-dark text-sm">{t.name}</p>
                        <p className="text-text-muted text-xs">{t.event}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== GALLERY STRIP ===== */}
      <section className="py-10 bg-dark overflow-hidden">
        <div className="gallery-strip">
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} className="h-48 w-72 object-cover rounded-lg mx-2 shrink-0" />
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 kolam-bg opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-accent font-bold text-cream mb-4">Ready to Create Magic?</h2>
            <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
              Let us make your next celebration unforgettable with authentic Tamil Nadu flavors and exceptional service.
            </p>
            <button onClick={() => setBookingOpen(true)} className="bg-accent text-dark font-bold py-4 px-10 rounded-full text-lg hover:bg-accent-light transition-all shadow-xl hover:shadow-2xl pulse-glow">
              Book Your Event Now 🎉
            </button>
          </ScrollReveal>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </PageTransition>
  );
};

export default Home;
