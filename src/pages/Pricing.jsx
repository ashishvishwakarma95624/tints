import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES } from '../data';
import { PageHero } from '../components/ui';

const fmt = (price, unit) =>
  unit ? `$${Number(price).toFixed(2)}${unit}` : `$${Number(price).toLocaleString()}`;

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[14.5px]">{q}</span>
        <span className="text-gold text-xl shrink-0">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="px-6 pb-5 text-[13.5px] text-gray-500 leading-relaxed font-light">{a}</p>
      )}
    </div>
  );
}

export default function Pricing() {
  const [cat, setCat] = useState('All');
  const cats = SERVICE_CATEGORIES.filter(c => c !== 'All');
  const list = cat === 'All' ? SERVICES : SERVICES.filter(s => s.category === cat);

  return (
    <>
      <PageHero
        label="Transparent Pricing"
        title="Simple, Honest <em class='text-gold not-italic'>Pricing</em>"
        subtitle="No hidden fees. No upselling. Every plan clearly listed so you can choose with confidence."
        breadcrumbs={['Home', 'Pricing']}
      />

      {/* Sticky category bar */}
      <div className="sticky top-[66px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            <button
              onClick={() => setCat('All')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11.5px] font-bold tracking-widest uppercase border transition-all shrink-0 ${cat === 'All' ? 'bg-ink text-white border-ink' : 'border-gray-200 text-gray-600 hover:border-gold hover:text-gold'}`}
            >All</button>
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11.5px] font-bold tracking-widest uppercase border transition-all shrink-0 ${cat === c ? 'bg-ink text-white border-ink' : 'border-gray-200 text-gray-600 hover:border-gold hover:text-gold'}`}
              >{c}</button>
            ))}
            <Link to="/contact" className="ml-auto shrink-0 bg-gold text-ink text-[11px] font-bold uppercase tracking-[.15em] px-5 py-1.5 rounded-full hover:bg-gold-dark transition-all">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Service pricing sections */}
      {list.map((service, si) => (
        <section key={service.id} id={service.slug} className={`py-20 ${si % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl shrink-0">{service.icon}</div>
              <div className="flex-1">
                <h2 className="font-serif text-3xl font-semibold">{service.name}</h2>
                <p className="text-[13px] text-gray-400 font-light mt-0.5">{service.tagline}</p>
              </div>
              <Link to={`/services/${service.slug}`} className="hidden sm:flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">
                Full Details <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {service.plans.map((plan, pi) => (
                <div key={pi}
                  className={`relative rounded-xl p-7 flex flex-col hover:shadow-xl transition-shadow ${plan.popular ? 'bg-ink text-white ring-2 ring-gold' : 'bg-white border border-gray-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-ink text-[10px] font-bold uppercase tracking-[.18em] px-4 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-5">
                    <div className={`text-[10.5px] font-bold tracking-[.18em] uppercase mb-1 ${plan.popular ? 'text-gold' : 'text-gray-400'}`}>{service.name}</div>
                    <h3 className={`font-serif text-2xl font-semibold ${plan.popular ? 'text-white' : 'text-ink'}`}>{plan.name}</h3>
                  </div>
                  <div className="mb-6">
                    <div className={`font-serif text-5xl font-light leading-none mb-1 ${plan.popular ? 'text-white' : 'text-ink'}`}>{fmt(plan.price, plan.unit)}</div>
                    <div className={`text-[12px] font-light ${plan.popular ? 'text-white/40' : 'text-gray-400'}`}>{plan.unit ? 'per square foot' : 'starting price'}</div>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-7">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-start gap-2.5 text-[13px] ${plan.popular ? 'text-white/75' : 'text-gray-600'}`}>
                        <Check size={13} className="text-gold mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?service=${encodeURIComponent(service.name)}`}
                    className={`text-[11px] font-bold uppercase tracking-[.15em] py-3 rounded text-center block transition-all ${plan.popular ? 'bg-gold text-ink hover:bg-gold-dark' : 'bg-ink text-white hover:bg-gold hover:text-ink'}`}
                  >
                    Book This Plan →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-ink text-white text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="font-serif font-light text-5xl text-white mb-4">Need a Custom <em className="text-gold not-italic">Quote?</em></h2>
          <p className="text-white/45 font-light text-[15px] mb-8">Tell us about your project and we'll put together a personalised quote with no pressure.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="btn-gold">Get a Free Quote</Link>
            <a href="tel:5551234567" className="inline-flex items-center gap-2 border border-white/20 text-white text-[12px] font-bold uppercase tracking-[.15em] px-8 py-3.5 rounded hover:border-gold hover:text-gold transition-all">
              📞 Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-serif font-light text-4xl">Pricing <em className="text-gold not-italic">FAQs</em></h2>
          </div>
          <div className="space-y-3">
            {[
              ['Are these prices final?','Our listed prices are starting prices. Final cost depends on vehicle size, condition, and add-ons. We always confirm the exact price before starting any work.'],
              ['Do you offer package deals?','Yes! Combining services like Window Tint + Ceramic Coating qualifies for multi-service discounts. Ask us when booking.'],
              ['Is a deposit required?','We typically ask for 30% deposit on larger jobs (over $500) to cover materials. Balance is due on completion.'],
              ["What if I'm not satisfied?",'Every service comes with our satisfaction guarantee. If something isn\'t right, we\'ll fix it — no questions asked.'],
            ].map(([q, a], i) => <FaqItem key={i} q={q} a={a} />)}
          </div>
        </div>
      </section>
    </>
  );
}
