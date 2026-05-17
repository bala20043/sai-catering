import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { GALLERY_IMAGES } from '../lib/constants';

const filters = ['all', 'wedding', 'corporate', 'birthday', 'food', 'decorations'] as const;

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeFilter === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.category === activeFilter);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const nextImg = () => setLightbox(i => i !== null ? (i + 1) % filtered.length : null);
  const prevImg = () => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/75" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-accent text-sm tracking-widest uppercase mb-2">Visual Stories</p>
          <h1 className="text-5xl md:text-6xl font-accent font-bold text-cream">Our Gallery</h1>
          <div className="flex items-center justify-center gap-2 text-cream/50 text-sm mt-4">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link><span>/</span><span className="text-accent">Gallery</span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${activeFilter === f ? 'bg-primary text-cream shadow-lg' : 'bg-cream text-text-muted border border-border hover:border-accent/30'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="masonry-grid">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="masonry-grid-item">
                  <div onClick={() => openLightbox(i)}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all">
                    <img src={img.src} alt={img.alt} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"
                      style={{ minHeight: `${200 + (i % 3) * 80}px` }} />
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/50 transition-all flex items-center justify-center">
                      <p className="text-cream text-sm font-heading opacity-0 group-hover:opacity-100 transition-opacity capitalize">{img.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="lightbox-overlay" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-cream/80 hover:text-cream z-50"><X size={28} /></button>
            <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-4 text-cream/80 hover:text-cream z-50"><ChevronLeft size={36} /></button>
            <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-4 text-cream/80 hover:text-cream z-50"><ChevronRight size={36} /></button>
            <img src={filtered[lightbox]?.src} alt={filtered[lightbox]?.alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl" onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Gallery;
