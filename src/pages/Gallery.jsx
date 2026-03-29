import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_ITEMS } from '../data';
import { PageHero } from '../components/ui';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate gallery items on scroll
      gsap.from('.gallery-item', {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });
    }, galleryRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Service category filters (you can add this if needed)
  const categories = ['All', 'Window Tint', 'PPF', 'Ceramic Coating', 'Vinyl Wrap', 'Commercial'];

  return (
    <>
      {/* Gallery Section */}
      <section ref={galleryRef} className="py-24 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          
          {/* Gallery Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#009fff]" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff]">Portfolio</span>
              <span className="w-8 h-px bg-[#009fff]" />
            </div>
            <h2 className="font-serif font-light text-4xl text-white mb-4">
              Featured <em className="text-[#009fff] not-italic">Projects</em>
            </h2>
            <p className="text-[#f7f8f9] max-w-2xl mx-auto">
              Browse through our recent work. Each project showcases our attention to detail and commitment to excellence.
            </p>
          </div>

          {/* Category Filters - Optional, uncomment if you want filters */}
          {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat, index) => (
              <button
                key={index}
                className="px-5 py-2 text-sm rounded-full border border-[#009fff]/20 text-[#f7f8f9] hover:bg-[#009fff] hover:text-[#05070B] transition-all duration-300"
              >
                {cat}
              </button>
            ))}
          </div> */}

          {/* Masonry Gallery */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className="gallery-item break-inside-avoid rounded-xl overflow-hidden relative cursor-pointer group border border-[#009fff]/10 bg-[#0F1726]"
              >
                {/* Background with gradient */}
                <div className={`bg-gradient-to-br ${item.bg || 'from-[#0F1726] to-[#1E2A3A]'} flex items-center justify-center ${
                  ['aspect-[4/5]', 'aspect-[16/10]', 'aspect-square'][i % 3]
                }`}>
                  {item.icon ? (
                    <span className="text-6xl opacity-25 group-hover:opacity-40 transition-opacity">{item.icon}</span>
                  ) : (
                    <span className="text-6xl opacity-25">🖼️</span>
                  )}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="font-serif text-white text-xl font-semibold mb-1">{item.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#009fff] text-xs tracking-widest uppercase">{item.service}</span>
                    <span className="text-white/55 text-[10px]">{item.date || 'Recent Project'}</span>
                  </div>
                </div>
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#009fff]/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-6 -translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0"></div>
              </div>
            ))}
          </div>

          {/* View More CTA */}
          <div className="text-center mt-16">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-[#009fff] text-[#009fff] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#009fff] hover:text-[#05070B] transition-all group"
            >
              Start Your Project
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Optional */}
      <section className="py-16 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '11', label: 'Services' },
              { value: '8+', label: 'Years Experience' },
              { value: '100%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-3xl font-bold text-[#009fff] mb-2">{stat.value}</div>
                <div className="text-xs text-[#f7f8f9] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}