import React, { useRef, useState, useEffect } from 'react';
import { NAV_ITEMS, SERVICES, PROCESS_STEPS, BUSINESSES, PROJECTS, STATS, TESTIMONIALS } from './constants';
import { SectionHeader } from './components/SectionHeader';
import { getProjectConsultation } from './services/geminiService';
import emailjs from '@emailjs/browser';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [consultationText, setConsultationText] = useState('');
  const [activeProject, setActiveProject] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    emailjs
      .sendForm('service_ttqedd6', 'template_elslh0u', formRef.current!, 'fs5ICdQXyxyemSoaY')
      .then(
        () => { setStatus('success'); setLoading(false); formRef.current?.reset(); },
        () => { setStatus('error'); setLoading(false); }
      );
  };

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationText.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    const result = await getProjectConsultation(consultationText);
    setAiResponse(result);
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-orange-200">

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-[#1A1D23] py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className={`text-2xl md:text-3xl brand-font font-bold tracking-tight lowercase flex items-baseline leading-none ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              salptech<span className="text-orange-500">.</span>
            </span>
            <span className={`text-[8px] uppercase tracking-[0.2em] font-medium hidden md:block ${isScrolled ? 'text-gray-500' : 'text-gray-400'}`}>
              Built on Action, Strength, Vision and Value
            </span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  isScrolled ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-orange-200"
            >
              Free Estimate
            </a>
          </div>

          <button
            className={`md:hidden text-2xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b absolute top-full left-0 right-0 p-6 flex flex-col space-y-4 shadow-xl">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg font-medium text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-orange-500 text-white px-6 py-3 rounded-xl text-center font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Free Estimate
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section id="home" className="relative bg-[#1A1D23] min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-orange-500 rounded-full"></div>
          <div className="absolute top-[60%] left-[45%] w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-[20%] left-[5%] w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute top-[10%] right-[15%] w-4 h-4 bg-teal-400 rounded-full"></div>
          <div className="bg-grid-pattern w-full h-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 py-20">
          <div className="lg:w-1/2 text-white">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">Now Accepting New Clients</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8">
              Get More Customers
              with a <br /><span className="text-orange-500">High-Converting Website</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed">
              We help local businesses like pest control, clinics, and salons get more leads
              through fast, modern, and SEO-optimized websites.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#contact" className="accent-gradient px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center group">
                Get Free Consultation
                <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
              <a href="#work" className="border border-gray-700 hover:bg-gray-800 px-8 py-4 rounded-full font-bold text-lg transition-all text-center">
                See Our Work
              </a>
            </div>

            {/* Mini trust bar */}
            <div className="flex items-center gap-6 flex-wrap">
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-black text-white">{s.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="rounded-custom-image overflow-hidden h-64 shadow-2xl">
                    <img src="/hero1.webp" className="w-full h-full object-cover" alt="Team" />
                  </div>
                  <div className="bg-orange-500 p-6 rounded-3xl text-white">
                    <i className="fa-solid fa-rocket text-4xl mb-4"></i>
                    <p className="font-bold text-xl leading-tight">Smart Websites. Scalable Technology. Real Results.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#2A2E35] p-6 rounded-3xl text-white">
                    <p className="text-4xl font-black text-orange-500 mb-1">Digital Solutions.</p>
                    <p className="text-sm text-gray-400">Built for Growth. Designed to Scale.</p>
                  </div>
                  <div className="rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-[1rem] rounded-br-[1rem] overflow-hidden h-80 shadow-2xl">
                    <img src="/hero2.webp" className="w-full h-full object-cover" alt="App" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────────────────────────────────────── */}
      <section className="bg-orange-500 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-black mb-1">{s.value}</p>
                <p className="text-orange-100 text-sm uppercase tracking-widest font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Businesses We Help Grow ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Who We Serve</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4">
              Businesses We Help Grow 🚀
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              We specialise in building websites for local service businesses that need real, measurable results — not just a pretty page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BUSINESSES.map((biz) => (
              <div
                key={biz.id}
                className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden">
                  <img
                    src={biz.image}
                    alt={biz.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback gradient if image not yet available
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Fallback shown behind image in case of error */}
                  <div className={`absolute inset-0 h-52 ${biz.accentBg} flex items-center justify-center -z-10`}>
                    <i className={`fa-solid ${biz.icon} text-6xl ${biz.accentColor} opacity-30`}></i>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className={`w-10 h-10 ${biz.accentBg} ${biz.accentColor} rounded-xl flex items-center justify-center mb-3 text-lg`}>
                    <i className={`fa-solid ${biz.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{biz.name}</h3>
                  <p className="text-gray-500 text-sm">{biz.tagline}</p>
                </div>

                {/* Bottom accent bar on hover */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-orange-500 transition-all duration-500 rounded-b-3xl"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">Don't see your industry? We work with all local businesses.</p>
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#1A1D23] text-white px-8 py-4 rounded-full font-bold hover:bg-orange-500 transition-all">
              Let's Talk
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ── Approach Section ────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/4">
              <h3 className="text-4xl font-bold leading-tight">
                Our <br /> Approach
              </h3>
            </div>
            <div className="md:w-3/4">
              <h4 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
                We Make Every Project Feel Personal because{' '}
                <span className="text-orange-500 underline decoration-2 underline-offset-8">Our Clients Matter.</span>{' '}
                <span className="text-teal-400"><i className="fa-solid fa-check"></i></span>
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <h5 className="text-xl font-bold mb-4">Flawless UI/UX</h5>
              <p className="text-gray-500 leading-relaxed mb-8">
                An exceptional user experience is essential for a product to work. We strive to deliver outstanding journeys for your customers.
              </p>
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-teal-500 group-hover:text-teal-500 transition-all">
                <i className="fa-solid fa-arrow-right -rotate-45"></i>
              </div>
            </div>

            <div className="bg-orange-500 p-10 rounded-[3rem] shadow-xl text-white transform md:-translate-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-2xl">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h5 className="text-xl font-bold mb-4">Custom Graphics</h5>
              <p className="text-orange-50 leading-relaxed mb-8">
                A unique design aligned with your brand personality — one that stands out and makes a lasting first impression.
              </p>
              <div className="w-10 h-10 rounded-full bg-white text-orange-500 flex items-center justify-center">
                <i className="fa-solid fa-arrow-right -rotate-45"></i>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <i className="fa-solid fa-code"></i>
              </div>
              <h5 className="text-xl font-bold mb-4">Best Developers</h5>
              <p className="text-gray-500 leading-relaxed mb-8">
                Professionals on every project offering clean code, quality architecture, and dedicated maintenance after launch.
              </p>
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-purple-500 group-hover:text-purple-500 transition-all">
                <i className="fa-solid fa-arrow-right -rotate-45"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ────────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="Our Services"
            title="What we can do for your business"
            description="We provide comprehensive digital solutions tailored to your specific needs, helping you grow from startup to market leader."
            align="center"
          />
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-8 rounded-3xl border border-gray-200 shadow-sm hover:border-orange-300 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${service.bgColor} ${service.color} rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {['Scalable Architecture', 'SEO Optimized', 'Mobile First'].map((item) => (
                    <li key={item} className="flex items-center text-sm text-gray-500">
                      <i className="fa-solid fa-circle-check text-green-500 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
 
            {/* CTA Card */}
            <div className="p-8 rounded-3xl accent-gradient text-white flex flex-col justify-center items-center text-center">
              <h4 className="text-2xl font-bold mb-4">Have a special project?</h4>
              <p className="mb-8 text-orange-50">Tell us your vision and we'll help you bring it to life with our expertise.</p>
              <a href="#contact" className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all">
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Work / Portfolio ────────────────────────────────────────────── */}
      {/*
      <section id="work" className="py-24 bg-[#1A1D23]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4">Our Work</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Real projects. Real results. Here's what we've built for businesses like yours.
            </p>
          </div>

          {PROJECTS.length > 0 && (
            <div className="max-w-5xl mx-auto">
             
              {PROJECTS.length > 1 && (
                <div className="flex flex-wrap gap-3 justify-center mb-10">
                  {PROJECTS.map((proj, idx) => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProject(idx)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeProject === idx
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {proj.title}
                    </button>
                  ))}
                </div>
              )}

              
              {PROJECTS.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`transition-all duration-300 ${activeProject === idx ? 'block' : 'hidden'}`}
                >
                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
                   
                    <div className="relative bg-gray-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top"
                      />
                     
                      <div className="absolute top-4 left-4 bg-[#1A1D23]/80 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-sm">
                        {proj.category}
                      </div>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-600 transition-all"
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          Live Site
                        </a>
                      )}
                    </div>

                   
                    <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">{proj.client}</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{proj.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">{proj.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {proj.tags.map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                          <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <h4 className="font-bold text-gray-800 text-lg mb-2">Project Outcome</h4>
                        <p className="text-green-700 font-semibold text-base leading-relaxed">{proj.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a href="#contact" className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              Start Your Project
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
      */}

      {/* ── Process Section ─────────────────────────────────────────────────── */}
      <section id="process" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="How we work"
            title="A simple, yet effective process"
            description="Our structured approach ensures transparency, efficiency, and exceptional quality from day one."
          />

          <div className="relative mt-20">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className="group">
                  <div className="w-24 h-24 bg-gray-900 border-2 border-gray-800 rounded-full flex items-center justify-center text-3xl font-extrabold text-white transition-all mb-8 shadow-lg mx-auto lg:mx-0 group-hover:bg-orange-500 group-hover:border-orange-500">
  {step.number}
</div>
                  <h5 className="text-xl font-bold mb-4">{step.title}</h5>
                  <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      {TESTIMONIALS.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Client Love</span>
              <h2 className="text-4xl font-extrabold mt-4">What Our Clients Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all">
                  {/* Stars */}
                  <div className="flex gap-1 text-orange-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-sm"></i>
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-8 text-lg italic">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    {/* Avatar with image or initials fallback */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-lg flex-shrink-0">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <span className="absolute">
                        {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{t.name}</p>
                      <p className="text-gray-500 text-sm">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why Choose Us ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="relative">
                <img src="/whychoose.webp" className="rounded-[4rem] shadow-2xl" alt="Office" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <SectionHeader
                badge="Why choose us"
                title="Building the bridge between technology and business"
              />
              <div className="space-y-6">
                {[
                  { title: 'Built for Local Businesses', desc: 'We understand how to attract customers in your area with hyper-local SEO and targeted copy.' },
                  { title: 'Fast Delivery', desc: 'Get your website live in 5–7 days so you start converting visitors without delay.' },
                  { title: 'Affordable Pricing', desc: 'High quality solutions at startup-friendly prices — no hidden charges, ever.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h6 className="text-xl font-bold mb-2">{item.title}</h6>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1A1D23] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="bg-grid-pattern w-full h-full"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Ready to grow your <span className="text-orange-500">business?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Join the businesses we've already helped. Get a free consultation — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl shadow-orange-500/30 inline-flex items-center justify-center gap-2">
              Get Free Consultation
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="tel:+918610042672" className="border border-gray-700 hover:bg-gray-800 text-white px-10 py-5 rounded-full font-bold text-lg transition-all inline-flex items-center justify-center gap-2">
              <i className="fa-solid fa-phone"></i>
              +91 86100 42672
            </a>
            <a href="tel:+917604903279" className="border border-gray-700 hover:bg-gray-800 text-white px-10 py-5 rounded-full font-bold text-lg transition-all inline-flex items-center justify-center gap-2">
              <i className="fa-solid fa-phone"></i>
              +91 76049 03279
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Section ─────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-[#1A1D23] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Contact Us</span>
              <h2 className="text-5xl font-extrabold mt-6 mb-10 leading-tight">
                Ready to get more customers <br /> for your business?
              </h2>

              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 text-2xl">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Us</p>
                    <p className="text-xl font-bold">salptechindia@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 text-2xl">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call Us</p>
                    <p className="text-xl font-bold">+91 86100 42672</p>
                    <p className="text-xl font-bold">+91 76049 03279</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 text-2xl">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Visit Us</p>
                    <p className="text-xl font-bold">Kolathur, Chennai, Tamil Nadu</p>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest font-bold">We Typically Respond Within</p>
                <p className="text-3xl font-black text-orange-500">2 Hours</p>
                <p className="text-gray-500 text-sm mt-1">during business hours (Mon–Sat, 9AM–11PM IST)</p>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 md:p-14 text-gray-900 shadow-2xl">
              <h3 className="text-2xl font-extrabold mb-2">Send Us a Message</h3>
              <p className="text-gray-500 mb-8">Fill in your details and we'll reach out with a free plan for your business.</p>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-semibold">
                    ✅ Your inquiry has been sent successfully. We'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-semibold">
                    ❌ Something went wrong. Please try again later.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Project Type</label>
                  <select
                    name="project"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>UI/UX Design</option>
                    <option>E-commerce</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Tell us more about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all
                    ${loading ? 'bg-orange-400 cursor-not-allowed' : 'accent-gradient hover:shadow-orange-200 shadow-xl'}`}
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Inquiry'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="py-12 bg-[#14171C] text-gray-500 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col">
            <span className="text-white text-3xl brand-font font-bold tracking-tight lowercase">
              salptech<span className="text-orange-500">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400 mt-1">
              built on action, strength, vision and value
            </span>
          </div>

          <div className="text-xs uppercase tracking-widest">
            © 2025 SalpTech India. All Rights Reserved.
          </div>

          <div className="flex space-x-8 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;