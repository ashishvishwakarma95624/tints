import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data';

const CATS = ['All', 'Automotive', 'Protection', 'Styling', 'Commercial', 'Specialty', 'General'];

const ACCENTS = {
  'window-tint':          { from:'from-sky-950',    to:'to-sky-800',    badge:'bg-sky-900/60 text-sky-200' },
  'paint-protection-film':{ from:'from-slate-950',  to:'to-slate-800',  badge:'bg-slate-700/60 text-slate-200' },
  'ceramic-coating':      { from:'from-amber-950',  to:'to-amber-800',  badge:'bg-amber-900/60 text-amber-200' },
  'vehicle-wrap':         { from:'from-purple-950', to:'to-purple-800', badge:'bg-purple-900/60 text-purple-200' },
  'car-detailing':        { from:'from-emerald-950',to:'to-emerald-800',badge:'bg-emerald-900/60 text-emerald-200' },
  'commercial-tints':     { from:'from-teal-950',   to:'to-teal-800',   badge:'bg-teal-900/60 text-teal-200' },
  'office-signs':         { from:'from-orange-950', to:'to-orange-800', badge:'bg-orange-900/60 text-orange-200' },
  'tire-swap':            { from:'from-zinc-900',   to:'to-zinc-700',   badge:'bg-zinc-700/60 text-zinc-200' },
  '3d-printing':          { from:'from-cyan-950',   to:'to-cyan-800',   badge:'bg-cyan-900/60 text-cyan-200' },
  'handyman':             { from:'from-red-950',    to:'to-red-800',    badge:'bg-red-900/60 text-red-200' },
  'custom-kit':           { from:'from-indigo-950', to:'to-indigo-800', badge:'bg-indigo-900/60 text-indigo-200' },
};

const fmt = (price, unit) =>
  unit ? `$${Number(price).toFixed(2)}${unit}` : `$${Number(price).toLocaleString()}`;

export default function Services() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? SERVICES : SERVICES.filter(s => s.category === cat);

  return (
    <>
      {/* HERO */}
      <section className="pt-28 pb-20 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.04]" style={{
          backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(200,169,110,.5) 39px,rgba(200,169,110,.5) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(200,169,110,.5) 39px,rgba(200,169,110,.5) 40px)'
        }} />
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span><span className="text-gold">Services</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-gold mb-5">
              <span className="w-5 h-px bg-gold" />11 Professional Services
            </div>
            <h1 className="font-serif font-light text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] mb-6">
              Everything Your<br /><em className="text-gold not-italic">Vehicle & Space</em><br />Deserves
            </h1>
            <p className="text-white/45 text-[15px] leading-relaxed font-light max-w-lg">
              From window tint to full vehicle wraps, ceramic coatings to commercial signs — professional-grade results under one roof.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/[.07] max-w-2xl">
            {[['11','Services'],['500+','Projects'],['8yr','Experience'],['100%','Guaranteed']].map(([n,l])=>(
              <div key={l}>
                <div className="font-serif text-3xl font-semibold text-white">{n}</div>
                <div className="text-[10px] text-white/30 tracking-widest uppercase mt-1 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY FILTER */}
      <div className="sticky top-[66px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[11.5px] font-bold tracking-[.12em] uppercase border transition-all shrink-0 ${
                  cat === c ? 'bg-ink text-white border-ink' : 'border-gray-200 text-gray-500 hover:border-gold hover:text-gold'
                }`}>{c}
              </button>
            ))}
            <Link to="/contact" className="ml-auto shrink-0 btn-gold py-2 px-5 text-[11px]">Get a Quote</Link>
          </div>
        </div>
      </div>

      {/* GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="text-sm text-gray-400 mb-8">
            Showing <strong className="text-ink">{list.length}</strong> service{list.length !== 1 ? 's' : ''}
            {cat !== 'All' && <> in <strong className="text-ink">{cat}</strong></>}
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {list.map(s => {
              const acc = ACCENTS[s.slug] || ACCENTS['window-tint'];
              return (
                <div key={s.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">

                  {/* Dark header */}
                  <div className={`bg-gradient-to-br ${acc.from} ${acc.to} px-7 pt-7 pb-6 relative overflow-hidden`}>
                    <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full border border-white/[.05]" />
                    <div className="absolute -right-2 -top-2 w-20 h-20 rounded-full border border-white/[.03]" />
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-3xl">
                        {s.icon}
                      </div>
                      <span className={`text-[10px] font-bold tracking-[.15em] uppercase px-3 py-1.5 rounded-full ${acc.badge}`}>
                        {s.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-white mb-1 relative z-10">{s.name}</h3>
                    <p className="text-[12px] text-white/40 italic relative z-10">{s.tagline}</p>
                  </div>

                  {/* Body */}
                  <div className="px-7 py-5 flex-1 flex flex-col">
                    <p className="text-[13.5px] text-gray-500 leading-relaxed font-light mb-5 flex-1">{s.shortDesc}</p>

                    <ul className="space-y-1.5 mb-5">
                      {s.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12.5px] text-gray-600">
                          <Check size={12} className="text-gold mt-0.5 shrink-0" />{b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between py-3.5 border-t border-gray-100 mb-5">
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Starting from</div>
                        <div className="font-serif text-2xl font-semibold">{fmt(s.plans[0]?.price, s.plans[0]?.unit)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">{s.plans.length} Plans</div>
                        <div className="text-[12px] text-gray-500">
                          up to {fmt(s.plans[s.plans.length - 1]?.price, s.plans[s.plans.length - 1]?.unit)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <Link to={`/services/${s.slug}`}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 text-[11px] font-bold uppercase tracking-[.12em] py-2.5 rounded-lg hover:border-ink hover:bg-ink hover:text-white transition-all">
                        View Details <ArrowRight size={11} />
                      </Link>
                      <Link to={`/contact?service=${encodeURIComponent(s.name)}`}
                        className="flex-1 flex items-center justify-center bg-gold text-ink text-[11px] font-bold uppercase tracking-[.12em] py-2.5 rounded-lg hover:bg-gold-dark transition-all">
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK LIST — all services at a glance */}
      {cat === 'All' && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-serif font-light text-4xl">All Services <em className="text-gold not-italic">At a Glance</em></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {SERVICES.map(s => (
                <Link key={s.id} to={`/services/${s.slug}`}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gold hover:shadow-md transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 group-hover:bg-gold/15 flex items-center justify-center text-xl shrink-0 transition-colors">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13.5px] group-hover:text-gold transition-colors">{s.name}</div>
                    <div className="text-[11.5px] text-gray-400 font-light truncate">{s.tagline}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-serif text-[15px] font-semibold">{fmt(s.plans[0]?.price, s.plans[0]?.unit)}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">from</div>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gold transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-ink text-white text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="font-serif font-light text-5xl text-white mb-4">
            Not Sure What You <em className="text-gold not-italic">Need?</em>
          </h2>
          <p className="text-white/40 font-light text-[15px] mb-8">
            Describe your vehicle or project and our team will recommend the best solution — free of charge.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="btn-gold">Get Free Advice</Link>
            <a href="tel:5551234567"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-[12px] font-bold uppercase tracking-[.15em] px-8 py-3.5 rounded hover:border-gold hover:text-gold transition-all">
              📞 Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
