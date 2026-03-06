import { ChevronRight } from 'lucide-react';

export function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'text-gold' : 'text-gray-200'}>★</span>
      ))}
    </div>
  );
}

export function PageHero({ label, title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5 flex-wrap">
            {breadcrumbs.map((bc, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={11} className="text-gold/50" />}
                <span className={i === breadcrumbs.length - 1 ? 'text-gold font-semibold' : ''}>{bc}</span>
              </span>
            ))}
          </nav>
        )}
        {label && <div className="section-tag">{label}</div>}
        <h1
          className="font-serif font-light text-[clamp(2.8rem,5vw,5rem)] leading-tight mb-4"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <p className="text-gray-500 text-[15px] max-w-xl leading-relaxed font-light">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
