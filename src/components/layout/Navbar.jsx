import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
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
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname }          = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 bg-white/96 backdrop-blur-sm border-b border-gold/10 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center h-[66px] gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-baseline gap-1.5 shrink-0">
          <img src={logo} alt="Logo" width="120" height="60"/>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden xl:flex items-center flex-1 ml-2">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-[12px] font-medium tracking-[.12em] uppercase transition-colors ${isActive ? 'text-gold' : 'text-gray-500 hover:text-gold'}`
                }>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center gap-5 ml-auto">
          <a href="tel:5551234567" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-gray-600 hover:text-gold transition-colors">
            <Phone size={13} />(555) 123-4567
          </a>
          <Link to="/contact" className="btn-primary py-2.5">Get in Touch</Link>
        </div>

        {/* Burger */}
        <button onClick={() => setOpen(v => !v)}
          className="xl:hidden ml-auto p-2 rounded text-gray-700 hover:bg-gray-100 transition-colors">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden border-t border-gray-100 bg-white shadow-xl px-5 pb-5 pt-3">
          {LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `flex py-3 text-sm font-medium border-b border-gray-50 last:border-0 ${isActive ? 'text-gold' : 'text-gray-700'}`
              }>
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary w-full mt-4 justify-center">Get in Touch</Link>
        </div>
      )}
    </nav>
  );
}
