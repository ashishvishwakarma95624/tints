import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data';

export default function BlogPost() {
  const { slug } = useParams();
  const post     = BLOG_POSTS.find(p => p.slug === slug);
  const related  = post ? BLOG_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3) : [];

  if (!post) return (
    <div className="pt-24 text-center py-20">
      <h2 className="font-serif text-3xl mb-4">Post Not Found</h2>
      <Link to="/blog" className="btn-primary">Back to Blog</Link>
    </div>
  );

  return (
    <article className="pt-[66px]">
      {/* Header */}
      <div className="bg-ink text-white py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-gold text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center flex-wrap gap-3 mb-6">
            <span className="text-[11px] font-bold tracking-[.18em] uppercase text-gold border border-gold/40 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-white/35">
              <Clock size={11} />{post.readTime} min read
            </span>
          </div>
          <h1 className="font-serif font-light text-[clamp(2.2rem,4.5vw,3.5rem)] leading-tight mb-6">{post.title}</h1>
          <p className="text-white/50 text-[15px] leading-relaxed font-light mb-8">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-[12.5px] text-white/35">
            <div className="w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center font-bold text-sm">
              {post.author[0]}
            </div>
            <span>{post.author}</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 py-16">
        <div className="prose-ce" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-[12px] font-medium px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-gray-100 flex gap-3 flex-wrap">
          <Link to="/blog" className="btn-outline"><ArrowLeft size={14} /> All Posts</Link>
          <Link to="/contact" className="btn-primary">Get a Quote <ArrowRight size={13} /></Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <h2 className="font-serif text-3xl font-light mb-8">Related <em className="text-gold not-italic">Articles</em></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(p => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <span className="text-[10.5px] font-bold tracking-widest uppercase bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold mt-3 mb-2 hover:text-gold transition-colors leading-snug">
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="text-[12.5px] text-gray-400 font-light line-clamp-2">{p.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
