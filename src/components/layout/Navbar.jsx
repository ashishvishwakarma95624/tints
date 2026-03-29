import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import logo from "../../assets/images/dsp-logo.jpg";

const LINKS = [
  { to:'/',         label:'Home'     },
  { to:'/about',    label:'About'    },
  { to:'/services', label:'Services' },
  { to:'/pricing',  label:'Pricing'  },
  { to:'/gallery',  label:'Gallery'  },
  { to:'/blog',     label:'Blog'     },
  { to:'/contact',  label:'Contact'  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    fn(); // Check initial scroll position
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <nav 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'shadow-[0_10px_30px_-10px_rgba(0,168,255,0.2)] border-b border-[#00A8FF]/20' 
          : 'backdrop-blur-sm'
      }`}
      style={{ 
        backgroundColor: scrolled ? 'rgba(10, 15, 28, 0.95)' : 'rgba(10, 15, 28, 0.95)'
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center h-[90px] gap-4">

        {/* Logo - Left */}
        <Link to="/" className="flex items-center shrink-0 group">
          <div className="relative">
            <img src={logo} alt="DSP" className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"/>
            <div className="absolute -inset-1 bg-[#00A8FF]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </div>
        </Link>

        {/* Desktop nav - Center */}
        <ul className="hidden xl:flex items-center justify-center flex-1 gap-2">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 text-[14px] font-medium tracking-wide transition-all rounded-lg group
                  ${isActive 
                    ? 'text-[#00A8FF]' 
                    : 'text-[#f6f7fb] hover:text-[#00A8FF]'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span 
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#00A8FF] transition-all duration-300 group-hover:w-full ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA - Right */}
        <div className="hidden xl:flex items-center gap-4">
          <a 
            href="tel:5551234567" 
            className="flex items-center gap-2 text-sm font-medium text-[#f6f7fb] hover:text-[#00A8FF] transition-colors px-4 py-2 rounded-lg hover:bg-[#00A8FF]/10"
          >
            <Phone size={16} className="text-[#00A8FF]" />
            <span>(555) 123-4567</span>
          </a>

          <Link
            to="/contact"
            className="relative px-6 py-2.5 bg-gradient-to-r from-[#00A8FF] to-[#007BFF] text-[#05070B] font-semibold rounded-lg text-sm transition-all overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Calendar size={16} />
              Book Now
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF] to-[#00A8FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Burger - Mobile */}
        <button
          onClick={() => setOpen(v => !v)}
          className="xl:hidden ml-auto p-2.5 text-[#f6f7fb] hover:bg-[#00A8FF]/10 rounded-lg transition-colors relative"
          aria-label="Toggle menu"
        >
          <div className="relative">
            {open ? <X size={24} /> : <Menu size={24} />}
            {!scrolled && !open && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00A8FF] rounded-full animate-pulse"></span>
            )}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`xl:hidden fixed inset-x-0 top-[90px] border-t border-[#00A8FF]/20 transform transition-transform duration-300 shadow-2xl ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: 'rgba(10, 15, 28, 0.98)' }}
      >
        <div className="max-w-7xl mx-auto px-5 py-6">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative flex py-3.5 px-4 text-base font-medium rounded-lg transition-all overflow-hidden group
                  ${isActive 
                    ? 'text-[#00A8FF] bg-[#00A8FF]/10' 
                    : 'text-[#f6f7fb] hover:text-[#00A8FF] hover:bg-[#00A8FF]/5'}`
                }
              >
                <span className="relative z-10">{label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A8FF]/0 via-[#00A8FF]/5 to-[#00A8FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </NavLink>
            ))}
          </div>

          {/* Mobile Contact Info */}
          <div className="mt-8 pt-6 border-t border-[#00A8FF]/20">
            <a 
              href="tel:5551234567" 
              className="flex items-center justify-center gap-2 text-[#f6f7fb] hover:text-[#00A8FF] transition-colors py-3 bg-[#00A8FF]/5 rounded-lg"
            >
              <Phone size={16} className="text-[#00A8FF]" />
              <span className="font-medium">(555) 123-4567</span>
            </a>
            
            <Link
              to="/contact"
              className="mt-3 flex justify-center bg-gradient-to-r from-[#00A8FF] to-[#007BFF] text-[#05070B] font-semibold py-3.5 px-6 rounded-lg transition-all w-full hover:shadow-lg hover:shadow-[#00A8FF]/20"
            >
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                Book Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}