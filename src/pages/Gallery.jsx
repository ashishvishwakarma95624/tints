import { Link } from 'react-router-dom';
import { GALLERY_ITEMS } from '../data';
import { PageHero } from '../components/ui';

export default function Gallery() {
  return (
    <>
      <PageHero
        label="Our Work"
        title="Project <em class='text-gold not-italic'>Gallery</em>"
        subtitle="A showcase of completed projects. Every job represents our commitment to precision and quality."
        breadcrumbs={['Home', 'Gallery']}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={item.id}
                className="break-inside-avoid rounded-xl overflow-hidden relative cursor-pointer group border border-gray-200">
                <div className={`bg-gradient-to-br ${item.bg} flex items-center justify-center ${
                  ['aspect-[4/5]','aspect-[16/10]','aspect-square'][i % 3]
                }`}>
                  <span className="text-6xl opacity-25">{item.icon}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="font-serif text-white text-lg font-semibold">{item.title}</div>
                  <div className="text-white/55 text-xs tracking-widest uppercase mt-0.5">{item.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-ink text-center">
        <div className="max-w-xl mx-auto px-5">
          <h2 className="font-serif font-light text-4xl text-white mb-3">Like What You See?</h2>
          <p className="text-white/40 font-light mb-7">Get your own Dsp-Tints transformation. Contact us for a free quote today.</p>
          <Link to="/contact" className="btn-gold inline-flex">Get a Free Quote</Link>
        </div>
      </section>
    </>
  );
}
