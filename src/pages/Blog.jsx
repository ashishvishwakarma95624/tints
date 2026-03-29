import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data';
import { PageHero } from '../components/ui';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const [cat, setCat] = useState('All');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const categoryContainerRef = useRef(null);
  const blogRef = useRef(null);
  const featuredRef = useRef(null);
  const ctaRef = useRef(null);
  
  const list = cat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === cat);

  // Function to animate blog cards
  const animateCards = () => {
    gsap.killTweensOf('.blog-card');
    
    gsap.set('.blog-card', {
      opacity: 1,
      y: 0
    });
    
    gsap.from('.blog-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "all"
    });
  };

  // Handle category scroll
  const scrollCategories = (direction) => {
    if (categoryContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? categoryContainerRef.current.scrollLeft - scrollAmount
        : categoryContainerRef.current.scrollLeft + scrollAmount;
      
      categoryContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Check scroll position for arrows
  const checkScroll = () => {
    if (categoryContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryContainerRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const container = categoryContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check after a short delay to ensure proper measurements
      setTimeout(checkScroll, 100);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured post animation
      gsap.from(featuredRef.current, {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Category filter animation
      gsap.from('.category-btn', {
        scrollTrigger: {
          trigger: blogRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      });

      // Initial card animation
      animateCards();

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
    }, [blogRef, featuredRef, ctaRef]);

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


      <section ref={blogRef} className="py-20 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          
          {/* Category Filter with Scroll */}
          <div className="relative mb-12">
            <div
              ref={categoryContainerRef}
              className="flex gap-3 overflow-x-auto px-2 py-4"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {BLOG_CATEGORIES.map((c, index) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`category-btn flex-shrink-0 px-6 py-3 rounded-full text-[14px] font-bold tracking-wide transition-all duration-300 ${
                    cat === c
                      ? 'bg-[#009fff] text-[#05070B] shadow-lg shadow-[#009fff]/50 scale-105 border-2 border-[#009fff]'
                      : 'bg-[#0F1726] text-white border-2 border-[#009fff]/20 hover:border-[#009fff] hover:bg-[#009fff]/20 hover:scale-105'
                  }`}
                  style={{ minWidth: 'fit-content' }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="text-center mb-8">
            <p className="text-[#f7f8f9] text-sm">
              Showing <span className="text-[#009fff] font-bold">{list.length}</span> article{list.length !== 1 ? 's' : ''}
              {cat !== 'All' && <span> in <span className="text-[#009fff] font-bold">{cat}</span></span>}
            </p>
          </div>

          {/* Featured post */}
          {cat === 'All' && list[0] && (
            <div ref={featuredRef} className="grid lg:grid-cols-2 bg-[#0F1726] rounded-2xl overflow-hidden border border-[#009fff]/20 mb-12 hover:shadow-[0_0_30px_rgba(0,159,255,0.3)] transition-all">
              <div className="bg-[#0A0F1C] flex items-center justify-center p-16 min-h-[260px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #009fff 0px, #009fff 2px, transparent 2px, transparent 10px)'
                }} />
                <div className="text-center relative z-10">
                  <div className="text-8xl mb-5">📝</div>
                  <span className="text-[10.5px] font-bold tracking-[.2em] uppercase text-[#009fff] border-2 border-[#009fff]/30 px-4 py-2 rounded-full">
                    {list[0].category}
                  </span>
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center bg-[#0F1726]">
                <div className="flex gap-3 mb-4">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#05070B] bg-[#009fff] px-3 py-1 rounded-full">Featured</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#f7f8f9]">
                    <Clock size={11} className="text-[#009fff]" />{list[0].readTime} min read
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-semibold mb-4 leading-tight text-white hover:text-[#009fff] transition-colors">
                  <Link to={`/blog/${list[0].slug}`}>{list[0].title}</Link>
                </h2>
                <p className="text-[#f7f8f9] font-light text-[14px] leading-relaxed mb-6">{list[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User size={12} className="text-[#009fff]" />
                    <span className="text-[12px] text-[#f7f8f9]">{list[0].author}</span>
                  </div>
                  <Link to={`/blog/${list[0].slug}`} 
                    className="inline-flex items-center gap-2 bg-[#009fff] text-[#05070B] px-5 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#007BFF] transition-all">
                    Read More <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.slice(cat === 'All' ? 1 : 0).map(post => (
              <div key={post.id}
                className="blog-card group bg-[#0F1726] border border-[#009fff]/20 rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,159,255,0.3)] hover:-translate-y-1 transition-all flex flex-col">
                
                {/* Blog Image Placeholder */}
                <div className="bg-[#0A0F1C] py-12 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #009fff 0px, #009fff 1px, transparent 1px, transparent 5px)'
                  }} />
                  <span className="relative z-10">📝</span>
                </div>
                
                {/* Blog Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="text-[10.5px] font-bold tracking-widest uppercase bg-[#009fff]/20 text-[#009fff] px-3 py-1 rounded-full border border-[#009fff]/30">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#f7f8f9]">
                      <Clock size={10} className="text-[#009fff]" />{post.readTime} min
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-[1.2rem] font-semibold leading-snug mb-3 flex-1 text-white group-hover:text-[#009fff] transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-[13px] text-[#f7f8f9] font-light leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-[#009fff]/20">
                    <div className="flex items-center gap-2">
                      <User size={11} className="text-[#009fff]" />
                      <span className="text-[11px] text-[#f7f8f9]">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#009fff] uppercase tracking-widest hover:gap-2 transition-all">
                      Read <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {list.length > 6 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-[#0F1726] border-2 border-[#009fff] text-[#009fff] rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-[#009fff] hover:text-[#05070B] transition-all">
                Load More Articles
              </button>
            </div>
          )}

          {/* Empty State */}
          {list.length === 0 && (
            <div className="text-center py-20 bg-[#0F1726] rounded-2xl border-2 border-[#009fff]/20">
              <div className="text-6xl mb-4 opacity-50">📝</div>
              <p className="text-[#f7f8f9] text-lg mb-4">No posts in this category yet.</p>
              <p className="text-[#f7f8f9] text-sm mb-6">Check back soon for new articles or browse other categories.</p>
              <button 
                onClick={() => setCat('All')}
                className="px-6 py-2.5 bg-[#009fff] text-[#05070B] rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-[#007BFF] transition-all"
              >
                View all posts
              </button>
            </div>
          )}

          {/* Newsletter CTA */}
          <section ref={ctaRef} className="mt-16 bg-gradient-to-br from-[#0A0F1C] to-[#0F1726] rounded-2xl p-12 text-center border-2 border-[#009fff]/20">
            <h3 className="font-serif text-3xl font-light text-white mb-3">
              Stay <span className="text-[#009fff]">Informed</span>
            </h3>
            <p className="text-[#f7f8f9] text-sm mb-6 max-w-md mx-auto">
              Get the latest tips, guides, and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-[#0F1726] border-2 border-[#009fff]/20 rounded-lg px-4 py-3 text-white placeholder-[#f7f8f9]/50 focus:border-[#009fff] focus:outline-none transition-colors"
              />
              <button className="bg-[#009fff] text-[#05070B] px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#007BFF] transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}