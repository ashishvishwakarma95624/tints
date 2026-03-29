import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, Award, Users, Target } from 'lucide-react';
import { PageHero } from '../components/ui';
import mainimg from '../assets/images/main-img.png';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const ctx = gsap.context(() => {
      // Story section animation
      gsap.from(storyRef.current?.querySelectorAll('.animate-item'), {
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Stats counter animation
      gsap.from(statsRef.current?.children || [], {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });

      // Values cards animation
      gsap.from('.value-card', {
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Timeline animation
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });

      // Team cards animation
      gsap.from('.team-card', {
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)"
      });

    }, [storyRef, valuesRef, teamRef, statsRef, timelineRef]);

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Timeline data
  const timeline = [
    {
      year: '2016',
      title: 'The Beginning',
      description: 'Started as a two-person window tinting operation in a single bay garage.',
      icon: '🌱'
    },
    {
      year: '2018',
      title: 'Expansion',
      description: 'Moved to first official shop space and added PPF services.',
      icon: '🏢'
    },
    {
      year: '2020',
      title: 'Full Service',
      description: 'Expanded to include ceramic coating, wraps, and commercial services.',
      icon: '✨'
    },
    {
      year: '2022',
      title: 'Team Growth',
      description: 'Grew to 8 certified technicians and added 3D printing capabilities.',
      icon: '👥'
    },
    {
      year: '2024',
      title: 'Industry Leaders',
      description: 'Recognized as top-rated auto spa with 500+ satisfied clients.',
      icon: '🏆'
    },
    {
      year: 'Current',
      title: 'Innovation Hub',
      description: 'State-of-the-art facility offering 11+ premium services under one roof.',
      icon: '⚡'
    }
  ];

  return (
    <>
      {/* Story Section */}
      <section ref={storyRef} className="py-24 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <div className="animate-item section-tag text-[#009fff]">Who We Are</div>
            <h2 className="animate-item font-serif font-light text-5xl text-white mb-6">More Than <em className="text-[#009fff] not-italic">A Shop</em></h2>
            <p className="animate-item text-[#f7f8f9] leading-relaxed font-light text-[15px]">
              Dsp-Tints started as a two-person window tinting operation out of a single bay garage. Over eight years, we've grown into a full-service auto, commercial, and residential surface treatment company trusted by hundreds of clients.
            </p>
            <p className="animate-item text-[#f7f8f9] leading-relaxed font-light text-[15px]">
              We expanded because clients kept asking — "can you do wraps too?" "Can you tint my office?" Today we say yes to all of it, with the same obsessive attention to detail that got us here.
            </p>
            
            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-4 gap-6 pt-8 border-t border-[#009fff]/20">
              {[
                ['500+','Happy Clients'],
                ['11','Services'],
                ['8yr','In Business'],
                ['100%','Satisfaction']
              ].map(([n,l]) => (
                <div key={l} className="text-center">
                  <div className="font-serif text-3xl font-semibold text-[#009fff]">{n}</div>
                  <div className="text-[10.5px] text-[#f7f8f9] tracking-widest uppercase mt-1.5 font-medium">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Card */}
          <div className="rounded-2xl aspect-[4/3] flex items-end p-8 relative overflow-hidden group">
            <div 
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{ 
                backgroundImage: `url(${mainimg})`, 
                backgroundSize: "cover",
                backgroundPosition: "center"
              }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10">
              <p className="font-serif text-2xl text-white/90 italic mb-5">"Excellence in every detail."</p>
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff] bg-[#05070B]/50 px-4 py-2 rounded-full backdrop-blur-sm">
                Est. 2016
              </span>
            </div>
            
            <div className="absolute top-7 right-7 bg-[#0F1726] rounded-xl px-4 py-3 z-10 shadow-lg border border-[#009fff]/20">
              <div className="text-[9.5px] text-[#f7f8f9] uppercase tracking-widest">Founded</div>
              <div className="font-serif text-xl font-semibold text-white">2016</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Our Path 2016 to Current */}
      <section ref={timelineRef} className="py-24 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#009fff]" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff]">Our Journey</span>
              <span className="w-8 h-px bg-[#009fff]" />
            </div>
            <h2 className="font-serif font-light text-5xl text-white">The Path From <em className="text-[#009fff] not-italic">2016 to Today</em></h2>
            <p className="text-[#f7f8f9] mt-4 max-w-2xl mx-auto">Eight years of growth, learning, and excellence</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#009fff] to-[#007BFF] hidden lg:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`timeline-item flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                  <div className="flex-1 text-center lg:text-right">
                    <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <span className="inline-block text-4xl mb-3">{item.icon}</span>
                      <h3 className="text-3xl font-bold text-[#009fff] mb-2">{item.year}</h3>
                      <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-[#f7f8f9] max-w-md mx-auto lg:mx-0">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#009fff] flex items-center justify-center text-[#05070B] font-bold text-lg shadow-lg shadow-[#009fff]/30">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: <Calendar />, value: '8+', label: 'Years' },
              { icon: <Users />, value: '500+', label: 'Clients' },
              { icon: <Award />, value: '11', label: 'Services' },
              { icon: <Target />, value: '100%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="bg-[#0F1726] rounded-xl p-6 text-center border border-[#009fff]/10 hover:border-[#009fff] transition-all group">
                <div className="text-[#009fff] mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-[#f7f8f9] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#009fff]" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff]">Our Values</span>
              <span className="w-8 h-px bg-[#009fff]" />
            </div>
            <h2 className="font-serif font-light text-5xl text-white">What Drives <em className="text-[#009fff] not-italic">Everything</em></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Precision', desc: 'We measure twice, cut once. If it\'s not perfect, we redo it.' },
              { icon: '💎', title: 'Premium Materials', desc: 'We never compromise on materials. Only industry-leading brands.' },
              { icon: '🤝', title: 'Honest Pricing', desc: 'No hidden fees, no upselling. You get the full picture upfront.' },
              { icon: '⚡', title: 'Speed', desc: 'Most jobs completed same-day or within 24 hours.' },
              { icon: '📞', title: 'Communication', desc: 'We keep you informed at every step of the process.' },
              { icon: '🌱', title: 'Improvement', desc: 'We regularly train and invest in new tools to stay ahead.' },
            ].map((item, index) => (
              <div 
                key={index} 
                className="value-card bg-[#0F1726] border border-[#009fff]/10 rounded-xl p-7 hover:shadow-[0_0_25px_rgba(0,159,255,0.3)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h4 className="font-serif text-xl font-semibold mb-2 text-white">{item.title}</h4>
                <p className="text-[13.5px] text-[#f7f8f9] font-light leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009fff] to-[#007BFF] group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#009fff]" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff]">Our Team</span>
              <span className="w-8 h-px bg-[#009fff]" />
            </div>
            <h2 className="font-serif font-light text-5xl text-white">Meet the <em className="text-[#009fff] not-italic">Experts</em></h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ['Marcus Cole','Founder & Lead Installer','Window Tint & PPF','👨‍🔧'],
              ['Sandra Lee','Senior Wrap Specialist','Wraps & Custom Kits','👩‍🎨'],
              ['James Rivera','Ceramic & Detailing Expert','Ceramic Coating & Detail','👨‍🔬'],
              ['Priya Sharma','Commercial Projects Lead','Commercial Tints & Signs','👩‍💼'],
            ].map(([name, role, spec, em], index) => (
              <div key={index} className="team-card group text-center">
                <div className="relative mb-5">
                  <div className="w-full aspect-square bg-[#0F1726] rounded-2xl flex items-center justify-center text-7xl border-2 border-[#009fff]/20 group-hover:border-[#009fff] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(0,159,255,0.3)]">
                    {em}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#009fff] text-[#05070B] text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    Expert
                  </div>
                </div>
                <h4 className="font-serif text-xl font-semibold mb-1 text-white">{name}</h4>
                <div className="text-[12px] text-[#009fff] font-semibold tracking-wide mb-1">{role}</div>
                <div className="text-[12px] text-[#f7f8f9]">{spec}</div>
              </div>
            ))}
          </div>

          {/* Team CTA */}
          <div className="text-center mt-12">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 border border-[#009fff] text-[#009fff] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#009fff] hover:text-[#05070B] transition-all group"
            >
              Join Our Team
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}