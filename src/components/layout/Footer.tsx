import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PHONE, EMAIL, ADDRESS, NAV_LINKS, WHATSAPP_LINK } from '../../lib/constants';
import KolamDivider from '../ui/KolamDivider';

const Footer = () => {
  const [subEmail, setSubEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail) {
      toast.success('Thank you for subscribing!');
      setSubEmail('');
    }
  };

  return (
    <footer className="bg-dark kolam-bg relative">
      <KolamDivider />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Sai Catering Logo" className="h-20 w-auto object-contain drop-shadow-md brightness-0 invert" />
            </div>
            <p className="text-cream/50 text-sm leading-relaxed mb-4">
              Elevating celebrations with 25+ years of authentic Tamil Nadu cuisine. From traditional weddings to modern events.
            </p>
            <div className="flex gap-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-dark transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.647-1.478A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.16 0-4.16-.685-5.798-1.849l-.416-.273-2.759.878.858-2.683-.3-.437A9.715 9.715 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-dark transition-all"><Instagram size={16}/></a>
              <a href="#" className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-dark transition-all"><Facebook size={16}/></a>
              <a href="#" className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-dark transition-all"><Youtube size={16}/></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-cream/50 hover:text-accent text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-accent font-heading font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-cream/50 text-sm mb-3">Get the latest updates on our menus and offers.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email" value={subEmail} onChange={e => setSubEmail(e.target.value)}
                placeholder="Your email" className="flex-1 px-3 py-2 bg-secondary/50 border border-accent/20 rounded-l-lg text-cream text-sm focus:outline-none focus:border-accent"
              />
              <button type="submit" className="bg-accent text-dark px-3 py-2 rounded-r-lg hover:bg-accent-light transition-colors">
                <Send size={16}/>
              </button>
            </form>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent font-heading font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-cream/50 text-sm">
                <Phone size={16} className="text-accent mt-0.5 shrink-0" />
                <a href={`tel:${PHONE}`} className="hover:text-accent transition-colors">{PHONE}</a>
              </li>
              <li className="flex items-start gap-2 text-cream/50 text-sm">
                <Mail size={16} className="text-accent mt-0.5 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-accent transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2 text-cream/50 text-sm">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span>{ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent/10 py-4">
        <p className="text-center text-cream/30 text-sm">
          © {new Date().getFullYear()} Sai Catering — Madurai, Tamil Nadu. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
