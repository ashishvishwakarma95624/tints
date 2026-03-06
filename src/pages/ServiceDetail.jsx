import { useParams, Link } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Phone } from 'lucide-react';
import { SERVICES } from '../data';

// Per-service accent colours
const ACCENTS = {
  'window-tint':          { from:'from-sky-950',    to:'to-sky-800',    light:'bg-sky-50',    border:'border-sky-200',    text:'text-sky-700',    dot:'bg-sky-500' },
  'paint-protection-film':{ from:'from-slate-950',  to:'to-slate-800',  light:'bg-slate-50',  border:'border-slate-200',  text:'text-slate-700',  dot:'bg-slate-500' },
  'ceramic-coating':      { from:'from-amber-950',  to:'to-amber-800',  light:'bg-amber-50',  border:'border-amber-200',  text:'text-amber-700',  dot:'bg-amber-500' },
  'vehicle-wrap':         { from:'from-purple-950', to:'to-purple-800', light:'bg-purple-50', border:'border-purple-200', text:'text-purple-700', dot:'bg-purple-500' },
  'car-detailing':        { from:'from-emerald-950',to:'to-emerald-800',light:'bg-emerald-50',border:'border-emerald-200',text:'text-emerald-700',dot:'bg-emerald-500' },
  'commercial-tints':     { from:'from-teal-950',   to:'to-teal-800',   light:'bg-teal-50',   border:'border-teal-200',   text:'text-teal-700',   dot:'bg-teal-500' },
  'office-signs':         { from:'from-orange-950', to:'to-orange-800', light:'bg-orange-50', border:'border-orange-200', text:'text-orange-700', dot:'bg-orange-500' },
  'tire-swap':            { from:'from-zinc-900',   to:'to-zinc-700',   light:'bg-zinc-50',   border:'border-zinc-200',   text:'text-zinc-700',   dot:'bg-zinc-500' },
  '3d-printing':          { from:'from-cyan-950',   to:'to-cyan-800',   light:'bg-cyan-50',   border:'border-cyan-200',   text:'text-cyan-700',   dot:'bg-cyan-500' },
  'handyman':             { from:'from-red-950',    to:'to-red-800',    light:'bg-red-50',    border:'border-red-200',    text:'text-red-700',    dot:'bg-red-500' },
  'custom-kit':           { from:'from-indigo-950', to:'to-indigo-800', light:'bg-indigo-50', border:'border-indigo-200', text:'text-indigo-700', dot:'bg-indigo-500' },
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

function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
        className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-[14px]">{q}</span>
        <span className="text-gold text-xl shrink-0 font-light">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="px-6 pb-5 text-[13.5px] text-gray-500 leading-relaxed font-light">{a}</p>}
    </div>
  );
}

import React from 'react';

