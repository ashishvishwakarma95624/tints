import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../data';
import { Stars } from '../components/ui';
import mainimg from '../assets/images/main-img.png';

export default function Home() {
  const featured = SERVICES.filter(s => s.featured);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-66px)] grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 lg:px-16 py-20 fade-up">
          <div className="section-tag mb-6">Premium Auto &amp; Commercial Services</div>
          <h1 className="font-serif font-light text-[clamp(3rem,5.5vw,5.5rem)] leading-[1.07] mb-7">
            Precision<br />Crafted <em className="text-gold not-italic">For Every<br />Surface</em>
          </h1>
          <p className="text-[15px] text-gray-500 leading-relaxed font-light max-w-md mb-10">
            From window tint to full vehicle wraps, ceramic coatings to commercial signage — flawless results with obsessive attention to detail.
          </p>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link to="/services" className="btn-primary">Explore Services <ArrowRight size={13} /></Link>
            <Link to="/contact"  className="btn-outline">Get a Free Quote</Link>
          </div>
          <div className="grid grid-cols-4 gap-6 pt-8 border-t border-gray-100">
            {[['500+','Projects'],['8yr','In Business'],['11','Services'],['100%','Satisfaction']].map(([n,l]) => (
              <div key={l}>
                <div className="font-serif text-[2.2rem] font-semibold leading-none">{n}</div>
                <div className="text-[10.5px] text-gray-400 tracking-[.16em] uppercase mt-2 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex bg-gray-100 items-center justify-center p-8">
          <div className="w-full h-full rounded-2xl flex flex-col items-start justify-end p-10 shadow-2xl overflow-hidden relative" style={{ backgroundImage: `url(${mainimg})`, backgroundSize: "cover",backgroundPosition: "center"}}>
            <div className="absolute inset-0 opacity-[.07]"/>
            <div className="relative z-10 w-full">
              <Link to="/contact" className="btn-gold inline-flex">Book a Service <ArrowRight size={13} /></Link>
            </div>
            <div className="absolute top-7 right-7 bg-white rounded-xl px-4 py-3 z-10 shadow-lg">
              <div className="text-[9.5px] text-gray-400 uppercase tracking-widest">Est.</div>
              <div className="font-serif text-xl font-semibold">2016</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED SERVICES ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="section-tag">What We Do</div>
              <h2 className="font-serif font-light text-5xl">All Services <em className="text-gold not-italic">Under One Roof</em></h2>
            </div>
            <Link to="/services" className="hidden sm:block btn-outline py-2.5">View All</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 border border-gray-200 divide-x divide-y divide-gray-200">
            {featured.slice(0, 7).map(s => (
              <Link key={s.id} to={`/services/${s.slug}`}
                className="group p-7 bg-white hover:bg-gray-50 transition-colors">
                <div className="w-11 h-11 rounded-full bg-gray-100 group-hover:bg-gold/20 flex items-center justify-center text-xl mb-5 transition-colors">
                  {s.icon}
                </div>
                <h4 className="font-serif text-xl font-semibold mb-1.5">{s.name}</h4>
                <p className="text-[12.5px] text-gray-400 leading-relaxed font-light mb-4 line-clamp-2">{s.shortDesc}</p>
                <span className="text-[11px] font-bold tracking-widest uppercase text-gold">
                  From ${s.plans[0]?.price.toLocaleString()} →
                </span>
              </Link>
            ))}
            <div className="p-7 bg-ink flex flex-col justify-between min-h-[180px]">
              <p className="font-serif text-lg text-white italic leading-snug">"Every detail matters."</p>
              <Link to="/contact" className="btn-gold inline-flex self-start text-[10px] py-2">Book Now →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="section-tag">Why Choose Us</div>
            <h2 className="font-serif font-light text-5xl mb-6">Built On <em className="text-gold not-italic">Excellence</em></h2>
            <p className="text-white/45 leading-relaxed font-light mb-8 text-[15px] max-w-md">
              We never cut corners. Every project receives meticulous care and premium materials — from a single sticker to a full commercial installation.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 border border-white/20 text-[12px] font-bold uppercase tracking-[.15em] px-6 py-3 rounded hover:border-gold hover:text-gold transition-all">
              About Our Team <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {[['01','Premium Materials Only','We source only from 3M, XPEL, Llumar and other industry leaders.'],
              ['02','Certified Technicians','Every member holds professional certifications with years of hands-on experience.'],
              ['03','Warranty on All Work','Every service is backed by our satisfaction guarantee and manufacturer warranties.'],
              ['04','Fast Turnaround','Most jobs completed same day or within 24 hours without sacrificing quality.'],
            ].map(([n,t,d]) => (
              <div key={n} className="flex gap-5 p-5 border border-white/[.07] rounded-lg hover:border-gold/30 transition-colors group">
                <div className="font-serif text-3xl font-light text-gold group-hover:text-gold/40 transition-colors leading-none w-10 shrink-0 pt-0.5">{n}</div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-[14.5px]">{t}</h4>
                  <p className="text-white/35 text-[13px] font-light leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-gold">Client Reviews</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-serif font-light text-5xl">What Our <em className="text-gold not-italic">Clients Say</em></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-7 hover:border-gold/40 hover:shadow-lg transition-all">
                <Stars rating={t.rating} />
                <p className="font-serif text-[1.05rem] italic text-gray-700 leading-relaxed my-4">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-gold text-ink flex items-center justify-center font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-[13px]">{t.name}</div>
                    <div className="text-[12px] text-gray-400">{t.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-gold">How It Works</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-serif font-light text-5xl">Simple Process, <em className="text-gold not-italic">Exceptional Results</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="absolute top-9 left-[12%] right-[12%] h-px bg-gray-200 hidden lg:block" />
            {[['1','Request a Quote','Fill out our short form — honest pricing within hours.'],
              ['2','Consultation','We review your vehicle or space and recommend the best approach.'],
              ['3','Expert Install','Certified technicians perform the work in our clean facility.'],
              ['4','Delivery & Care','We walk you through aftercare so your investment lasts years.'],
            ].map(([n,t,d]) => (
              <div key={n} className="text-center relative z-10">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mx-auto mb-6 font-serif text-2xl font-semibold hover:bg-gold hover:border-gold hover:text-white transition-all duration-300 cursor-default">
                  {n}
                </div>
                <h4 className="font-serif text-xl font-semibold mb-2.5">{t}</h4>
                <p className="text-[13px] text-gray-400 font-light leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gold text-center">
        <div className="max-w-2xl mx-auto px-5">
          <blockquote className="font-serif font-light text-[clamp(1.7rem,3.5vw,2.8rem)] italic leading-tight mb-8">
            "We protect what you've invested in — and make it look better than the day you bought it."
          </blockquote>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-ink text-white text-[12px] font-bold uppercase tracking-[.15em] px-8 py-4 rounded hover:bg-white hover:text-ink transition-all duration-200">
            Request a Free Quote <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </>
  );
}
