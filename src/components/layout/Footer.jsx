import { Link } from 'react-router-dom';

const TICKER = ['Window Tint','PPF','Ceramic Coating','Vehicle Wrap','Office Signs','Vinyl Stickers','Tire Swap','Commercial Tints','3D Printing','Handyman','Car Detailing','Custom Kits'];

export default function Footer() {
  return (
    <>
      {/* Marquee ticker */}
      <div className="bg-ink py-3 marquee-wrap overflow-hidden">
        <div className="marquee-track whitespace-nowrap flex">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-7 text-[11px] font-semibold tracking-[.18em] uppercase text-white/40">
              {item}<span className="text-gold">·</span>
            </span>
          ))}
        </div>
      </div>

      <footer className="bg-ink text-white/40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/[.06]">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="font-serif text-xl font-semibold text-white">ClearEdge</span>
                <span className="text-[9px] font-bold tracking-[.2em] uppercase text-gold border border-gold/60 px-1 py-0.5 rounded-sm">Pro</span>
              </div>
              <p className="text-[12.5px] leading-relaxed font-light max-w-xs mb-5">Premium auto, commercial and residential surface services. Precision in every detail since 2016.</p>
              <a href="tel:5551234567" className="text-[12.5px] hover:text-gold transition-colors block">(555) 123-4567</a>
              <a href="mailto:gurucreations00@gmail.com" className="text-[12.5px] hover:text-gold transition-colors block mt-1">gurucreations00@gmail.com</a>
            </div>

            {/* Services */}
            <div>
              <h5 className="text-[10px] font-bold tracking-[.2em] uppercase text-white mb-4">Automotive</h5>
              <ul className="space-y-2.5">
                {[['window-tint','Window Tint'],['paint-protection-film','Paint Protection'],['ceramic-coating','Ceramic Coating'],['vehicle-wrap','Vehicle Wrap'],['car-detailing','Car Detailing']].map(([slug,name]) => (
                  <li key={slug}><Link to={`/services/${slug}`} className="text-[12.5px] font-light hover:text-gold transition-colors">{name}</Link></li>
                ))}
              </ul>
            </div>

            {/* More services */}
            <div>
              <h5 className="text-[10px] font-bold tracking-[.2em] uppercase text-white mb-4">More Services</h5>
              <ul className="space-y-2.5">
                {[['commercial-tints','Comm. Tints'],['office-signs','Office Signs'],['tire-swap','Tire Swap'],['3d-printing','3D Printing'],['handyman','Handyman'],['custom-kit','Custom Kits']].map(([slug,name]) => (
                  <li key={slug}><Link to={`/services/${slug}`} className="text-[12.5px] font-light hover:text-gold transition-colors">{name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="text-[10px] font-bold tracking-[.2em] uppercase text-white mb-4">Company</h5>
              <ul className="space-y-2.5">
                {[['/','/','Home'],['/about','About'],['/pricing','Pricing'],['/gallery','Gallery'],['/blog','Blog'],['/contact','Contact']].map(([to,,label]) => (
                  <li key={to}><Link to={to} className="text-[12.5px] font-light hover:text-gold transition-colors">{label || to.replace('/','')}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <span>© {new Date().getFullYear()} ClearEdge Pro. All rights reserved.</span>
            <span>Windsor, ON, Canada · Essex, ON, Canada</span>
          </div>
        </div>
      </footer>
    </>
  );
}
