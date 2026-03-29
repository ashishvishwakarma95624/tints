import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Phone, Clock, Shield, Award, Zap, FileText, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../data';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Per-service accent colours - updated to use your color scheme
const ACCENTS = {
  'window-tint':          { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'paint-protection-film':{ from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'ceramic-coating':      { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'vehicle-wrap':         { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'car-detailing':        { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'commercial-tints':     { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'office-signs':         { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'tire-swap':            { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  '3d-printing':          { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'handyman':             { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
  'custom-kit':           { from:'from-[#009fff]/20', to:'to-[#007BFF]/20', light:'bg-[#009fff]/10', border:'border-[#009fff]/20', text:'text-[#009fff]', dot:'bg-[#009fff]' },
};

// Service-specific FAQs
const FAQS = {
  'window-tint': [
    ['How long does window tinting take?','Most cars are done in 1.5–3 hours depending on the number of windows and the film type. We offer same-day service on most standard vehicles.'],
    ['How soon can I roll the windows down?','We recommend keeping windows up for at least 3–5 days to allow the adhesive to fully cure. Rolling them down too soon can cause bubbles or peeling.'],
    ['Will tint affect my phone or GPS signal?','Carbon and ceramic films have zero signal interference. Only older metalised films can affect signals — we don\'t use those.'],
    ['Is window tinting legal?','Laws vary by state. We know local VLT regulations and will advise you on legal limits for your vehicle before installation.'],
  ],
  'paint-protection-film': [
    ['Will PPF change the look of my paint?','No — high-quality PPF like XPEL Ultimate is optically clear. Some people actually say their paint looks better because of the gloss enhancement.'],
    ['How long does PPF last?','A professionally applied PPF using premium film will last 7–10 years. Our XPEL installations come with a 10-year manufacturer warranty.'],
    ['Can PPF be removed?','Yes, PPF can be cleanly removed at any time without damaging the paint underneath — that\'s one of its biggest advantages over paint.'],
    ['Does PPF self-heal?','Yes. XPEL Ultimate Plus has self-healing properties. Light swirl marks and fine scratches disappear with heat (sunlight or warm water).'],
  ],
  'ceramic-coating': [
    ['How long does ceramic coating last?','Depending on the grade, professionally applied ceramic coatings last 2–7 years. Our Elite Coat (graphene) carries a 7-year warranty.'],
    ['Does my car need paint correction first?','Yes — we always do a minimum 1-stage polish before any coating. Ceramic locks in what\'s underneath, so the paint must be clean and swirl-free first.'],
    ['Can I take my car through a car wash?','We recommend touchless washes only. Brush-style automated washes can introduce swirl marks and reduce the coating\'s longevity.'],
    ['Is ceramic coating worth the cost?','For anyone who cares about their car\'s appearance and resale value, yes. It dramatically reduces cleaning time and preserves paint for years.'],
  ],
  'vehicle-wrap': [
    ['How long does a vehicle wrap last?','A professionally installed wrap using Avery Dennison or 3M film lasts 3–7 years outdoors depending on exposure. Garaged vehicles last longer.'],
    ['Will the wrap damage my paint?','No — quality vinyl wrap actually protects your factory paint. When removed, your original paint should be in the same condition as when it was wrapped.'],
    ['Can any colour or design be done?','Nearly anything is possible. We offer thousands of stock colours and finishes, plus fully custom printed wraps for logos and unique designs.'],
    ['How do I wash a wrapped vehicle?','Hand wash or touchless only. Avoid high-pressure jets on edges and seams. We provide full care instructions on delivery.'],
  ],
  'car-detailing': [
    ['What\'s included in a full detail?','Our Full Detail includes exterior hand wash, clay bar decontamination, machine polish, interior deep clean, steam cleaning, and wax protection.'],
    ['How long does a full detail take?','A Maintenance Detail takes 2–3 hours. A Full Detail takes 5–6 hours. The Showroom Package is an 8+ hour process.'],
    ['How often should I get my car detailed?','We recommend a maintenance detail every 4–6 weeks and a full detail every 3–4 months to keep your paint and interior in top condition.'],
    ['Can you remove pet hair and odours?','Yes — our steam clean and carpet extraction process removes pet hair, embedded dirt, and odours effectively.'],
  ],
  'commercial-tints': [
    ['How long does commercial window film installation take?','A standard office or retail installation is typically completed in one day. Larger buildings may require 2–3 days. We work around your schedule.'],
    ['Will the film affect natural light too much?','Solar films are available in many tint levels. We can reduce heat and UV while maintaining excellent natural light — even with lighter films.'],
    ['What\'s the difference between solar and security film?','Solar film primarily controls heat and UV. Security film is a thicker, multi-ply product that holds glass together on impact — ideal for ground-floor retail.'],
    ['Do you offer after-hours installation?','Yes — we can work evenings and weekends to avoid disrupting your business operations.'],
  ],
  'office-signs': [
    ['Do you handle the design as well?','Yes — our Business and Full Branding packages include design. We work with your brand guidelines or create something new from scratch.'],
    ['How long does production take?','Simple vinyl cuts are typically ready in 24–48 hours. Printed graphics take 3–5 business days. Rush production is available.'],
    ['How durable are outdoor signs?','We use UV-resistant inks and outdoor-rated vinyl. Exterior signage carries a minimum 2-year warranty against fading and peeling.'],
    ['Can you match our brand colours exactly?','Yes — we use colour-matched printing to match Pantone, CMYK, or hex codes for brand-accurate results.'],
  ],
  'tire-swap': [
    ['Do I need an appointment?','Walk-ins are welcome but appointments get priority. Booking takes 5 minutes via our contact form or by calling us.'],
    ['Do you supply tires as well?','Yes — our Full Service package includes tyre sourcing. We work with multiple suppliers to get you the right rubber at a competitive price.'],
    ['What\'s included in TPMS service?','We reset all four TPMS sensors after installation. If a sensor needs replacing, we\'ll advise you before proceeding.'],
    ['Do you work on trucks and SUVs?','Yes — we handle all vehicle types including passenger cars, trucks, SUVs, vans, and sports cars.'],
  ],
  '3d-printing': [
    ['What file formats do you accept?','We work with STL, OBJ, STEP, and IGES files. If you only have a sketch or reference photo, we can model the part for you.'],
    ['What materials can you print in?','We print in PLA, PETG, ABS, ASA, TPU, and standard resin. We\'ll recommend the best material for your part\'s function and environment.'],
    ['How accurate are the prints?','FDM prints are accurate to ±0.2mm. Resin prints achieve ±0.1mm. For critical-fit parts we do a test print first.'],
    ['Can you paint or finish the part?','Yes — we offer sanding, gap-filling, and spray paint finishing. Parts can be delivered paint-ready or fully finished.'],
  ],
  'handyman': [
    ['What types of jobs do you take on?','Automotive interior work, accessory installation, minor bodywork, residential property repairs, furniture assembly, and more.'],
    ['Are your technicians insured?','Yes — all our handymen are insured and experienced. We carry public liability insurance on every job.'],
    ['Do you charge if the job takes less time?','We only charge for time worked, not the full block. So if a half-day job is done in 2 hours, you pay for 2 hours only.'],
    ['Can I give you a list of tasks?','Absolutely — a full day with one or two technicians is ideal for tackling a punch-list of smaller jobs in one go.'],
  ],
  'custom-kit': [
    ['Do you install pre-painted kits?','Yes — if your kit arrives pre-painted, we install it without touching the finish. We can also coordinate paint-matching with our bodywork contacts.'],
    ['What makes and models do you cover?','We\'ve fitted kits on everything from Civics and Mustangs to Porsches and exotic cars. If you have the kit, we can fit it.'],
    ['Do you help source kits?','We can point you to reputable suppliers for your vehicle. We don\'t supply kits directly but have strong relationships with quality manufacturers.'],
    ['What if the fitment isn\'t perfect out of the box?','This is common with aftermarket kits. We do all necessary trimming, shaving, and adjustment to achieve a factory-quality fit.'],
  ],
};

const DEFAULT_FAQS = [
  ['Do you offer a warranty?','Yes — every service comes with our satisfaction guarantee plus applicable manufacturer warranties.'],
  ['How do I book?','Use the contact form, call us directly, or visit our shop. We\'ll get back to you within a few hours.'],
  ['Do you offer free estimates?','Always. We will never charge you to assess your vehicle or project.'],
];

const fmt = (price, unit) =>
  unit ? `$${Number(price).toFixed(2)}${unit}` : `$${Number(price).toLocaleString()}`;

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const faqRef = useRef(null);

  useEffect(() => {
    gsap.from(faqRef.current, {
      scrollTrigger: {
        trigger: faqRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      },
      y: 20,
      opacity: 0,
      duration: 0.4,
      delay: index * 0.1,
      ease: "power2.out"
    });
  }, [index]);

  return (
    <div 
      ref={faqRef} 
      className="bg-[#0F1726] border border-[#009fff]/10 rounded-xl overflow-hidden hover:border-[#009fff]/30 transition-all"
    >
      <button 
        onClick={() => setOpen(v => !v)}
        className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-[#0A0F1C] transition-colors"
      >
        <span className="font-semibold text-[15px] text-white">{q}</span>
        <span className={`text-[#009fff] text-2xl shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          {open ? '−' : '+'}
        </span>
      </button>
      
      {/* Answer section */}
      {open && (
        <div className="px-6 pb-5 pt-3 border-t border-[#009fff]/10">
          <p className="text-[14px] text-[#f7f8f9] leading-relaxed font-light">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find(s => s.slug === slug);
  const acc = service ? (ACCENTS[slug] || ACCENTS['window-tint']) : null;
  const faqs = FAQS[slug] || DEFAULT_FAQS;
  const related = service
    ? SERVICES.filter(s => s.slug !== slug).slice(0, 6)
    : [];
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const plansRef = useRef(null);
  const relatedRef = useRef(null);
  const ctaRef = useRef(null);
  const faqHeaderRef = useRef(null);

  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.2
      });

      // Content sections animation
      gsap.from('.content-section', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
      });

      // FAQ header animation
      gsap.from(faqHeaderRef.current, {
        scrollTrigger: {
          trigger: faqHeaderRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      // Benefits animation
      gsap.from('.benefit-item', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });

      // Process steps animation
      gsap.from('.process-step', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play none none none"
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });

      // Pricing plans animation
      gsap.from('.plan-card', {
        scrollTrigger: {
          trigger: plansRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)"
      });

      // Related services animation
      gsap.from('.related-item', {
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
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
    }, [heroRef, contentRef, plansRef, relatedRef, ctaRef, faqHeaderRef]);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [service]);

  if (!service) return (
    <div className="pt-32 min-h-[60vh] bg-[#05070B] flex items-center justify-center">
      <div className="text-center py-20 px-5">
        <div className="text-8xl mb-6 opacity-30">🔍</div>
        <h2 className="font-serif text-3xl text-white mb-3">Service Not Found</h2>
        <p className="text-[#f7f8f9] mb-8">We couldn't find that service. Browse all our services below.</p>
        <Link to="/services" className="inline-flex items-center gap-2 bg-[#009fff] text-[#05070B] px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#007BFF] transition-all">
          View All Services <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className={`pt-28 pb-0 bg-gradient-to-br ${acc.from} ${acc.to} text-white relative overflow-hidden bg-[#0A0F1C]`}>
        {/* Decorative rings */}
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full border border-[#009fff]/10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full border border-[#009fff]/10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute right-0 top-0 w-[200px] h-[200px] rounded-full border border-[#009fff]/10 translate-x-1/3 -translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#f7f8f9] mb-10">
            <Link to="/" className="hover:text-[#009fff] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[#009fff] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_340px] gap-12 pb-16">
            {/* Left */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#0F1726] border border-[#009fff]/20 flex items-center justify-center text-4xl">
                  <span className="text-[#009fff]">{service.icon}</span>
                </div>
                <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff] border border-[#009fff]/30 px-3 py-1.5 rounded-full">
                  {service.category}
                </span>
              </div>
              <h1 className="font-serif font-light text-[clamp(2.8rem,5vw,4.8rem)] leading-tight mb-4 text-white">{service.name}</h1>
              <p className="text-[1.1rem] text-[#f7f8f9] italic font-light mb-6">{service.tagline}</p>
              <p className="text-[15px] text-[#f7f8f9] leading-relaxed font-light max-w-xl mb-8">{service.shortDesc}</p>
              <div className="flex flex-wrap gap-3">
                <Link to={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="inline-flex items-center gap-2 bg-[#009fff] text-[#05070B] px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#007BFF] transition-all">
                  Get a Free Quote <ArrowRight size={13} />
                </Link>
                <a href="tel:+15551234567"
                  className="inline-flex items-center gap-2 border border-[#009fff]/30 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg hover:border-[#009fff] hover:text-[#009fff] transition-all">
                  <Phone size={13} /> Call Us
                </a>
              </div>
            </div>

            {/* Right — quick stats */}
            <div className="flex flex-col gap-3 justify-end pb-8">
              {[
                ['Starting Price', fmt(service.plans[0]?.price, service.plans[0]?.unit)],
                ['Pricing Plans', `${service.plans.length} options`],
                ['Process Steps', `${service.process.length} steps`],
                ['Key Benefits', `${service.benefits.length} included`],
              ].map(([l,v]) => (
                <div key={l} className="flex items-center justify-between bg-[#0F1726] border border-[#009fff]/10 rounded-xl px-5 py-3.5">
                  <span className="text-[11.5px] text-[#f7f8f9] uppercase tracking-widest font-semibold">{l}</span>
                  <span className="font-serif text-xl font-semibold text-white">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="h-8 bg-[#05070B]" style={{ clipPath:'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <section ref={contentRef} className="py-20 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-16">

            {/* Left column */}
            <div>

              {/* About */}
              <div className="content-section mb-16">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#009fff] mb-4">
                  <span className="w-5 h-px bg-[#009fff]" />About This Service
                </div>
                <h2 className="font-serif font-light text-4xl text-white mb-5">
                  What Is <em className="text-[#009fff] not-italic">{service.name}?</em>
                </h2>
                <p className="text-[15px] text-[#f7f8f9] leading-relaxed font-light">{service.fullDesc}</p>
              </div>

              {/* Benefits */}
              <div className="content-section mb-16">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#009fff] mb-4">
                  <span className="w-5 h-px bg-[#009fff]" />What You Get
                </div>
                <h2 className="font-serif font-light text-4xl text-white mb-7">
                  Key <em className="text-[#009fff] not-italic">Benefits</em>
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="benefit-item flex items-start gap-3 p-4 rounded-xl bg-[#0F1726] border border-[#009fff]/10 hover:border-[#009fff]/30 transition-all">
                      <div className="w-6 h-6 rounded-full bg-[#009fff] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#05070B]" />
                      </div>
                      <span className="text-[13.5px] font-medium text-white">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="content-section mb-16">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#009fff] mb-4">
                  <span className="w-5 h-px bg-[#009fff]" />How We Do It
                </div>
                <h2 className="font-serif font-light text-4xl text-white mb-7">
                  Our <em className="text-[#009fff] not-italic">Process</em>
                </h2>
                <div className="space-y-4">
                  {service.process.map((p, i) => (
                    <div key={i} className="process-step flex gap-5 p-6 bg-[#0F1726] border border-[#009fff]/10 rounded-2xl hover:border-[#009fff]/30 hover:shadow-lg transition-all group">
                      <div className="w-12 h-12 rounded-full bg-[#009fff] text-[#05070B] flex items-center justify-center font-serif font-semibold text-lg shrink-0">
                        {p.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[15px] text-white mb-1.5 group-hover:text-[#009fff] transition-colors">{p.title}</h4>
                        <p className="text-[13.5px] text-[#f7f8f9] font-light leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="content-section">
                <div ref={faqHeaderRef} className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#009fff] mb-4">
                  <span className="w-5 h-px bg-[#009fff]" />Common Questions
                </div>
                <h2 className="font-serif font-light text-4xl text-white mb-7">
                  {service.name} <em className="text-[#009fff] not-italic">FAQs</em>
                </h2>
                <div className="space-y-4">
                  {faqs.map(([q, a], i) => (
                    <FaqItem key={i} q={q} a={a} index={i} />
                  ))}
                </div>
              </div>

            </div>

            {/* ── STICKY SIDEBAR ────────────────────────────────────────── */}
            <div className="space-y-5 lg:sticky lg:top-24 self-start">

              {/* Book CTA */}
              <div className="bg-[#0F1726] border border-[#009fff]/10 rounded-2xl p-7">
                <div className="text-4xl mb-4 text-[#009fff]">{service.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-white mb-1">Book {service.name}</h3>
                <p className="text-[#f7f8f9] text-[13px] font-light mb-6">Get a free, no-pressure quote today.</p>

                <div className="space-y-2.5 mb-6 pb-5 border-b border-[#009fff]/10">
                  {service.plans.map((plan, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[12.5px] text-[#f7f8f9]">{plan.name}</span>
                      <span className={`text-[13px] font-semibold ${plan.popular ? 'text-[#009fff]' : 'text-white'}`}>
                        {fmt(plan.price, plan.unit)}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="block text-center bg-[#009fff] text-[#05070B] text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg hover:bg-[#007BFF] transition-all mb-3"
                >
                  Get a Free Quote →
                </Link>
                <a href="tel:+15551234567"
                  className="flex items-center justify-center gap-2 border border-[#009fff]/20 text-[#f7f8f9] text-xs font-semibold uppercase tracking-widest py-2.5 rounded-lg hover:border-[#009fff] hover:text-[#009fff] transition-all">
                  <Phone size={12} /> (555) 123-4567
                </a>
              </div>

              {/* Promise box */}
              <div className="bg-[#0F1726] border border-[#009fff]/10 rounded-2xl p-6">
                <h4 className="font-serif text-lg font-semibold text-white mb-4">The Dsp-Tints Promise</h4>
                {[
                  ['🏆','Premium materials only'],
                  ['✅','Satisfaction guarantee'],
                  ['⚡','Fast turnaround'],
                  ['📋','Free estimates always'],
                  ['🛡️','Licensed & insured'],
                  ['🔁','Free re-dos if needed'],
                ].map(([ico, lbl]) => (
                  <div key={lbl} className="flex items-center gap-3 py-2.5 border-b border-[#009fff]/10 last:border-0">
                    <span className="text-base">{ico}</span>
                    <span className="text-[13px] text-[#f7f8f9] font-medium">{lbl}</span>
                  </div>
                ))}
              </div>

              {/* Pricing link */}
              <Link to={`/pricing#${service.slug}`}
                className="flex items-center justify-between bg-[#0F1726] border border-[#009fff]/10 rounded-2xl p-5 hover:border-[#009fff] hover:bg-[#009fff]/5 transition-all group">
                <div>
                  <div className="text-[10.5px] font-bold tracking-widest uppercase text-[#009fff] mb-1">See Detailed Plans</div>
                  <div className="text-[13.5px] font-semibold text-white group-hover:text-[#009fff] transition-colors">Full Pricing Page</div>
                </div>
                <ArrowRight size={16} className="text-[#f7f8f9] group-hover:text-[#009fff] transition-colors" />
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PLANS ───────────────────────────────────────────────── */}
      <section ref={plansRef} className="py-20 bg-[#0A0F1C] border-t border-[#009fff]/10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#009fff] mb-4">
              <span className="w-5 h-px bg-[#009fff]" />Choose Your Plan
            </div>
            <h2 className="font-serif font-light text-5xl text-white">
              {service.name} <em className="text-[#009fff] not-italic">Packages</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {service.plans.map((plan, i) => (
              <div key={i} className="plan-card relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#009fff] text-[#05070B] text-[10px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg z-10">
                    Most Popular
                  </div>
                )}
                <div className={`relative rounded-2xl p-8 flex flex-col h-full transition-all hover:shadow-[0_0_30px_rgba(0,159,255,0.3)] ${
                  plan.popular
                    ? 'bg-[#0F1726] ring-2 ring-[#009fff]'
                    : 'bg-[#0F1726] border border-[#009fff]/10'
                }`}>
                  {/* Plan header */}
                  <div className="mb-6">
                    <div className={`text-[10.5px] font-bold tracking-widest uppercase mb-1 text-[#009fff]`}>
                      {service.name}
                    </div>
                    <h3 className={`font-serif text-2xl font-semibold mb-0.5 text-white`}>
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-7">
                    <div className={`font-serif text-5xl font-light leading-none mb-1 text-white`}>
                      {fmt(plan.price, plan.unit)}
                    </div>
                    <div className={`text-xs font-light text-[#f7f8f9]`}>
                      {plan.unit ? 'per square foot' : 'starting price incl. labour'}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-start gap-2.5 text-[13px] text-[#f7f8f9]`}>
                        <Check size={13} className="text-[#009fff] mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/contact?service=${encodeURIComponent(service.name + ' — ' + plan.name)}`}
                    className={`text-center text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl block transition-all ${
                      plan.popular
                        ? 'bg-[#009fff] text-[#05070B] hover:bg-[#007BFF]'
                        : 'border border-[#009fff] text-white hover:bg-[#009fff] hover:text-[#05070B]'
                    }`}
                  >
                    Book {plan.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[12.5px] text-[#f7f8f9] mt-8">
            All prices are starting prices. Final quote confirmed before any work begins. No hidden fees.
          </p>
        </div>
      </section>

      {/* ── RELATED SERVICES ────────────────────────────────────────────── */}
      <section ref={relatedRef} className="py-16 bg-[#05070B] border-t border-[#009fff]/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif font-light text-3xl text-white">
              More <em className="text-[#009fff] not-italic">Services</em>
            </h2>
            <Link to="/services"
              className="text-xs font-bold uppercase tracking-widest text-[#009fff] hover:text-[#007BFF] transition-colors flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map(r => (
              <Link key={r.id} to={`/services/${r.slug}`}
                className="related-item flex items-center gap-4 p-4 bg-[#0F1726] border border-[#009fff]/10 rounded-xl hover:border-[#009fff] hover:shadow-lg transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#0F1726] border border-[#009fff]/20 flex items-center justify-center text-xl shrink-0 group-hover:border-[#009fff] transition-colors">
                  <span className="text-[#009fff]">{r.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px] text-white group-hover:text-[#009fff] transition-colors">{r.name}</div>
                  <div className="text-[11px] text-[#f7f8f9] font-light truncate">{r.tagline}</div>
                </div>
                <ArrowRight size={13} className="text-[#f7f8f9] group-hover:text-[#009fff] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-20 bg-[#0A0F1C] text-center">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-6xl mb-5 text-[#009fff]">{service.icon}</div>
          <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.2rem)] leading-tight text-white mb-4">
            Ready to Book <em className="text-[#009fff] not-italic">{service.name}?</em>
          </h2>
          <p className="text-[#f7f8f9] font-light text-[15px] mb-8">
            Get a free quote in minutes. Our team responds within a few hours.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to={`/contact?service=${encodeURIComponent(service.name)}`}
              className="bg-[#009fff] text-[#05070B] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-[#007BFF] transition-all">
              Get a Free Quote
            </Link>
            <Link to="/services"
              className="inline-flex items-center gap-2 border border-[#009fff]/30 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:border-[#009fff] hover:text-[#009fff] transition-all">
              <ArrowLeft size={13} /> All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}