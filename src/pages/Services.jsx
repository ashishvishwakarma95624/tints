import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../data';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const CATS = ['All', 'Automotive', 'Protection', 'Styling', 'Commercial', 'Specialty', 'General'];

const ACCENTS = {
  'window-tint':          { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'paint-protection-film':{ from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'ceramic-coating':      { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'vehicle-wrap':         { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'car-detailing':        { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'commercial-tints':     { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'office-signs':         { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'tire-swap':            { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  '3d-printing':          { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'handyman':             { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
  'custom-kit':           { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', badge:'bg-[#009fff]/20 text-[#009fff]' },
};

const fmt = (price, unit) =>
  unit ? `$${Number(price).toFixed(2)}${unit}` : `$${Number(price).toLocaleString()}`;

export default function Services() {
  const [cat, setCat] = useState('All');
  const servicesRef = useRef(null);
  const quickListRef = useRef(null);
  const ctaRef = useRef(null);
  const heroRef = useRef(null);
  
  const list = cat === 'All' ? SERVICES : SERVICES.filter(s => s.category === cat);

  // Function to animate service cards
  const animateCards = () => {
    gsap.killTweensOf('.service-card');
    
    gsap.set('.service-card', {
      opacity: 1,
      y: 0
    });
    
    gsap.from('.service-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "all"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.from(heroRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Stats animation
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });

      // Initial card animation
      animateCards();

      // Quick list animation
      gsap.from('.quick-list-item', {
        scrollTrigger: {
          trigger: quickListRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      });

      // CTA animation
      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }, [heroRef, quickListRef, ctaRef]);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Re-animate when category changes
  useEffect(() => {
    const timer = setTimeout(() => {
      animateCards();
    }, 100);

    return () => clearTimeout(timer);
  }, [cat]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="pt-10 pb-5 bg-[#05070B] text-white relative overflow-hidden">
  <div
    className="absolute inset-0 opacity-[.04]"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(0,159,255,.5) 39px,rgba(0,159,255,.5) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(0,159,255,.5) 39px,rgba(0,159,255,.5) 40px)",
    }}
  />

  <div className="w-full px-5 lg:px-12 relative z-10">
    <div className="max-w-10xl">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff] mb-5">
        <span className="w-5 h-px bg-[#009fff]" />11 Professional Services
      </div>

      <h2 className="font-serif font-light text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] mb-6 text-white">
        <em className="text-[#009fff] not-italic">Everything Your Vehicle & Space Deserves</em>
      </h2>

      <p className="text-[#f7f8f9] text-[15px] leading-relaxed font-light">
        From window tint to full vehicle wraps, ceramic coatings to commercial signs — professional-grade results under one roof.
      </p>
    </div>
  </div>
</section>

      {/* STICKY FILTER */}
      <div className="sticky top-[66px] z-40 bg-[#05070B] border-b border-[#009fff]/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {CATS.map(c => (
              <button 
                key={c} 
                onClick={() => setCat(c)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[11.5px] font-bold tracking-[.12em] uppercase border transition-all shrink-0 ${
                  cat === c 
                    ? 'bg-[#009fff] text-[#05070B] border-[#009fff]' 
                    : 'border-[#009fff]/20 text-white hover:border-[#009fff] hover:text-[#009fff]'
                }`}
              >
                {c}
              </button>
            ))}
            <Link 
              to="/contact" 
              className="ml-auto shrink-0 bg-[#009fff] text-[#05070B] py-2 px-5 text-[11px] font-bold uppercase rounded-full hover:bg-[#007BFF] transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* GRID */}
      <section className="py-16 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="text-sm text-[#f7f8f9] mb-8">
            Showing <strong className="text-white">{list.length}</strong> service{list.length !== 1 ? 's' : ''}
            {cat !== 'All' && <> in <strong className="text-white">{cat}</strong></>}
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {list.map(s => {
              const acc = ACCENTS[s.slug] || ACCENTS['window-tint'];
              return (
                <div key={s.id}
                  className="service-card group bg-[#0F1726] border border-[#009fff]/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,159,255,0.3)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">

                  {/* Dark header */}
                  <div className={`bg-gradient-to-br ${acc.from} ${acc.to} px-7 pt-7 pb-6 relative overflow-hidden`}>
                    <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full border border-white/[.05]" />
                    <div className="absolute -right-2 -top-2 w-20 h-20 rounded-full border border-white/[.03]" />
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-[#0F1726] border border-[#009fff]/20 flex items-center justify-center text-3xl">
                        <span className="text-[#009fff]">{s.icon}</span>
                      </div>
                      <span className={`text-[10px] font-bold tracking-[.15em] uppercase px-3 py-1.5 rounded-full ${acc.badge}`}>
                        {s.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-white mb-1 relative z-10">{s.name}</h3>
                    <p className="text-[12px] text-[#f7f8f9] italic relative z-10">{s.tagline}</p>
                  </div>

                  {/* Body */}
                  <div className="px-7 py-5 flex-1 flex flex-col bg-[#0F1726]">
                    <p className="text-[13.5px] text-[#f7f8f9] leading-relaxed font-light mb-5 flex-1">{s.shortDesc}</p>

                    <ul className="space-y-1.5 mb-5">
                      {s.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12.5px] text-[#f7f8f9]">
                          <Check size={12} className="text-[#009fff] mt-0.5 shrink-0" />{b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between py-3.5 border-t border-[#009fff]/10 mb-5">
                      <div>
                        <div className="text-[10px] text-[#f7f8f9] uppercase tracking-widest font-semibold mb-0.5">Starting from</div>
                        <div className="font-serif text-2xl font-semibold text-white">{fmt(s.plans[0]?.price, s.plans[0]?.unit)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#f7f8f9] uppercase tracking-widest font-semibold mb-0.5">{s.plans.length} Plans</div>
                        <div className="text-[12px] text-[#f7f8f9]">
                          up to {fmt(s.plans[s.plans.length - 1]?.price, s.plans[s.plans.length - 1]?.unit)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <Link to={`/services/${s.slug}`}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-[#009fff] text-[#009fff] text-[11px] font-bold uppercase tracking-[.12em] py-2.5 rounded-lg hover:bg-[#009fff] hover:text-[#05070B] transition-all">
                        View Details <ArrowRight size={11} />
                      </Link>
                      <Link to={`/contact?service=${encodeURIComponent(s.name)}`}
                        className="flex-1 flex items-center justify-center bg-[#009fff] text-[#05070B] text-[11px] font-bold uppercase tracking-[.12em] py-2.5 rounded-lg hover:bg-[#007BFF] transition-all">
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
        <section ref={quickListRef} className="py-16 bg-[#0A0F1C] border-t border-[#009fff]/10">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="w-8 h-px bg-[#009fff]" />
                <span className="text-xs font-bold tracking-[.2em] uppercase text-[#009fff]">QUICK OVERVIEW</span>
                <span className="w-8 h-px bg-[#009fff]" />
              </div>
              <h2 className="font-serif font-light text-4xl text-white">
                All Services <em className="text-[#009fff] not-italic">At a Glance</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {SERVICES.map(s => (
                <Link 
                  key={s.id} 
                  to={`/services/${s.slug}`}
                  className="quick-list-item flex items-center gap-4 p-4 bg-[#0F1726] border border-[#009fff]/10 rounded-xl hover:border-[#009fff] hover:shadow-lg transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0F1726] border border-[#009fff]/20 flex items-center justify-center text-xl shrink-0 group-hover:border-[#009fff] transition-colors">
                    <span className="text-[#009fff]">{s.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13.5px] text-white group-hover:text-[#009fff] transition-colors">{s.name}</div>
                    <div className="text-[11.5px] text-[#f7f8f9] font-light truncate">{s.tagline}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-serif text-[15px] font-semibold text-white">{fmt(s.plans[0]?.price, s.plans[0]?.unit)}</div>
                    <div className="text-[10px] text-[#f7f8f9] uppercase tracking-wide">from</div>
                  </div>
                  <ArrowRight size={14} className="text-[#f7f8f9] group-hover:text-[#009fff] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section ref={ctaRef} className="py-20 bg-[#05070B] text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="font-serif font-light text-5xl text-white mb-4">
            Not Sure What You <em className="text-[#009fff] not-italic">Need?</em>
          </h2>
          <p className="text-[#f7f8f9] font-light text-[15px] mb-8">
            Describe your vehicle or project and our team will recommend the best solution — free of charge.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link 
              to="/contact" 
              className="bg-[#009fff] text-[#05070B] text-xs font-bold uppercase tracking-[.15em] px-8 py-3.5 rounded-lg hover:bg-[#007BFF] transition-all"
            >
              Get Free Advice
            </Link>
            <a 
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 border border-[#009fff]/20 text-white text-xs font-bold uppercase tracking-[.15em] px-8 py-3.5 rounded-lg hover:border-[#009fff] hover:text-[#009fff] transition-all"
            >
              📞 Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}