import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Stars } from '../components/ui';
import mainimg from '../assets/images/main-img.png';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const whyUsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const processRef = useRef(null);
  const sliderRef = useRef(null);
  const slideIntervalRef = useRef(null);
  const slideContentRef = useRef(null);

  // Hero slider images with content
  const sliderImages = [
    {
      url: 'https://images.pexels.com/photos/11799967/pexels-photo-11799967.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Precision Window Tinting',
      subtitle: 'Professional Grade Films',
      description: 'Advanced ceramic and carbon films for maximum heat rejection and UV protection.',
      cta: 'Explore Tinting',
      link: '/services/window-tint'
    },
    {
      url: 'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Custom Vehicle Wraps',
      subtitle: 'Transform Your Ride',
      description: 'Full color changes, commercial wraps, and custom designs using premium 3M materials.',
      cta: 'View Wrap Options',
      link: '/services/vehicle-wrap'
    },
    {
      url: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Ceramic Coating',
      subtitle: 'Ultimate Paint Protection',
      description: 'Graphene-infused ceramic coatings that last years, not months. Superior gloss and protection.',
      cta: 'Protect Your Paint',
      link: '/services/ceramic-coating'
    },
    {
      url: 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Commercial Signage',
      subtitle: 'Make Your Brand Stand Out',
      description: 'Custom signs, vinyl lettering, and building wraps that command attention.',
      cta: 'Brand Your Business',
      link: '/services/office-signs'
    },
    {
      url: 'https://images.pexels.com/photos/14733637/pexels-photo-14733637.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Custom 3D Printing',
      subtitle: 'Bring Ideas to Life',
      description: 'Rapid prototyping and production of custom parts in various materials.',
      cta: 'Start Printing',
      link: '/services/3d-printing'
    }
  ];

  // Service image URLs
  const serviceImages = {
    'Window Tint': 'https://images.pexels.com/photos/11799967/pexels-photo-11799967.jpeg?auto=compress&cs=tinysrgb&w=800',
    'PPF': 'https://images.pexels.com/photos/11799967/pexels-photo-11799967.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Ceramic Coating': 'https://images.pexels.com/photos/11799967/pexels-photo-11799967.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Wrap': 'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Office Signs and Vinyl Stickers': 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Tire Swap': 'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Commercial and House Tints': 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
    '3D Prints': 'https://images.pexels.com/photos/14733637/pexels-photo-14733637.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Handyman': 'https://images.pexels.com/photos/14733637/pexels-photo-14733637.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Car Detailing': 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Car Custom Kits Installation': 'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=800'
  };

  // Service data with images and descriptions
  const allServices = [
    {
      id: 1,
      name: 'Window Tint',
      slug: 'window-tint',
      icon: '🪟',
      shortDesc: 'Professional window tinting for heat reduction and privacy',
      price: 299,
      image: serviceImages['Window Tint']
    },
    {
      id: 2,
      name: 'PPF',
      slug: 'paint-protection-film',
      icon: '🛡️',
      shortDesc: 'Paint protection film to shield your vehicle from debris',
      price: 899,
      image: serviceImages['PPF']
    },
    {
      id: 3,
      name: 'Ceramic Coating',
      slug: 'ceramic-coating',
      icon: '✨',
      shortDesc: 'Nano-ceramic protection for lasting shine and protection',
      price: 799,
      image: serviceImages['Ceramic Coating']
    },
    {
      id: 4,
      name: 'Wrap',
      slug: 'vehicle-wrap',
      icon: '🎨',
      shortDesc: 'Full or partial vehicle wraps for custom look and protection',
      price: 2499,
      image: serviceImages['Wrap']
    },
    {
      id: 5,
      name: 'Office Signs and Vinyl Stickers',
      slug: 'office-signs',
      icon: '🏢',
      shortDesc: 'Custom signage and vinyl graphics for business branding',
      price: 149,
      image: serviceImages['Office Signs and Vinyl Stickers']
    },
    {
      id: 6,
      name: 'Tire Swap',
      slug: 'tire-swap',
      icon: '🛞',
      shortDesc: 'Quick and professional tire change and balancing',
      price: 79,
      image: serviceImages['Tire Swap']
    },
    {
      id: 7,
      name: 'Commercial and House Tints',
      slug: 'commercial-tints',
      icon: '🏠',
      shortDesc: 'Energy-efficient window films for buildings',
      price: 399,
      image: serviceImages['Commercial and House Tints']
    },
    {
      id: 8,
      name: '3D Prints',
      slug: '3d-printing',
      icon: '🖨️',
      shortDesc: 'Custom 3D printing for parts and prototypes',
      price: 49,
      image: serviceImages['3D Prints']
    },
    {
      id: 9,
      name: 'Handyman',
      slug: 'handyman',
      icon: '🔧',
      shortDesc: 'Professional handyman services for various repairs',
      price: 99,
      image: serviceImages['Handyman']
    },
    {
      id: 10,
      name: 'Car Detailing',
      slug: 'car-detailing',
      icon: '🧼',
      shortDesc: 'Complete interior and exterior detailing service',
      price: 199,
      image: serviceImages['Car Detailing']
    },
    {
      id: 11,
      name: 'Car Custom Kits Installation',
      slug: 'custom-kit',
      icon: '⚙️',
      shortDesc: 'Expert installation of custom car accessories and kits',
      price: 299,
      image: serviceImages['Car Custom Kits Installation']
    }
  ];

  // Testimonials data
  const testimonialsData = [
    {
      id: 1,
      name: 'John Smith',
      rating: 5,
      review: 'Absolutely incredible work on my Tesla. The PPF installation is flawless and you cant even tell its there. Highly recommend!',
      service: 'PPF Installation'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 5,
      review: 'The ceramic coating on my truck has been a game changer. Water beads off like magic and the shine is incredible.',
      service: 'Ceramic Coating'
    },
    {
      id: 3,
      name: 'Michael Chen',
      rating: 5,
      review: 'Had my office windows tinted and signage installed. Professional, quick, and looks amazing. Will definitely use again.',
      service: 'Commercial Tinting'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      rating: 5,
      review: 'They transformed my old car with a full wrap. Looks better than new! The attention to detail is unmatched.',
      service: 'Vehicle Wrap'
    },
    {
      id: 5,
      name: 'David Williams',
      rating: 5,
      review: 'Fast tire swap service and they even noticed a nail in one of my tires. Saved me from a potential blowout.',
      service: 'Tire Swap'
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      rating: 5,
      review: 'The 3D printed parts they made for my project were perfect. Great communication and fast turnaround.',
      service: '3D Printing'
    }
  ];

  // Animate slide content
  const animateSlideContent = (direction = 'next') => {
    if (slideContentRef.current) {
      const content = slideContentRef.current.children;
      
      // Kill any existing animations
      gsap.killTweensOf(content);
      
      // Set initial state based on direction
      gsap.set(content, {
        opacity: 0,
        y: direction === 'next' ? 50 : -50,
        x: 0
      });
      
      // Animate in
      gsap.to(content, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all"
      });
    }
  };

  // Slider navigation functions - renamed to avoid conflict
  const handleNextSlide = () => {
    setPrevSlideIndex(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    animateSlideContent('next');
    resetInterval();
  };

  const handlePrevSlide = () => {
    setPrevSlideIndex(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    animateSlideContent('prev');
    resetInterval();
  };

  const handleGoToSlide = (index) => {
    setPrevSlideIndex(currentSlide);
    setCurrentSlide(index);
    animateSlideContent(index > currentSlide ? 'next' : 'prev');
    resetInterval();
  };

  const resetInterval = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    slideIntervalRef.current = setInterval(() => {
      setPrevSlideIndex(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      animateSlideContent('next');
    }, 5000);
  };

  // Initialize animations and slider
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Start auto-slide
    slideIntervalRef.current = setInterval(() => {
      setPrevSlideIndex(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      animateSlideContent('next');
    }, 5000);

    return () => {
      clearTimeout(timer);
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, []);

  // Run animations when isLoaded becomes true
  useEffect(() => {
    if (!isLoaded) return;

    const animationTimer = setTimeout(() => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Hero section animation
      if (heroRef.current) {
        gsap.set(heroRef.current.children, { opacity: 0, y: 20 });
        gsap.to(heroRef.current.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          clearProps: "all"
        });
      }

      // Services section animations
      gsap.set('.service-card', { opacity: 0, y: 50 });
      gsap.to('.service-card', {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          once: false
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });

      // Why Us section animations
      gsap.set('.why-us-item', { opacity: 0, x: -30 });
      gsap.to('.why-us-item', {
        scrollTrigger: {
          trigger: whyUsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          once: false
        },
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all"
      });

      // Testimonials animations
      gsap.set('.testimonial-card', { opacity: 0, scale: 0.9 });
      gsap.to('.testimonial-card', {
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          once: false
        },
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        clearProps: "all"
      });

      // Process section animations
      gsap.set('.process-step', { opacity: 0, y: 40 });
      gsap.to('.process-step', {
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          once: false
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
      });
    }, 200);

    return () => {
      clearTimeout(animationTimer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded]);

  return (
    <>
      {/* Initial visibility style */}
      <style jsx>{`
        .service-card, .why-us-item, .testimonial-card, .process-step {
          opacity: 1 !important;
          visibility: visible !important;
        }
      `}</style>

      {/* ── HERO WITH SLIDER ────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-[#05070B] overflow-hidden">
        {/* Slider Images */}
        <div ref={sliderRef} className="absolute inset-0">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105"
                style={{ 
                  backgroundImage: `url(${image.url})`,
                  transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/90 to-[#05070B]/70" />
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#0F1726]/80 border-2 border-[#009fff]/30 flex items-center justify-center text-white hover:bg-[#009fff] hover:text-[#05070B] transition-all group backdrop-blur-sm"
        >
          <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#0F1726]/80 border-2 border-[#009fff]/30 flex items-center justify-center text-white hover:bg-[#009fff] hover:text-[#05070B] transition-all group backdrop-blur-sm"
        >
          <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleGoToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-10 h-2.5 bg-[#009fff] rounded-full'
                  : 'w-2.5 h-2.5 bg-[#f7f8f9]/30 rounded-full hover:bg-[#009fff]/50'
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div ref={heroRef} className="relative z-20 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              {/* Section Tag - Static */}
              <div className="section-tag text-[#009fff] mb-6">
                Premium Auto & Commercial Services
              </div>
              
              {/* Dynamic Slide Content */}
              <div ref={slideContentRef} className="space-y-6">
                {/* Slide Title */}
                <h1 className="font-serif font-light text-[clamp(3rem,5vw,5rem)] leading-[1.1] text-white">
                  {sliderImages[currentSlide].title}
                </h1>
                
                {/* Slide Subtitle */}
                <p className="text-[18px] md:text-[20px] text-[#009fff] font-semibold tracking-wide">
                  {sliderImages[currentSlide].subtitle}
                </p>
                
                {/* Slide Description */}
                <p className="text-[16px] md:text-[17px] text-[#f7f8f9] leading-relaxed font-light max-w-xl">
                  {sliderImages[currentSlide].description}
                </p>
                
                {/* Slide CTA Button */}
                <div className="pt-4">
                  <Link 
                    to={sliderImages[currentSlide].link}
                    className="group bg-[#009fff] text-[#05070B] px-8 py-4 rounded-md font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 hover:shadow-lg hover:shadow-[#009fff]/30 transition-all"
                  >
                    {sliderImages[currentSlide].cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES WITH IMAGES ─────────────────────────────────────── */}
      <section ref={servicesRef} className="py-24 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="section-tag text-[#009fff]">What We Do</div>
              <h2 className="font-serif font-light text-5xl text-white">All Services <em className="text-[#009fff] not-italic">Under One Roof</em></h2>
            </div>
            <Link to="/services" className="hidden sm:block border-2 border-[#009fff] text-[#009fff] px-6 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider hover:bg-[#009fff]/10 transition-all">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allServices.map(service => (
              <Link 
                key={service.id} 
                to={`/services/${service.slug}`}
                className="service-card group bg-[#0F1726] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_#009fff] hover:scale-[1.02]"
                style={{ opacity: 1, visibility: 'visible' }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1607863680198-23d4b2825ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1726] to-transparent opacity-60" />
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#05070B]/80 flex items-center justify-center text-xl backdrop-blur-sm border-2 border-[#009fff]/30">
                    {service.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-xl font-semibold mb-2 text-white">{service.name}</h4>
                  <p className="text-[13px] text-[#f7f8f9] leading-relaxed font-light mb-3 line-clamp-2">{service.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold tracking-widest uppercase text-[#009fff]">
                      From ${service.price}
                    </span>
                    <span className="text-[#009fff] opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Featured Quote Card */}
            <div className="service-card bg-[#05070B] rounded-xl p-6 flex flex-col justify-between min-h-[320px] border-2 border-[#009fff]/20 hover:shadow-[0_0_25px_#009fff] transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#009fff]/10 flex items-center justify-center mb-4">
                  <span className="text-[#009fff] text-2xl">“</span>
                </div>
                <p className="font-serif text-lg text-white italic leading-snug mb-4">"Every detail matters. We treat your vehicle like it's our own."</p>
                <p className="text-[#f7f8f9] text-xs">— Master Technician</p>
              </div>
              <Link to="/contact" className="bg-[#009fff] text-[#05070B] px-4 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#009fff]/30 transition-all w-full">
                Book Now <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section ref={whyUsRef} className="py-24 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="section-tag text-[#009fff]">Why Choose Us</div>
            <h2 className="font-serif font-light text-5xl mb-6 text-white">Built On <em className="text-[#009fff] not-italic">Excellence</em></h2>
            <p className="text-[#f7f8f9] leading-relaxed font-light mb-8 text-[15px] max-w-md">
              We never cut corners. Every project receives meticulous care and premium materials — from a single sticker to a full commercial installation.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 border-2 border-[#009fff] text-[#009fff] text-[12px] font-bold uppercase tracking-[.15em] px-6 py-3 rounded hover:bg-[#009fff]/10 transition-all">
              About Our Team <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {[['01','Premium Materials Only','We source only from 3M, XPEL, Llumar and other industry leaders.'],
              ['02','Certified Technicians','Every member holds professional certifications with years of hands-on experience.'],
              ['03','Warranty on All Work','Every service is backed by our satisfaction guarantee and manufacturer warranties.'],
              ['04','Fast Turnaround','Most jobs completed same day or within 24 hours without sacrificing quality.'],
            ].map(([n,t,d]) => (
              <div key={n} className="why-us-item flex gap-5 p-5 bg-[#0F1726] rounded-lg hover:shadow-[0_0_15px_#009fff] transition-all duration-300 group">
                <div className="font-serif text-3xl font-light text-[#009fff] group-hover:text-[#009fff]/70 transition-colors leading-none w-10 shrink-0 pt-0.5">{n}</div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-[14.5px]">{t}</h4>
                  <p className="text-[#f7f8f9] text-[13px] font-light leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section ref={testimonialsRef} className="py-24 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#009fff]" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff]">Client Reviews</span>
              <span className="w-8 h-px bg-[#009fff]" />
            </div>
            <h2 className="font-serif font-light text-5xl text-white">What Our <em className="text-[#009fff] not-italic">Clients Say</em></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonialsData.map(t => (
              <div key={t.id} className="testimonial-card bg-[#0F1726] border-2 border-[#0F1726] rounded-xl p-7 hover:shadow-[0_0_25px_#009fff] hover:border-[#009fff]/20 transition-all duration-300">
                <Stars rating={t.rating} />
                <p className="font-serif text-[1.05rem] italic text-white leading-relaxed my-4">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#0A0F1C]">
                  <div className="w-9 h-9 rounded-full bg-[#009fff] text-[#05070B] flex items-center justify-center font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-[13px] text-white">{t.name}</div>
                    <div className="text-[12px] text-[#f7f8f9]">{t.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section ref={processRef} className="py-24 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#009fff]" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff]">How It Works</span>
              <span className="w-8 h-px bg-[#009fff]" />
            </div>
            <h2 className="font-serif font-light text-5xl text-white">Simple Process, <em className="text-[#009fff] not-italic">Exceptional Results</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="absolute top-9 left-[12%] right-[12%] h-px bg-[#0F1726] hidden lg:block" />
            {[['1','Request a Quote','Fill out our short form — honest pricing within hours.'],
              ['2','Consultation','We review your vehicle or space and recommend the best approach.'],
              ['3','Expert Install','Certified technicians perform the work in our clean facility.'],
              ['4','Delivery & Care','We walk you through aftercare so your investment lasts years.'],
            ].map(([n,t,d]) => (
              <div key={n} className="process-step text-center relative z-10">
                <div className="w-[72px] h-[72px] rounded-full bg-[#0F1726] border-2 border-[#0F1726] flex items-center justify-center mx-auto mb-6 font-serif text-2xl font-semibold text-[#009fff] hover:shadow-[0_0_20px_#009fff] transition-all duration-300 cursor-default">
                  {n}
                </div>
                <h4 className="font-serif text-xl font-semibold mb-2.5 text-white">{t}</h4>
                <p className="text-[13px] text-[#f7f8f9] font-light leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A0F1C] text-center">
        <div className="max-w-2xl mx-auto px-5">
          <blockquote className="font-serif font-light text-[clamp(1.7rem,3.5vw,2.8rem)] italic leading-tight mb-8 text-white">
            "We protect what you've invested in — and make it look better than the day you bought it."
          </blockquote>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#05070B] text-white text-[12px] font-bold uppercase tracking-[.15em] px-8 py-4 rounded hover:shadow-[0_0_25px_rgba(0,159,255,0.3)] transition-all duration-200">
            Request a Free Quote <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </>
  );
}