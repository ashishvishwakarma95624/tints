import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data';
import { PageHero } from '../components/ui';

export default function Blog() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === cat);

  return (
    <>
      <PageHero
        label="Tips & Guides"
        title="The <em class='text-gold not-italic'>Dsp-Tints</em> Blog"
        subtitle="Expert tips, how-to guides, and industry insights from our certified professionals."
        breadcrumbs={['Home', 'Blog']}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {BLOG_CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-[12px] font-bold tracking-widest uppercase border transition-all ${
                  cat === c ? 'bg-ink text-white border-ink' : 'border-gray-300 text-gray-600 hover:border-ink'
                }`}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {cat === 'All' && list[0] && (
            <div className="grid lg:grid-cols-2 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 mb-12">
              <div className="bg-ink flex items-center justify-center p-16 min-h-[260px]">
                <div className="text-center">
                  <div className="text-7xl opacity-20 mb-5">📝</div>
                  <span className="text-[10.5px] font-bold tracking-[.2em] uppercase text-gold border border-gold/50 px-3 py-1.5 rounded-full">
                    {list[0].category}
                  </span>
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex gap-3 mb-4">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-white bg-gold px-2.5 py-1 rounded-full">Featured</span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Clock size={11} />{list[0].readTime} min read
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-semibold mb-4 leading-tight hover:text-gold transition-colors">
                  <Link to={`/blog/${list[0].slug}`}>{list[0].title}</Link>
                </h2>
                <p className="text-gray-500 font-light text-[14px] leading-relaxed mb-6">{list[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-400">{list[0].author}</span>
                  <Link to={`/blog/${list[0].slug}`} className="btn-primary py-2.5 text-[11px]">
                    Read More <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {list.slice(cat === 'All' ? 1 : 0).map(post => (
              <div key={post.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col">
                <div className="bg-gray-100 py-12 flex items-center justify-center text-5xl">📝</div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 flex-wrap mb-3">
                    <span className="text-[10.5px] font-bold tracking-widest uppercase bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock size={10} />{post.readTime} min
                    </span>
                  </div>
                  <h3 className="font-serif text-[1.2rem] font-semibold leading-snug mb-3 flex-1 hover:text-gold transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-[13px] text-gray-400 font-light leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-400">{post.author}</span>
                    <Link to={`/blog/${post.slug}`}
                      className="text-[12px] font-bold text-gold uppercase tracking-widest hover:underline">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {list.length === 0 && (
            <div className="text-center py-20 text-gray-400">No posts in this category yet.</div>
          )}
        </div>
      </section>
    </>
  );
}
