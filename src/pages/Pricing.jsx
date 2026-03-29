import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, SERVICE_CATEGORIES } from '../data';
import { PageHero } from '../components/ui';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const fmt = (price, unit) =>
  unit ? `$${Number(price).toFixed(2)}${unit}` : `$${Number(price).toLocaleString()}`;

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const faqItemRef = useRef(null);

  useEffect(() => {
    // Animate FAQ item when it becomes visible
    gsap.from(faqItemRef.current, {
      scrollTrigger: {
        trigger: faqItemRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      },
      x: -30,
      opacity: 0,
      duration: 0.5,
      delay: index * 0.1,
      ease: "power2.out"
    });
  }, [index]);

  return (
    <div 
      ref={faqItemRef}
      className="bg-[#0F1726] border border-[#009fff]/10 rounded-xl overflow-hidden hover:border-[#009fff]/30 transition-all"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-[#0A0F1C] transition-colors"
      >
        <span className="font-semibold text-[14.5px] text-white">{q}</span>
        <span className={`text-[#009fff] text-xl shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          {open ? '−' : '+'}
        </span>
      </button>
      
      {/* Answer with animation */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 pt-3 border-t border-[#009fff]/10">
          <p className="text-[13.5px] text-[#f7f8f9] leading-relaxed font-light">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [cat, setCat] = useState('All');
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const faqHeaderRef = useRef(null);
  
  const cats = SERVICE_CATEGORIES.filter(c => c !== 'All');
  const list = cat === 'All' ? SERVICES : SERVICES.filter(s => s.category === cat);

  // Function to animate cards
  const animateCards = () => {
    gsap.killTweensOf('.pricing-card');
    
    gsap.set('.pricing-card', {
      opacity: 1,
      scale: 1,
      y: 0
    });
    
    gsap.from('.pricing-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "all"
    });
  };

  // Initial animations
  useEffect(() => {
    // Animate FAQ header
    gsap.from(faqHeaderRef.current, {
      scrollTrigger: {
        trigger: faqRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    });

    // Animate CTA
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

    // Initial card animation
    animateCards();

    return () => {
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

  // FAQ data
  const faqs = [
    {
      q: 'Are these prices final?',
      a: 'Our listed prices are starting prices. Final cost depends on vehicle size, condition, and add-ons. We always confirm the exact price before starting any work.'
    },
    {
      q: 'Do you offer package deals?',
      a: 'Yes! Combining services like Window Tint + Ceramic Coating qualifies for multi-service discounts. Ask us when booking.'
    },
    {
      q: 'Is a deposit required?',
      a: 'We typically ask for 30% deposit on larger jobs (over $500) to cover materials. Balance is due on completion.'
    },
    {
      q: "What if I'm not satisfied?",
      a: 'Every service comes with our satisfaction guarantee. If something isn\'t right, we\'ll fix it — no questions asked.'
    },
    {
      q: 'How long does installation take?',
      a: 'Most window tinting jobs take 2-4 hours. PPF and ceramic coating may take 1-3 days depending on vehicle size and coverage.'
    },
    {
      q: 'Do you offer warranties?',
      a: 'Yes! All our services come with comprehensive warranties. Window tint has a lifetime warranty, PPF has 10 years, and ceramic coating has 5-7 years.'
    }
  ];

  return (
    <>
      {/* Sticky category bar */}
      <div className="sticky top-[82px] z-40 bg-[#05070B] border-b border-[#009fff]/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            <button
              onClick={() => setCat('All')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11.5px] font-bold tracking-widest uppercase border transition-all shrink-0 ${
                cat === 'All' 
                  ? 'bg-[#009fff] text-[#05070B] border-[#009fff]' 
                  : 'border-[#009fff]/20 text-[#f7f8f9] hover:border-[#009fff] hover:text-[#009fff]'
              }`}
            >
              All Services
            </button>
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11.5px] font-bold tracking-widest uppercase border transition-all shrink-0 ${
                  cat === c 
                    ? 'bg-[#009fff] text-[#05070B] border-[#009fff]' 
                    : 'border-[#009fff]/20 text-[#f7f8f9] hover:border-[#009fff] hover:text-[#009fff]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service pricing sections */}
      <div ref={pricingRef} className="bg-[#05070B]">
        {list.map((service, si) => (
          <section 
            key={service.id} 
            id={service.slug} 
            className="py-20 border-b border-[#009fff]/5 last:border-0"
          >
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
              {/* Service Header */}
              <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-full bg-[#0F1726] flex items-center justify-center text-3xl border border-[#009fff]/20">
                  <span className="text-[#009fff]">{service.icon}</span>
                </div>
                <div>
                  <h2 className="font-serif text-4xl font-light text-white">{service.name}</h2>
                  <p className="text-sm text-[#f7f8f9] mt-1">{service.tagline}</p>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {service.plans.map((plan, pi) => (
                  <div key={`${service.id}-${pi}`} className="relative">
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#009fff] text-[#05070B] text-[10px] font-bold uppercase tracking-[.18em] px-4 py-1 rounded-full z-10">
                        Most Popular
                      </div>
                    )}
                    
                    <div className={`pricing-card bg-[#0F1726] rounded-xl p-8 h-full flex flex-col ${
                      plan.popular ? 'ring-2 ring-[#009fff] shadow-lg shadow-[#009fff]/20' : 'border border-[#009fff]/10'
                    }`}>
                      {/* Plan Name */}
                      <div className="mb-4">
                        <div className="text-[#009fff] text-xs font-bold uppercase tracking-wider mb-1">
                          {service.name}
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-white">
                          {plan.name}
                        </h3>
                      </div>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="text-5xl font-light text-white mb-1">
                          {fmt(plan.price, plan.unit)}
                        </div>
                        <div className="text-xs text-[#f7f8f9] opacity-70">
                          {plan.unit ? 'per square foot' : 'starting price'}
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 flex-1 mb-8">
                        {plan.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2.5 text-sm text-[#f7f8f9]">
                            <Check size={16} className="text-[#009fff] mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Book Button */}
                      <Link
                        to={`/contact?service=${encodeURIComponent(service.name)}&plan=${encodeURIComponent(plan.name)}`}
                        className={`text-center text-xs font-bold uppercase tracking-[.15em] py-3.5 rounded-lg transition-all ${
                          plan.popular 
                            ? 'bg-[#009fff] text-[#05070B] hover:bg-[#007BFF]' 
                            : 'border border-[#009fff] text-[#009fff] hover:bg-[#009fff] hover:text-[#05070B]'
                        }`}
                      >
                        Book This Plan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}