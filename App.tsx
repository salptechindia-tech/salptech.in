
import React, {useRef, useState, useEffect } from 'react';
import { NAV_ITEMS, SERVICES, PROCESS_STEPS } from './constants';
import { SectionHeader } from './components/SectionHeader';
import { getProjectConsultation } from './services/geminiService';
import emailjs from "@emailjs/browser";
const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [consultationText, setConsultationText] = useState("");
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
   const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .sendForm(
        "service_ttqedd6",
        "template_elslh0u",
        formRef.current,
        "fs5ICdQXyxyemSoaY"
      )
      .then(
        () => {
          setStatus("success");
          setLoading(false);
          formRef.current.reset();
        },
        () => {
          setStatus("error");
          setLoading(false);
        }
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
      {/* Navigation */}
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
        
        {/* Mobile Menu */}
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

      {/* Hero Section */}
      <section id="home" className="relative bg-[#1A1D23] min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-orange-500 rounded-full"></div>
          <div className="absolute top-[60%] left-[45%] w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-[20%] left-[5%] w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute top-[10%] right-[15%] w-4 h-4 bg-teal-400 rounded-full"></div>
          <div className="bg-grid-pattern w-full h-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 py-20">
          <div className="lg:w-1/2 text-white">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8">
              Discover the <br /> 
              <span className="text-orange-500">Digital Future</span> <br /> 
              We Build.
            </h1>
            <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed">
              Aside from showing our experience and skill, we craft digital products that 
              give your potential clients a clear idea of how you lead and think.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="accent-gradient px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center group">
                Get in Touch
                <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
              <a href="#services" className="border border-gray-700 hover:bg-gray-800 px-8 py-4 rounded-full font-bold text-lg transition-all text-center">
                Our Services
              </a>
            </div>
            
            
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              {/* Complex Image Layout inspired by reference */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="rounded-custom-image overflow-hidden h-64 shadow-2xl">
                    <img src="https://picsum.photos/seed/tech1/600/800" className="w-full h-full object-cover" alt="Team" />
                  </div>
                  <div className="bg-orange-500 p-6 rounded-3xl text-white">
                    <i className="fa-solid fa-rocket text-4xl mb-4"></i>
                    <p className="font-bold text-xl leading-tight">Smart Websites. Scalable Technology. Real Results.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#2A2E35] p-6 rounded-3xl text-white">
                    <p className="text-4xl font-black text-orange-500 mb-1">Digital Solutions. </p>
                    <p className="text-sm text-gray-400">Built for Growth. Designed to Scale.</p>
                  </div>
                  <div className="rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-[1rem] rounded-br-[1rem] overflow-hidden h-80 shadow-2xl">
                    <img src="https://picsum.photos/seed/tech2/600/800" className="w-full h-full object-cover" alt="App" />
                  </div>
                </div>
              </div>
            
              {/* Floating element */}
              {/*
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3 animate-bounce">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Latest Project</p>
                  <p className="text-sm font-bold text-gray-800">Deployed Successfully</p>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
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
                We Make Every Project Feel Personal because <span className="text-orange-500 underline decoration-2 underline-offset-8">Our Clients Matter.</span> <span className="text-teal-400"><i className="fa-solid fa-check"></i></span>
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
                An exceptional user experience is essential for a product to work. In this regard, we strive to deliver outstanding journeys.
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
                A unique design must align with the brand personality and stand out in the market through originality and visual balance.
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
                We have the best developers on every project. They are professionals offering code quality and maintenance after the job is done.
              </p>
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-purple-500 group-hover:text-purple-500 transition-all">
                <i className="fa-solid fa-arrow-right -rotate-45"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
                className="p-8 rounded-3xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 ${service.bgColor} ${service.color} rounded-2xl flex items-center justify-center mb-6 text-2xl`}>
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {['Scalable Architecture', 'SEO Optimized', 'Mobile First'].map(item => (
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

      {/* AI Estimator (Smart Feature) */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <i className="fa-solid fa-brain text-[20rem]"></i>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">SalpTech AI</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">Smart Project Estimation</h2>
              <p className="text-gray-400 text-lg">Describe your project briefly, and our AI consultant will provide an initial complexity analysis and strategy.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
              <form onSubmit={handleAiConsult} className="space-y-6">
                <div>
                  <textarea 
                    value={consultationText}
                    onChange={(e) => setConsultationText(e.target.value)}
                    placeholder="Example: I need a multi-vendor e-commerce app with AI-based product recommendations and real-time inventory tracking..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[150px]"
                  />
                </div>
                <div className="flex justify-center">
                  <button 
                    disabled={aiLoading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg flex items-center space-x-3"
                  >
                    {aiLoading ? (
                      <>
                        <i className="fa-solid fa-spinner animate-spin"></i>
                        <span>Analyzing with AI...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        <span>Analyze My Project</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {aiResponse && (
                <div className="mt-12 p-8 bg-orange-500/10 border border-orange-500/30 rounded-2xl animate-fade-in">
                  <h5 className="text-orange-500 font-bold mb-4 flex items-center">
                    <i className="fa-solid fa-robot mr-2"></i> SalpTech AI Strategy:
                  </h5>
                  <p className="text-gray-200 leading-relaxed text-lg italic whitespace-pre-wrap">
                    "{aiResponse}"
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center text-sm text-gray-400">
                    <i className="fa-solid fa-info-circle mr-2"></i>
                    This is an AI-generated initial assessment. Our team will verify this during our follow-up.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeader 
            badge="How we work"
            title="A simple, yet effective process"
            description="Our structured approach ensures transparency, efficiency, and exceptional quality from day one."
          />

          <div className="relative mt-20">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className="group">
                  <div className="w-24 h-24 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-3xl font-black text-gray-200 group-hover:border-orange-500 group-hover:text-orange-500 transition-all mb-8 shadow-sm group-hover:shadow-xl mx-auto lg:mx-0">
                    {step.number}
                  </div>
                  <h5 className="text-xl font-bold mb-4">{step.title}</h5>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="relative">
                <img src="https://picsum.photos/seed/office/800/800" className="rounded-[4rem] shadow-2xl" alt="Office" />
                {/*
                <div className="absolute -bottom-10 -right-10 bg-[#1A1D23] p-10 rounded-[3rem] text-white shadow-2xl hidden md:block">
                  <p className="text-5xl font-black text-orange-500 mb-2">10+</p>
                  <p className="text-xl font-bold">Years Experience</p>
                </div>
                */}
              </div>
            </div>
            <div className="lg:w-1/2">
              <SectionHeader 
                badge="Why choose us"
                title="Building the bridge between technology and business"
              />
              <div className="space-y-6">
                {[
                  { title: 'Result-Oriented Workflow', desc: 'We focus on KPIs and real business growth, not just vanity metrics.' },
                  { title: 'Dedicated Project Manager', desc: 'A single point of contact to ensure clear communication throughout the lifecycle.' },
                  { title: 'Cutting Edge Tech Stack', desc: 'We utilize the latest stable technologies to future-proof your investment.' },
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

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#1A1D23] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Contact Us</span>
              <h2 className="text-5xl font-extrabold mt-6 mb-10 leading-tight">Ready to start your <br /> next project?</h2>
              
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
              {/*  
              <div className="mt-12 flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                  <a key={social} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all">
                    <i className={`fa-brands fa-${social}`}></i>
                  </a>
                ))}
              </div>
              */}
            </div>

            <div className="bg-white rounded-[3rem] p-10 md:p-14 text-gray-900 shadow-2xl">
      <form ref={formRef} onSubmit={sendEmail} className="space-y-6">

        {/* Success Message */}
        {status === "success" && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-semibold">
            ✅ Your inquiry has been sent successfully. We’ll get back to you soon.
          </div>
        )}

        {/* Error Message */}
        {status === "error" && (
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
              className="w-full bg-gray-50 border rounded-xl px-6 py-4"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              name="from_email"
              required
              className="w-full bg-gray-50 border rounded-xl px-6 py-4"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Project Type</label>
          <select
            name="project"
            className="w-full bg-gray-50 border rounded-xl px-6 py-4"
          >
            <option>Web Development</option>
            <option>Mobile App</option>
            <option>UI/UX Design</option>
            <option>E-commerce</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Message</label>
          <textarea
            name="message"
            required
            className="w-full bg-gray-50 border rounded-xl px-6 py-4 min-h-[120px]"
            placeholder="Tell us more about your requirements..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-5 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all
            ${loading
              ? "bg-orange-400 cursor-not-allowed"
              : "accent-gradient hover:shadow-orange-200 shadow-xl"
            }`}
        >
          {loading ? (
            <>
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            "Send Inquiry"
          )}
        </button>

      </form>
    </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
