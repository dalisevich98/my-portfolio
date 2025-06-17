import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Github, Calendar, Award, Code, Database, Cloud, Users, Camera, Plane, Book, Coffee, ExternalLink, Star, CheckCircle, Download, Send, User, Briefcase, Image, MessageSquare } from 'lucide-react';

import './styles/Portfolio.css';
import PhotoGallery from './PhotoGallery';
import experience from './data/experience.json';
import projects from './data/projects.json';
import skills from './data/skills.json';
import galleryImages from './data/gallery.json';

// Import TypeScript utilities
import { 
  calculateProgress, 
  getSkillColor, 
  validateEmail, 
  APIHelper 
} from './utils.ts';

// React Component (JavaScript with TypeScript utility usage)
const Portfolio = () => {
  // State management (simplified from TypeScript)
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [skillFilter, setSkillFilter] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [apiHelper] = useState(() => APIHelper.getInstance());
  const canvasRef = useRef(null);

  // HTML5 Canvas API demonstration
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated background pattern
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2, 
          canvas.height / 2, 
          20 + i * 15, 
          angle + i * 0.5, 
          angle + i * 0.5 + Math.PI
        );
        ctx.stroke();
      }
      
      angle += 0.02;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Advanced DOM manipulation with useEffect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const element = section;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;
        const sectionId = element.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId || 'home');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  });

  // JavaScript function using TypeScript utilities
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form handling using TypeScript validation
  const handleContactFormChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    if (!contactForm.name.trim()) {
      alert('Please enter your name');
      return;
    }
    
    // Using TypeScript utility function
    if (!validateEmail(contactForm.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (!contactForm.message.trim()) {
      alert('Please enter a message');
      return;
    }

    console.log('Form submitted:', contactForm);
    console.log('Formatted date:', apiHelper.formatDate(new Date()));
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const filteredSkills = skillFilter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category.toLowerCase() === skillFilter.toLowerCase());

  const filteredGallery = galleryFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === galleryFilter);

  const skillCategories = ['all', ...new Set(skills.map(skill => skill.category))];

  // JavaScript component using TypeScript utility functions
  const SkillBar = ({ skill }) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-blue-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${getSkillColor(skill.level)}`}
          style={{ width: calculateProgress(skill.level) }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">

      {/* Semantic HTML5 Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glassmorphism shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold gradient-text">Diana Alisevich</div>
            <div className="hidden md:flex space-x-6">
              {['home', 'about', 'biography', 'experience', 'projects', 'skills', 'gallery', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 px-3 py-2 rounded-lg ${
                    activeSection === section 
                      ? 'text-blue-400 bg-blue-400/20' 
                      : 'text-white hover:text-blue-300 hover:bg-white/10'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8 mt-16">
            <img 
              src="images/me.jpg" 
              alt="Diana Alisevich - Software Engineer"
              className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-blue-400 shadow-2xl object-cover"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Diana Alisevich
          </h1>
          <h2 className="text-xl md:text-2xl gradient-text mb-8">
            Full-Stack Software Engineer
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Specialized in <strong className="text-blue-400">Java</strong>, <strong className="text-blue-400">Python</strong>, 
            and <strong className="text-blue-400">SQL</strong> development. Expert in modern web technologies, 
            database optimization, and cloud solutions.
          </p>
          
          {/* HTML5 Canvas demonstration */}
          <div className="mb-8">
            <canvas 
              ref={canvasRef}
              width={200}
              height={100}
              className="mx-auto rounded-lg"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href="mailto:diana.alisevich001@gmail.com" 
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </a>
            <button 
              onClick={() => scrollToSection('projects')}
              className="flex items-center bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Code className="w-5 h-5 mr-2" />
              View Projects
            </button>
            <a 
              href="/resume.pdf" 
              download
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/graduate.jpg" 
                alt="Diana coding at her workstation"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate software engineer with expertise in modern web technologies. 
                I specialize in building scalable applications using <em>Java</em>, <em>Python</em>, 
                and <em>SQL</em>, with a strong foundation in backend systems and cloud technologies.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Currently pursuing my Master's in Computer Science at Boston University while working 
                at athenahealth. I'm passionate about creating efficient, user-friendly solutions 
                that solve real-world problems.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  Woburn, MA
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  609-778-8886
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section id="biography" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">My Journey</h2>
          <article className="glassmorphism rounded-lg p-8 text-gray-300 leading-relaxed">
            <p className="mb-6 text-lg">
              My journey in technology began during my undergraduate studies at the University of Massachusetts Boston, 
              where I discovered my passion for problem-solving through code. What started as curiosity about how 
              websites work evolved into a deep appreciation for the art and science of software development.
            </p>
            <p className="mb-6 text-lg">
              After graduating with my Bachelor's in Computer Science in 2022, I joined Tracelink as a Software 
              Development Engineer in Test II. This role gave me invaluable experience in quality assurance, test 
              automation, and the critical importance of reliable software systems in healthcare technology.
            </p>
            <p className="mb-6 text-lg">
              In 2024, I transitioned to a Software Engineer role, where I now focus on building robust, scalable 
              applications. My work involves everything from database optimization and caching strategies to developing 
              event-driven systems that handle critical healthcare data.
            </p>
            <p className="text-lg">
              Currently pursuing my Master's degree at Boston University, I'm constantly learning and staying current 
              with emerging technologies. I believe in the power of technology to make a positive impact, and I'm 
              particularly passionate about creating solutions that are not just functional, but truly user-friendly 
              and accessible.
            </p>
          </article>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Professional Experience</h2>
          <div className="space-y-12">
            {experience.map((job, index) => (
              <article key={index} className="glassmorphism rounded-lg p-8">
                <header className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-blue-400 text-lg font-semibold">{job.company}</p>
                    <p className="text-gray-400">{job.location}</p>
                  </div>
                  <div className="flex items-center text-gray-300 mt-4 md:mt-0">
                    <Calendar className="w-5 h-5 mr-2" />
                    <time>{job.period}</time>
                  </div>
                </header>
                <ul className="space-y-3">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-300 flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article key={index} className="glassmorphism rounded-lg overflow-hidden shadow-2xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={`Screenshot of ${project.title}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs text-white ${
                      project.language === 'TypeScript' ? 'bg-blue-500' :
                      project.language === 'JavaScript' ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}>
                      {project.language}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className="text-sm text-gray-400">{project.period}</span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.demoUrl || project.githubUrl) && (
                    <div className="flex space-x-3">
                      {project.demoUrl && (
                        <a href={project.demoUrl} className="flex items-center text-blue-400 hover:text-blue-300">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="flex items-center text-gray-400 hover:text-gray-300">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      )}
                    </div>
                 )}
                  </div>
             </article>
           ))}
         </div>
       </div>
     </section>

     {/* Skills Section */}
     <section id="skills" className="py-20 bg-slate-800/50">
       <div className="max-w-6xl mx-auto px-4">
         <h2 className="text-4xl font-bold text-white text-center mb-12">Technical Skills</h2>
         
         {/* Skill Filter */}
         <div className="flex justify-center mb-8">
           <div className="flex space-x-2 bg-slate-700 rounded-lg p-1">
             {skillCategories.map((category) => (
               <button
                 key={category}
                 onClick={() => setSkillFilter(category)}
                 className={`px-4 py-2 rounded-md capitalize transition-all duration-300 ${
                   skillFilter === category
                     ? 'bg-blue-600 text-white'
                     : 'text-gray-300 hover:text-white hover:bg-slate-600'
                 }`}
               >
                 {category}
               </button>
             ))}
           </div>
         </div>

         <div className="skills-grid">
           {filteredSkills.map((skill, index) => (
             <div key={index} className="glassmorphism rounded-lg p-6">
               <SkillBar skill={skill} />
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* Photo Gallery Section */}
     <section id="gallery" className="py-20">
       <div className="max-w-6xl mx-auto px-4">
         <h2 className="text-4xl font-bold text-white text-center mb-12">Photo Gallery</h2>
         
         {/* Gallery Filter */}
         <div className="flex justify-center mb-8">
           <div className="flex space-x-2 bg-slate-700 rounded-lg p-1">
             {['all', 'travel', 'work', 'hobbies'].map((category) => (
               <button
                 key={category}
                 onClick={() => setGalleryFilter(category)}
                 className={`px-4 py-2 rounded-md capitalize transition-all duration-300 ${
                   galleryFilter === category
                     ? 'bg-blue-600 text-white'
                     : 'text-gray-300 hover:text-white hover:bg-slate-600'
                 }`}
               >
                 {category}
               </button>
             ))}
           </div>
         </div>

         {/* HTML5 Drag and Drop Zone */}
         <PhotoGallery />

         <div className="gallery-grid">
           {filteredGallery.map((image) => (
             <div key={image.id} className="glassmorphism rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
               <img 
                 src={image.src} 
                 alt={image.alt}
                 className="w-full h-48 object-cover"
               />
               <div className="p-4">
                <p className="text-white font-medium mb-1">{image.alt}</p>
                <p className="text-gray-400 text-sm">{image.caption}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                  image.category === 'travel' ? 'bg-green-600/30 text-green-300' :
                  image.category === 'work' ? 'bg-blue-600/30 text-blue-300' :
                  'bg-purple-600/30 text-purple-300'
                }`}>
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interests Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">My Interests</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Plane className="w-8 h-8" />, title: "Traveling", desc: "Exploring new cultures and destinations worldwide" },
              { icon: <Camera className="w-8 h-8" />, title: "Photography", desc: "Capturing beautiful moments and landscapes" },
              { icon: <Book className="w-8 h-8" />, title: "Reading", desc: "Technical books and science fiction novels" },
              { icon: <Coffee className="w-8 h-8" />, title: "Coffee", desc: "Perfecting the art of specialty coffee brewing" }
            ].map((interest, index) => (
              <div key={index} className="glassmorphism rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-blue-400 mb-4 flex justify-center">
                  {interest.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{interest.title}</h4>
                <p className="text-gray-300 text-sm">{interest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Let's Connect</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
            <p className="text-gray-300 text-lg">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can work together!
            </p>
            
            <div className="space-y-4">
              <a href="mailto:diana.alisevich001@gmail.com" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                <Mail className="w-6 h-6 mr-3 text-blue-400" />
                diana.alisevich001@gmail.com
              </a>
              <a href="tel:609-778-8886" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                <Phone className="w-6 h-6 mr-3 text-blue-400" />
                609-778-8886
              </a>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                Woburn, MA
              </div>
              <a href="https://linkedin.com/in/diana-alisevich/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6 mr-3 text-blue-400" />
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* HTML5 Contact Form */}
          <form onSubmit={handleContactSubmit} className="glassmorphism rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-white mb-2 font-medium">Name *</label>
              <input
                type="text"
                id="name"
                required
                value={contactForm.name}
                onChange={(e) => handleContactFormChange('name', e.target.value)}
                className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="Your full name"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2 font-medium">Email *</label>
              <input
                type="email"
                id="email"
                required
                value={contactForm.email}
                onChange={(e) => handleContactFormChange('email', e.target.value)}
                className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-white mb-2 font-medium">Subject</label>
              <input
                type="text"
                id="subject"
                value={contactForm.subject}
                onChange={(e) => handleContactFormChange('subject', e.target.value)}
                className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="What's this about?"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-white mb-2 font-medium">Message *</label>
              <textarea
                id="message"
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => handleContactFormChange('message', e.target.value)}
                className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600 focus:border-blue-400 focus:outline-none transition-colors resize-vertical"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 font-medium flex items-center justify-center transform hover:scale-105"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="py-8 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-400 mb-4">
          &copy; 2025 Diana Alisevich. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm">
          Built with React, TypeScript, JavaScript, HTML5 APIs, and CSS3
        </p>
      </div>
    </footer>
  </div>
  );
};

export default Portfolio;