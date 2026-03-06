import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui';
import mainimg from '../assets/images/main-img.png';
export default function About() {
  return (
    <>
      <PageHero
        label="Our Story"
        title="Passion For <em class='text-gold not-italic'>Perfection</em>"
        subtitle="Founded in 2016 on a simple promise: deliver flawless results with premium materials and unmatched care."
        breadcrumbs={['Home', 'About']}
      />

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="section-tag">Who We Are</div>
            <h2 className="font-serif font-light text-5xl mb-6">More Than <em className="text-gold not-italic">A Shop</em></h2>
            <p className="text-gray-500 leading-relaxed font-light mb-5 text-[15px]">
              Dsp-Tints started as a two-person window tinting operation out of a single bay garage. Over eight years, we've grown into a full-service auto, commercial, and residential surface treatment company trusted by hundreds of clients.
            </p>
            <p className="text-gray-500 leading-relaxed font-light mb-10 text-[15px]">
              We expanded because clients kept asking — "can you do wraps too?" "Can you tint my office?" Today we say yes to all of it, with the same obsessive attention to detail that got us here.
            </p>
            <div className="grid grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              {[['500+','Happy Clients'],['11','Services'],['8yr','In Business'],['100%','Satisfaction']].map(([n,l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl font-semibold">{n}</div>
                  <div className="text-[10.5px] text-gray-400 tracking-widest uppercase mt-1.5 font-medium">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl aspect-[4/3] flex items-end p-8 relative overflow-hidden">
            <div className="absolute inset-0"
              style={{ backgroundImage: `url(${mainimg})`, backgroundSize: "cover",backgroundPosition: "center"}} />
            <div className="relative z-10">
              <p className="font-serif text-2xl text-white/15 italic mb-5">"Excellence in every detail."</p>
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-gold">Est. 2016</span>
            </div>
            <div className="absolute top-7 right-7 bg-white rounded-xl px-4 py-3 z-10 shadow-lg">
              <div className="text-[9.5px] text-gray-400 uppercase tracking-widest">Founded</div>
              <div className="font-serif text-xl font-semibold">2016</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-gold">Our Values</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-serif font-light text-5xl">What Drives <em className="text-gold not-italic">Everything</em></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['🎯','Precision','We measure twice, cut once. If it\'s not perfect, we redo it.'],
              ['💎','Premium Materials','We never compromise on materials. Only industry-leading brands.'],
              ['🤝','Honest Pricing','No hidden fees, no upselling. You get the full picture upfront.'],
              ['⚡','Speed','Most jobs completed same-day or within 24 hours.'],
              ['📞','Communication','We keep you informed at every step of the process.'],
              ['🌱','Improvement','We regularly train and invest in new tools to stay ahead.'],
            ].map(([ico,t,d]) => (
              <div key={t} className="bg-white border border-gray-200 rounded-xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-4">{ico}</div>
                <h4 className="font-serif text-xl font-semibold mb-2">{t}</h4>
                <p className="text-[13.5px] text-gray-500 font-light leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif font-light text-5xl">Meet the <em className="text-gold not-italic">Experts</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ['Marcus Cole','Founder & Lead Installer','Window Tint & PPF','👨‍🔧'],
              ['Sandra Lee','Senior Wrap Specialist','Wraps & Custom Kits','👩‍🎨'],
              ['James Rivera','Ceramic & Detailing Expert','Ceramic Coating & Detail','👨‍🔬'],
              ['Priya Sharma','Commercial Projects Lead','Commercial Tints & Signs','👩‍💼'],
            ].map(([name,role,spec,em]) => (
              <div key={name} className="text-center">
                <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-7xl mb-5">{em}</div>
                <h4 className="font-serif text-xl font-semibold mb-1">{name}</h4>
                <div className="text-[12px] text-gold font-semibold tracking-wide mb-1">{role}</div>
                <div className="text-[12px] text-gray-400">{spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gold text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="font-serif font-light text-5xl mb-4">Ready to Work <em className="not-italic">With Us?</em></h2>
          <p className="text-ink/55 font-light mb-8 text-[15px]">Request a free quote or give us a call. We'd love to hear about your project.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="bg-ink text-white text-[12px] font-bold uppercase tracking-[.15em] px-8 py-4 rounded hover:bg-white hover:text-ink transition-all">
              Contact Us
            </Link>
            <a href="tel:5551234567" className="border border-ink/25 text-ink text-[12px] font-bold uppercase tracking-[.15em] px-8 py-4 rounded hover:border-ink transition-all">
              📞 Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
