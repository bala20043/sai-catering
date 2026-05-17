import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import KolamDivider from '../components/ui/KolamDivider';
import BookingModal from '../components/ui/BookingModal';
import PageTransition from '../components/layout/PageTransition';
import { TIMELINE, GALLERY_IMAGES } from '../lib/constants';

const festivalImages = [
  'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
];

const About = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(2);

  useEffect(() => {
    const t1 = setInterval(() => setLeftIdx(i => (i + 1) % festivalImages.length), 2000);
    const t2 = setInterval(() => setRightIdx(i => (i + 1) % festivalImages.length), 2500);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="About Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/70" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-accent text-sm tracking-widest uppercase mb-2">Know Our Story</p>
          <h1 className="text-5xl md:text-6xl font-accent font-bold text-cream mb-4">About <span className="shimmer-text">Sai Catering</span></h1>
          <div className="flex items-center justify-center gap-2 text-cream/50 text-sm">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent">About</span>
          </div>
        </div>
      </section>

      <KolamDivider />

      {/* Three Column About */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-8 items-center">
          {/* Left images */}
          <div className="hidden lg:block">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              {festivalImages.map((img, i) => (
                <img key={i} src={img} alt="Festival" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === leftIdx ? 'opacity-100' : 'opacity-0'}`} />
              ))}
            </div>
          </div>
          {/* Center content */}
          <ScrollReveal className="lg:col-span-2 text-center">
            <h2 className="text-4xl font-accent font-bold text-text-dark mb-4">
              <span className="shimmer-text">SAI CATERING</span>
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Founded in the year 2000, Sai Catering has grown from a small family kitchen in Madurai to one of Tamil Nadu's most trusted catering services. With over 25 years of experience, we have served more than 12,000 happy families across weddings, corporate events, birthday celebrations, and traditional ceremonies.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              Our 340+ trained staff and expert chefs specialize in authentic South Indian cuisine, bringing the rich flavors of Tamil Nadu to every event. From the traditional banana leaf sadya to modern buffet setups with live counters, we blend heritage with excellence.
            </p>
            <button onClick={() => setBookingOpen(true)} className="btn-gold">Book Now 🎉</button>
          </ScrollReveal>
          {/* Right images */}
          <div className="hidden lg:block">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              {festivalImages.map((img, i) => (
                <img key={i} src={img} alt="Festival" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === rightIdx ? 'opacity-100' : 'opacity-0'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <KolamDivider />

      {/* Timeline */}
      <section className="py-20 bg-dark kolam-bg">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-accent text-sm tracking-widest uppercase mb-2">Our Journey</p>
            <h2 className="text-4xl font-accent font-bold text-cream">The Story Timeline</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px w-0.5 h-full bg-accent/20" />
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`flex items-center gap-6 mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <p className="text-3xl font-accent font-bold text-accent mb-1">{item.year}</p>
                    <h3 className="text-lg font-heading font-bold text-cream mb-1">{item.title}</h3>
                    <p className="text-cream/50 text-sm">{item.desc}</p>
                  </div>
                  <div className="w-4 h-4 bg-accent rounded-full border-4 border-dark shadow-lg shadow-accent/30 shrink-0 relative z-10" />
                  <div className="flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <KolamDivider />

      {/* Best Catering */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <p className="text-primary text-sm tracking-widest uppercase mb-2">Excellence in Every Dish</p>
            <h2 className="text-4xl font-accent font-bold text-text-dark mb-4">Best Catering Place in Madurai</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mb-6" />
            <p className="text-text-muted leading-relaxed mb-4">
              At Sai Catering, we believe food is more than sustenance — it's a celebration. Every dish we prepare carries the warmth of Tamil Nadu traditions and the expertise of decades of experience.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              Our commitment to using fresh, locally-sourced ingredients and traditional spice blends sets us apart. Whether it's a grand wedding or an intimate gathering, we deliver the same passion and perfection.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Us <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <img src="https://images.pexels.com/photos/3298687/pexels-photo-3298687.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Chef" className="rounded-2xl shadow-2xl w-full h-[450px] object-cover" />
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="py-6 bg-dark overflow-hidden">
        <div className="gallery-strip">
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} className="h-40 w-60 object-cover rounded-lg mx-2 shrink-0" />
          ))}
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </PageTransition>
  );
};

export default About;
