import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { NAV_LINKS, PHONE, MENU_CATEGORIES } from '../../lib/constants';
import BookingModal from '../ui/BookingModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const [mobileMenuDropdown, setMobileMenuDropdown] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const clickCount = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // eslint-disable-next-line
  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleLogoClick = () => {
    clickCount.current += 1;
    setTimeout(() => { clickCount.current = 0; }, 500);
    if (clickCount.current >= 2) navigate('/admin/login');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-glass py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div onClick={handleLogoClick} className="cursor-pointer flex items-center select-none">
            <img src="/logo.png" alt="Sai Catering Logo" className="h-16 w-auto object-contain drop-shadow-md" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              link.name === 'Menu' ? (
                <div key="menu" className="relative" onMouseEnter={() => setMenuDropdown(true)} onMouseLeave={() => setMenuDropdown(false)}>
                  <Link to="/menu" className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 ${location.pathname === '/menu' ? 'text-accent' : 'text-cream/80 hover:text-accent'}`}>
                    Menu <ChevronDown size={14} />
                  </Link>
                  <AnimatePresence>
                    {menuDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-64 bg-dark/95 backdrop-blur-xl border border-accent/10 rounded-xl py-2 shadow-2xl"
                      >
                        {MENU_CATEGORIES.slice(0, 8).map(cat => (
                          <Link key={cat.id} to={`/menu?cat=${cat.id}`} className="block px-4 py-2 text-sm text-cream/70 hover:text-accent hover:bg-accent/5 transition-all">
                            {cat.name}
                          </Link>
                        ))}
                        <Link to="/menu" className="block px-4 py-2 text-sm text-accent font-semibold border-t border-accent/10 mt-1">
                          View All Categories →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.name} to={link.path} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${location.pathname === link.path ? 'text-accent' : 'text-cream/80 hover:text-accent'}`}>
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${PHONE}`} className="text-cream/70 hover:text-accent transition-colors flex items-center gap-1 text-sm">
              <Phone size={14} /> {PHONE}
            </a>
            <button onClick={() => setBookingOpen(true)} className="btn-gold text-sm !py-2 !px-5 pulse-glow">
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-cream p-2">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-dark/95 backdrop-blur-xl border-t border-accent/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map(link => (
                  link.name === 'Menu' ? (
                    <div key="menu" className="block">
                      <button 
                        onClick={() => setMobileMenuDropdown(!mobileMenuDropdown)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all ${location.pathname === '/menu' || location.pathname.startsWith('/menu/') ? 'text-accent bg-accent/10' : 'text-cream/80'}`}
                      >
                        Menu
                        <ChevronDown size={18} className={`transition-transform duration-300 ${mobileMenuDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileMenuDropdown && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-dark/40 rounded-b-lg mx-2"
                          >
                            <div className="py-2 flex flex-col">
                              {MENU_CATEGORIES.slice(0, 6).map(cat => (
                                <Link 
                                  key={cat.id} 
                                  to={`/menu?cat=${cat.id}`} 
                                  onClick={() => setMobileOpen(false)}
                                  className="px-6 py-2.5 text-sm text-cream/70 hover:text-accent border-l-2 border-transparent hover:border-accent"
                                >
                                  {cat.name}
                                </Link>
                              ))}
                              <Link 
                                to="/menu" 
                                onClick={() => setMobileOpen(false)}
                                className="px-6 py-3 mt-1 text-sm text-accent font-semibold flex items-center gap-2"
                              >
                                View All Categories →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={link.name} to={link.path} onClick={() => setMobileOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${location.pathname === link.path ? 'text-accent bg-accent/10' : 'text-cream/80'}`}>
                      {link.name}
                    </Link>
                  )
                ))}
                <button onClick={() => { setBookingOpen(true); setMobileOpen(false); }} className="btn-gold w-full mt-3 text-center">
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default Navbar;
