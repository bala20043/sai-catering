import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';
import PageTransition from '../components/layout/PageTransition';
import { MENU_CATEGORIES } from '../lib/constants';

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('cat') || 'all';

  const categoriesToRender = activeCat === 'all' 
    ? MENU_CATEGORIES 
    : MENU_CATEGORIES.filter(c => c.id === activeCat);
    
  if (categoriesToRender.length === 0) categoriesToRender.push(MENU_CATEGORIES[0]);

  useEffect(() => {
    // Scroll to top on category change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCat]);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Menu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/75" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-accent text-sm tracking-widest uppercase mb-2">Explore Our Cuisine</p>
          <h1 className="text-5xl md:text-6xl font-accent font-bold text-cream">Our Menu</h1>
          <div className="flex items-center justify-center gap-2 text-cream/50 text-sm mt-4">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link><span>/</span><span className="text-accent">Menu</span>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="sticky top-20 lg:top-24 z-40 bg-cream border border-border rounded-2xl p-4 shadow-sm">
              <h3 className="text-lg font-heading font-bold text-text-dark mb-4 px-2 hidden lg:block">Menu Categories</h3>
              <nav className="flex overflow-x-auto lg:flex-col gap-2 lg:gap-1 pb-2 lg:pb-0 hide-scrollbar">
                <button onClick={() => setSearchParams({ cat: 'all' })}
                  className={`whitespace-nowrap lg:whitespace-normal w-auto lg:w-full text-left px-4 lg:px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex-shrink-0 lg:flex-shrink ${activeCat === 'all' ? 'bg-primary text-cream shadow-md' : 'text-text-muted hover:bg-accent/10 hover:text-text-dark bg-secondary/20 lg:bg-transparent'}`}>
                  All Categories
                  <span className="ml-2 lg:float-right text-xs opacity-60">({MENU_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0)})</span>
                </button>
                {MENU_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setSearchParams({ cat: cat.id })}
                    className={`whitespace-nowrap lg:whitespace-normal w-auto lg:w-full text-left px-4 lg:px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex-shrink-0 lg:flex-shrink ${activeCat === cat.id ? 'bg-primary text-cream shadow-md' : 'text-text-muted hover:bg-accent/10 hover:text-text-dark bg-secondary/20 lg:bg-transparent'}`}>
                    {cat.name}
                    <span className="ml-2 lg:float-right text-xs opacity-60">({cat.items.length})</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Food Grid */}
          <div className="flex-1 space-y-16">
            {categoriesToRender.map(category => (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-accent font-bold text-text-dark">{category.name}</h2>
                    <p className="text-text-muted text-sm mt-1">{category.items.length} items available</p>
                  </div>
                </div>
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, i) => (
                    <ScrollReveal key={item.id} delay={i * 0.08}>
                      <motion.div layout whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-cream rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-[0_0_30px_rgba(212,172,13,0.5)] hover:border-accent transition-all duration-500 group relative">
                        {/* Glowing Accent Border Border Top on Hover */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                        
                        <div className="h-48 overflow-hidden relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                          {/* Pulse Glow Light Ring inside card */}
                          <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/40 rounded-t-2xl transition-all duration-500 pointer-events-none" />
                        </div>
                        
                        <div className="p-5">
                          <h3 className="font-heading font-bold text-text-dark text-base group-hover:text-primary transition-colors duration-300">{item.name}</h3>
                          {item.tamilName && <p className="text-accent text-sm font-tamil mt-1 tracking-wide">{item.tamilName}</p>}
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default MenuPage;
