import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center text-center px-5">
      <div>
        <div className="font-serif text-[9rem] font-light leading-none text-gray-100 select-none">404</div>
        <h2 className="font-serif text-4xl font-light mb-4">Page <em className="text-gold not-italic">Not Found</em></h2>
        <p className="text-gray-400 font-light mb-10 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/contact" className="btn-outline">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
