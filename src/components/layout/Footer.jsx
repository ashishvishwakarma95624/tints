import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const TICKER = [
  "Window Tint",
  "PPF",
  "Ceramic Coating",
  "Vehicle Wrap",
  "Office Signs",
  "Vinyl Stickers",
  "Tire Swap",
  "Commercial Tints",
  "3D Printing",
  "Handyman",
  "Car Detailing",
  "Custom Kits",
];

export default function Footer() {
  return (
    <>
      {/* Services Ticker - Animated Strip */}
      <div className="bg-gradient-to-r from-[#00A8FF]/20 via-[#007BFF]/20 to-[#00A8FF]/20 border-y border-[#00A8FF]/20 overflow-hidden relative">
        <div className="absolute inset-0 bg-[#05070B]/40"></div>
        <div className="flex whitespace-nowrap animate-marquee py-4 relative z-10">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="px-8 text-sm tracking-widest uppercase text-[#f6f7fb] flex items-center gap-4 font-medium"
            >
              {item}
              <span className="text-[#00A8FF] text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-gradient-to-b from-[#05070B] to-[#0A0F1C] text-[#f6f7fb] relative overflow-hidden">
        {/* Simple Background Pattern - Dots */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #00A8FF 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
        
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A8FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#007BFF]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 border-b border-[#00A8FF]/20 pb-12">

            {/* Brand - Large Column */}
            <div className="lg:col-span-4 space-y-5">
              <div className="relative inline-block">
                <h3 className="text-3xl font-bold tracking-wider text-[#f6f7fb] relative z-10">
                  DSP Tints
                </h3>
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#00A8FF] to-[#007BFF]"></div>
              </div>

              <p className="text-sm text-[#f6f7fb]/70 leading-relaxed max-w-sm">
                Premium automotive window tinting services offering UV protection, heat rejection and lifetime quality with professional installation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#00A8FF]/10 flex items-center justify-center group-hover:bg-[#00A8FF]/20 transition-colors">
                    <Phone size={14} className="text-[#00A8FF]" />
                  </div>
                  <a href="tel:5551234567" className="text-sm text-[#f6f7fb]/80 hover:text-[#00A8FF] transition">
                    (555) 123-4567
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#00A8FF]/10 flex items-center justify-center group-hover:bg-[#00A8FF]/20 transition-colors">
                    <Mail size={14} className="text-[#00A8FF]" />
                  </div>
                  <a href="mailto:gurucreations00@gmail.com" className="text-sm text-[#f6f7fb]/80 hover:text-[#00A8FF] transition">
                    gurucreations00@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#00A8FF]/10 flex items-center justify-center group-hover:bg-[#00A8FF]/20 transition-colors">
                    <MapPin size={14} className="text-[#00A8FF]" />
                  </div>
                  <span className="text-sm text-[#f6f7fb]/80">
                    123 Business Ave, Suite 100
                  </span>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#00A8FF]/10 flex items-center justify-center group-hover:bg-[#00A8FF]/20 transition-colors">
                    <Clock size={14} className="text-[#00A8FF]" />
                  </div>
                  <span className="text-sm text-[#f6f7fb]/80">
                    Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-4">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Youtube, href: '#' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-[#00A8FF]/10 flex items-center justify-center hover:bg-[#00A8FF] hover:text-[#05070B] transition-all duration-300 group"
                  >
                    <social.icon size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Primary Services */}
            <div className="lg:col-span-2">
              <h5 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#00A8FF] relative inline-block">
                Primary Services
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00A8FF]/30"></div>
              </h5>

              <ul className="space-y-3">
                {[
                  ["window-tint", "Window Tint"],
                  ["paint-protection-film", "PPF"],
                  ["ceramic-coating", "Ceramic Coating"],
                  ["vehicle-wrap", "Vehicle Wrap"],
                  ["office-signs", "Office Signs"],
                  ["vinyl-stickers", "Vinyl Stickers"],
                  ["tire-swap", "Tire Swap"],
                  ["commercial-tints", "Commercial Tints"],
                ].map(([slug, name]) => (
                  <li key={slug}>
                    <Link
                      to={`/services/${slug}`}
                      className="text-sm text-[#f6f7fb]/70 hover:text-[#00A8FF] transition flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-[#00A8FF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {name}
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Services */}
            <div className="lg:col-span-2">
              <h5 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#00A8FF] relative inline-block">
                More Services
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00A8FF]/30"></div>
              </h5>

              <ul className="space-y-3">
                {[
                  ["3d-printing", "3D Printing"],
                  ["handyman", "Handyman"],
                  ["car-detailing", "Car Detailing"],
                  ["custom-kits", "Custom Kits"],
                ].map(([slug, name]) => (
                  <li key={slug}>
                    <Link
                      to={`/services/${slug}`}
                      className="text-sm text-[#f6f7fb]/70 hover:text-[#00A8FF] transition flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-[#00A8FF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {name}
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="bg-[#00A8FF]/5 rounded-lg p-3 text-center backdrop-blur-sm border border-[#00A8FF]/10">
                  <div className="text-xl font-bold text-[#00A8FF]">500+</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#f6f7fb]/50">Projects</div>
                </div>
                <div className="bg-[#00A8FF]/5 rounded-lg p-3 text-center backdrop-blur-sm border border-[#00A8FF]/10">
                  <div className="text-xl font-bold text-[#00A8FF]">8yr</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#f6f7fb]/50">Experience</div>
                </div>
              </div>
            </div>

            {/* Company & Newsletter */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#00A8FF] relative inline-block">
                    Company
                    <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00A8FF]/30"></div>
                  </h5>

                  <ul className="space-y-3">
                    {[
                      ["/", "Home"],
                      ["/about", "About"],
                      ["/services", "All Services"],
                      ["/pricing", "Pricing"],
                      ["/gallery", "Gallery"],
                      ["/blog", "Blog"],
                      ["/contact", "Contact"],
                    ].map(([to, label]) => (
                      <li key={to}>
                        <Link
                          to={to}
                          className="text-sm text-[#f6f7fb]/70 hover:text-[#00A8FF] transition flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 bg-[#00A8FF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#00A8FF] relative inline-block">
                    Support
                    <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00A8FF]/30"></div>
                  </h5>

                  <ul className="space-y-3">
                    {[
                      ["/faq", "FAQ"],
                      ["/privacy", "Privacy Policy"],
                      ["/terms", "Terms of Service"],
                      ["/warranty", "Warranty"],
                    ].map(([to, label]) => (
                      <li key={to}>
                        <Link
                          to={to}
                          className="text-sm text-[#f6f7fb]/70 hover:text-[#00A8FF] transition flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 bg-[#00A8FF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8 p-5 bg-gradient-to-r from-[#00A8FF]/10 to-[#007BFF]/10 rounded-xl border border-[#00A8FF]/20 backdrop-blur-sm">
                <h6 className="text-sm font-semibold mb-2 text-[#f6f7fb]">Stay Updated</h6>
                <p className="text-xs text-[#f6f7fb]/60 mb-4">Subscribe for exclusive offers and tips</p>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2.5 bg-[#05070B] border border-[#00A8FF]/20 rounded-lg text-sm text-[#f6f7fb] placeholder-[#f6f7fb]/40 focus:outline-none focus:border-[#00A8FF] transition"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gradient-to-r from-[#00A8FF] to-[#007BFF] text-[#05070B] font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-[#00A8FF]/20 transition whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#f6f7fb]/50 pt-8 gap-4">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span>© {new Date().getFullYear()} DSP Tints. All rights reserved.</span>
              <span className="w-1 h-1 bg-[#00A8FF]/30 rounded-full hidden sm:block"></span>
              <span className="text-[#f6f7fb]/70">Premium Quality Since 2016</span>
            </div>
            
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[#f6f7fb]/70">Open Today</span>
              </span>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#00A8FF] font-medium">Follow Us:</span>
                {['FB', 'IG', 'TW', 'YT'].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-xs text-[#f6f7fb]/50 hover:text-[#00A8FF] transition"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}