export default function ServiceDetail() {
  const { slug }  = useParams();
  const service   = SERVICES.find(s => s.slug === slug);
  const acc       = service ? (ACCENTS[slug] || ACCENTS['window-tint']) : null;
  const faqs      = FAQS[slug] || DEFAULT_FAQS;
  const related   = service
    ? SERVICES.filter(s => s.slug !== slug).slice(0, 6)
    : [];

  if (!service) return (
    <div className="pt-24 text-center py-20">
      <div className="text-6xl mb-5">🔍</div>
      <h2 className="font-serif text-3xl mb-3">Service Not Found</h2>
      <p className="text-gray-400 mb-8">We couldn't find that service. Browse all our services below.</p>
      <Link to="/services" className="btn-primary">View All Services</Link>
    </div>
  );

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className={`pt-28 pb-0 bg-gradient-to-br ${acc.from} ${acc.to} text-white relative overflow-hidden`}>
        {/* Decorative rings */}
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full border border-white/[.04] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full border border-white/[.04] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute right-0 top-0 w-[200px] h-[200px] rounded-full border border-white/[.04] translate-x-1/3 -translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-10">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/60">{service.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_340px] gap-12 pb-16">
            {/* Left */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-4xl">
                  {service.icon}
                </div>
                <span className="text-[11px] font-bold tracking-[.2em] uppercase text-white/40 border border-white/20 px-3 py-1.5 rounded-full">
                  {service.category}
                </span>
              </div>
              <h1 className="font-serif font-light text-[clamp(2.8rem,5vw,4.8rem)] leading-tight mb-4">{service.name}</h1>
              <p className="text-[1.1rem] text-white/45 italic font-light mb-6">{service.tagline}</p>
              <p className="text-[15px] text-white/55 leading-relaxed font-light max-w-xl mb-8">{service.shortDesc}</p>
              <div className="flex flex-wrap gap-3">
                <Link to={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="btn-gold">Get a Free Quote <ArrowRight size={13} /></Link>
                <a href="tel:5551234567"
                  className="inline-flex items-center gap-2 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[.15em] px-6 py-3.5 rounded hover:border-gold hover:text-gold transition-all">
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
                <div key={l} className="flex items-center justify-between bg-white/[.07] border border-white/10 rounded-xl px-5 py-3.5">
                  <span className="text-[11.5px] text-white/40 uppercase tracking-widest font-semibold">{l}</span>
                  <span className="font-serif text-xl font-semibold text-white">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* White wave bottom */}
        <div className="h-8 bg-white" style={{ clipPath:'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-16">

            {/* Left column */}
            <div>

              {/* About */}
              <div className="mb-16">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-gold mb-4">
                  <span className="w-5 h-px bg-gold" />About This Service
                </div>
                <h2 className="font-serif font-light text-4xl mb-5">
                  What Is <em className="text-gold not-italic">{service.name}?</em>
                </h2>
                <p className="text-[15px] text-gray-500 leading-relaxed font-light">{service.fullDesc}</p>
              </div>

              {/* Benefits */}
              <div className="mb-16">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-gold mb-4">
                  <span className="w-5 h-px bg-gold" />What You Get
                </div>
                <h2 className="font-serif font-light text-4xl mb-7">
                  Key <em className="text-gold not-italic">Benefits</em>
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.map((b, i) => (
                    <div key={i}
                      className={`flex items-start gap-3 p-4 rounded-xl border ${acc.light} ${acc.border} hover:shadow-sm transition-shadow`}>
                      <div className={`w-6 h-6 rounded-full ${acc.dot} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Check size={12} className="text-white" />
                      </div>
                      <span className={`text-[13.5px] font-medium ${acc.text}`}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="mb-16">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-gold mb-4">
                  <span className="w-5 h-px bg-gold" />How We Do It
                </div>
                <h2 className="font-serif font-light text-4xl mb-7">
                  Our <em className="text-gold not-italic">Process</em>
                </h2>
                <div className="space-y-4">
                  {service.process.map((p, i) => (
                    <div key={i}
                      className="flex gap-5 p-6 bg-white border border-gray-200 rounded-2xl hover:border-gold/40 hover:shadow-md transition-all group">
                      <div className="w-12 h-12 rounded-full bg-gold text-ink flex items-center justify-center font-serif font-semibold text-lg shrink-0">
                        {p.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[15px] mb-1.5 group-hover:text-gold transition-colors">{p.title}</h4>
                        <p className="text-[13.5px] text-gray-500 font-light leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-gold mb-4">
                  <span className="w-5 h-px bg-gold" />Common Questions
                </div>
                <h2 className="font-serif font-light text-4xl mb-7">
                  {service.name} <em className="text-gold not-italic">FAQs</em>
                </h2>
                <div className="space-y-3">
                  {faqs.map(([q, a], i) => <FaqItem key={i} q={q} a={a} />)}
                </div>
              </div>

            </div>

            {/* ── STICKY SIDEBAR ────────────────────────────────────────── */}
            <div className="space-y-5 lg:sticky lg:top-24 self-start">

              {/* Book CTA */}
              <div className={`bg-gradient-to-br ${acc.from} ${acc.to} text-white rounded-2xl p-7`}>
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-white mb-1">Book {service.name}</h3>
                <p className="text-white/40 text-[13px] font-light mb-6">Get a free, no-pressure quote today.</p>

                <div className="space-y-2.5 mb-6 pb-5 border-b border-white/10">
                  {service.plans.map((plan, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[12.5px] text-white/50">{plan.name}</span>
                      <span className={`text-[13px] font-semibold ${plan.popular ? 'text-gold' : 'text-white/70'}`}>
                        {fmt(plan.price, plan.unit)}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="block text-center bg-gold text-ink text-[11px] font-bold uppercase tracking-[.18em] py-3.5 rounded-lg hover:bg-gold-dark transition-colors mb-3"
                >
                  Get a Free Quote →
                </Link>
                <a href="tel:5551234567"
                  className="flex items-center justify-center gap-2 border border-white/15 text-white/50 text-[11px] font-semibold uppercase tracking-widest py-2.5 rounded-lg hover:border-gold hover:text-gold transition-all">
                  <Phone size={12} /> (555) 123-4567
                </a>
              </div>

              {/* Promise box */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h4 className="font-serif text-lg font-semibold mb-4">The Dsp-Tints Promise</h4>
                {[
                  ['🏆','Premium materials only'],
                  ['✅','Satisfaction guarantee'],
                  ['⚡','Fast turnaround'],
                  ['📋','Free estimates always'],
                  ['🛡️','Licensed & insured'],
                  ['🔁','Free re-dos if needed'],
                ].map(([ico, lbl]) => (
                  <div key={lbl} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                    <span className="text-base">{ico}</span>
                    <span className="text-[13px] text-gray-700 font-medium">{lbl}</span>
                  </div>
                ))}
              </div>

              {/* Pricing link */}
              <Link to={`/pricing#${service.slug}`}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-gold hover:bg-gold/5 transition-all group">
                <div>
                  <div className="text-[10.5px] font-bold tracking-widest uppercase text-gold mb-1">See Detailed Plans</div>
                  <div className="text-[13.5px] font-semibold group-hover:text-gold transition-colors">Full Pricing Page</div>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gold transition-colors" />
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PLANS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-gold mb-4">
              <span className="w-5 h-px bg-gold" />Choose Your Plan
            </div>
            <h2 className="font-serif font-light text-5xl">
              {service.name} <em className="text-gold not-italic">Packages</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {service.plans.map((plan, i) => (
              <div key={i}
                className={`relative rounded-2xl p-8 flex flex-col transition-shadow hover:shadow-xl ${
                  plan.popular
                    ? `bg-gradient-to-br ${acc.from} ${acc.to} text-white ring-2 ring-gold`
                    : 'bg-white border border-gray-200'
                }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-ink text-[10px] font-bold uppercase tracking-[.18em] px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <div className={`text-[10.5px] font-bold tracking-[.18em] uppercase mb-1 ${plan.popular ? 'text-white/40' : 'text-gray-400'}`}>
                    {service.name}
                  </div>
                  <h3 className={`font-serif text-2xl font-semibold mb-0.5 ${plan.popular ? 'text-white' : 'text-ink'}`}>
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-7">
                  <div className={`font-serif text-5xl font-light leading-none mb-1 ${plan.popular ? 'text-white' : 'text-ink'}`}>
                    {fmt(plan.price, plan.unit)}
                  </div>
                  <div className={`text-[12px] font-light ${plan.popular ? 'text-white/35' : 'text-gray-400'}`}>
                    {plan.unit ? 'per square foot' : 'starting price incl. labour'}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className={`flex items-start gap-2.5 text-[13px] ${plan.popular ? 'text-white/75' : 'text-gray-600'}`}>
                      <Check size={13} className="text-gold mt-0.5 shrink-0" />{f}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?service=${encodeURIComponent(service.name + ' — ' + plan.name)}`}
                  className={`text-[11px] font-bold uppercase tracking-[.15em] py-3.5 rounded-xl text-center block transition-all ${
                    plan.popular
                      ? 'bg-gold text-ink hover:bg-gold-dark'
                      : 'bg-ink text-white hover:bg-gold hover:text-ink'
                  }`}
                >
                  Book {plan.name} →
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[12.5px] text-gray-400 mt-8">
            All prices are starting prices. Final quote confirmed before any work begins. No hidden fees.
          </p>
        </div>
      </section>

      {/* ── RELATED SERVICES ────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif font-light text-3xl">
              More <em className="text-gold not-italic">Services</em>
            </h2>
            <Link to="/services"
              className="text-[12px] font-bold uppercase tracking-widest text-gold hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map(r => (
              <Link key={r.id} to={`/services/${r.slug}`}
                className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-gold hover:bg-gold/5 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 group-hover:border-gold/30 flex items-center justify-center text-xl shrink-0 transition-colors">
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px] group-hover:text-gold transition-colors">{r.name}</div>
                  <div className="text-[11px] text-gray-400 font-light truncate">{r.tagline}</div>
                </div>
                <ArrowRight size={13} className="text-gray-300 group-hover:text-gold transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gold text-center">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-5xl mb-5">{service.icon}</div>
          <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-4">
            Ready to Book <em className="not-italic">{service.name}?</em>
          </h2>
          <p className="text-ink/55 font-light text-[15px] mb-8">
            Get a free quote in minutes. Our team responds within a few hours.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to={`/contact?service=${encodeURIComponent(service.name)}`}
              className="bg-ink text-white text-[12px] font-bold uppercase tracking-[.15em] px-8 py-4 rounded hover:bg-white hover:text-ink transition-all">
              Get a Free Quote
            </Link>
            <Link to="/services"
              className="inline-flex items-center gap-2 border border-ink/20 text-ink text-[12px] font-bold uppercase tracking-[.15em] px-8 py-4 rounded hover:border-ink transition-all">
              <ArrowLeft size={13} /> All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
