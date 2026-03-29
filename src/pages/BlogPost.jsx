import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Clock, ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOG_POSTS } from '../data';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const related = post ? BLOG_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3) : [];
  
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const relatedRef = useRef(null);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.2
      });

      // Content animation
      gsap.from('.content-section', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Related posts animation
      gsap.from('.related-card', {
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });
    }, [headerRef, contentRef, relatedRef]);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [post]);

  if (!post) return (
    <div className="pt-32 min-h-[60vh] bg-[#05070B] flex items-center justify-center">
      <div className="text-center py-20 px-5">
        <div className="text-8xl mb-6 opacity-30">📝</div>
        <h2 className="font-serif text-3xl text-white mb-4">Post Not Found</h2>
        <p className="text-[#f7f8f9] mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-[#009fff] text-[#05070B] px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#007BFF] transition-all">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    </div>
  );

  return (
    <article className="pt-[66px] bg-[#05070B]">
      {/* Header */}
      <div ref={headerRef} className="bg-[#0A0F1C] text-white py-20 px-5 border-b border-[#009fff]/10">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#f7f8f9] hover:text-[#009fff] text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          
          <div className="flex items-center flex-wrap gap-3 mb-6">
            <span className="text-[11px] font-bold tracking-[.18em] uppercase text-[#009fff] border border-[#009fff]/30 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-[#f7f8f9]">
              <Clock size={11} className="text-[#009fff]" />{post.readTime} min read
            </span>
          </div>
          
          <h1 className="font-serif font-light text-[clamp(2.2rem,4.5vw,3.5rem)] leading-tight mb-6 text-white">{post.title}</h1>
          
          <p className="text-[#f7f8f9] text-[15px] leading-relaxed font-light mb-8">{post.excerpt}</p>
          
          <div className="flex items-center gap-3 text-[12.5px] text-[#f7f8f9]">
            <div className="w-10 h-10 rounded-full bg-[#009fff] text-[#05070B] flex items-center justify-center font-bold text-lg">
              {post.author[0]}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-white">{post.author}</span>
              <span className="text-[#f7f8f9]">•</span>
              <div className="flex items-center gap-1">
                <Calendar size={11} className="text-[#009fff]" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image Placeholder (if no image in content) */}
      <div className="max-w-5xl mx-auto px-5 -mt-10 relative z-10">
        <div className="bg-[#0F1726] rounded-2xl h-64 md:h-96 flex items-center justify-center border border-[#009fff]/10 shadow-2xl">
          <div className="text-center">
            <div className="text-8xl mb-4 opacity-30">📝</div>
            <span className="text-[#009fff] text-sm font-medium">Featured Image</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-3xl mx-auto px-5 py-16">
        <div className="content-section prose prose-invert prose-lg max-w-none">
          {/* This would be your actual blog content */}
          <div className="text-[#f7f8f9] leading-relaxed space-y-6">
            <p className="text-[#f7f8f9] text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            
            <h2 className="font-serif text-2xl text-white mt-8 mb-4">Understanding the Process</h2>
            
            <p className="text-[#f7f8f9]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <blockquote className="border-l-4 border-[#009fff] pl-6 py-2 my-6 bg-[#0F1726] rounded-r-lg">
              <p className="text-white italic">
                "The key to quality is attention to detail and using only the best materials available."
              </p>
              <footer className="text-[#009fff] text-sm mt-2">— {post.author}</footer>
            </blockquote>
            
            <p className="text-[#f7f8f9]">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#009fff]/10">
            {post.tags.map(tag => (
              <span key={tag} className="bg-[#0F1726] text-[#009fff] text-[12px] font-medium px-3 py-1.5 rounded-full border border-[#009fff]/20">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 pt-8 border-t border-[#009fff]/10 flex gap-3 flex-wrap justify-between">
          <Link to="/blog" className="inline-flex items-center gap-2 border border-[#009fff] text-[#009fff] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#009fff] hover:text-[#05070B] transition-all">
            <ArrowLeft size={14} /> All Posts
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#009fff] text-[#05070B] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#007BFF] transition-all">
            Get a Quote <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section ref={relatedRef} className="bg-[#0A0F1C] border-t border-[#009fff]/10 py-16">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="w-8 h-px bg-[#009fff]" />
                <span className="text-xs font-bold tracking-[.2em] uppercase text-[#009fff]">YOU MIGHT ALSO LIKE</span>
                <span className="w-8 h-px bg-[#009fff]" />
              </div>
              <h2 className="font-serif text-3xl font-light text-white">Related <span className="text-[#009fff]">Articles</span></h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(p => (
                <div key={p.id} className="related-card bg-[#0F1726] border border-[#009fff]/10 rounded-xl p-6 hover:shadow-[0_0_30px_rgba(0,159,255,0.2)] transition-all group">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10.5px] font-bold tracking-widest uppercase bg-[#009fff]/10 text-[#009fff] px-2.5 py-1 rounded-full">
                      {p.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#f7f8f9]">
                      <Clock size={10} className="text-[#009fff]" />{p.readTime} min
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-lg font-semibold mb-3 text-white group-hover:text-[#009fff] transition-colors leading-snug">
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  
                  <p className="text-[12.5px] text-[#f7f8f9] font-light line-clamp-2 mb-4">{p.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-[#009fff]/10">
                    <div className="flex items-center gap-2">
                      <User size={10} className="text-[#009fff]" />
                      <span className="text-[10px] text-[#f7f8f9]">{p.author}</span>
                    </div>
                    <Link to={`/blog/${p.slug}`} className="text-[10px] font-bold text-[#009fff] uppercase tracking-widest hover:gap-1 transition-all flex items-center gap-0.5">
                      Read <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}