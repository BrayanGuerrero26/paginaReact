import React, { useState, useEffect, useRef } from 'react';
import { User, Code, Mail, ExternalLink, Github, Linkedin, ArrowRight, ChevronRight } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
  }, []);

  // Advanced space-like background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const particles = [];
    const particleCount = 80;

    // Create space particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 40 + 250, // Purple range
        twinkle: Math.random() * 0.02 + 0.005,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create subtle static gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3, 
        canvas.height * 0.4, 
        0,
        canvas.width * 0.5, 
        canvas.height * 0.6, 
        canvas.width * 0.6
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Subtle twinkle effect
        particle.opacity += Math.sin(Date.now() * particle.twinkle) * 0.005;
        particle.opacity = Math.max(0.05, Math.min(0.4, particle.opacity));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 50%, 60%, ${particle.opacity})`;
        ctx.fill();

        // Draw subtle connections
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              const connectionOpacity = 0.03 * (1 - distance / 80);
              ctx.strokeStyle = `hsla(${particle.hue}, 50%, 60%, ${connectionOpacity})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => setCanvasSize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePosition]);

  const sections = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Perfil' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' }
  ];

  const projects = [
    {
      title: "Sistema de Gestión Académica",
      description: "Plataforma web para administración de estudiantes, notas y horarios con dashboard analítico.",
      tech: ["React", "Node.js", "PostgreSQL", "Chart.js"],
      type: "Web App",
      year: "2024"
    },
    {
      title: "E-Commerce Mobile",
      description: "Aplicación móvil para comercio electrónico con carrito de compras y pasarela de pagos.",
      tech: ["React Native", "Firebase", "Stripe API"],
      type: "Mobile App", 
      year: "2024"
    },
    {
      title: "Dashboard Analytics",
      description: "Panel de control para visualización de métricas y KPIs empresariales en tiempo real.",
      tech: ["Vue.js", "Express", "MongoDB", "D3.js"],
      type: "Web App",
      year: "2023"
    }
  ];

  const handleSectionChange = (sectionId) => {
    if (sectionId === activeSection) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection(sectionId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 400);
  };

  const skills = [
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "React & Vue.js", level: 85 },
    { name: "Node.js & Express", level: 80 },
    { name: "Bases de Datos", level: 75 },
    { name: "React Native", level: 70 }
  ];

  const renderContent = () => {
    const contentClass = `transition-all duration-500 ease-in-out ${
      isTransitioning 
        ? 'opacity-0 translate-y-12 scale-95 rotate-1' 
        : 'opacity-100 translate-y-0 scale-100 rotate-0'
    }`;
    switch (activeSection) {
      case 'home':
        return (
          <div className={`${contentClass} space-y-20`}>
            {/* Hero Section with enhanced animations */}
            <section className="min-h-screen flex items-center">
              <div className="max-w-4xl">
                <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <h1 className="text-6xl md:text-8xl font-light mb-6 leading-tight">
                    <span className="inline-block animate-pulse hover:animate-none transition-all duration-300 hover:scale-105 text-gray-100">
                      Brayan
                    </span>
                    <br />
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 animate-gradient-x bg-300% hover:scale-105 transition-transform duration-300">
                      Guerrero
                    </span>
                  </h1>
                  
                  <div className={`flex items-center gap-4 text-lg text-gray-400 mb-8 transform transition-all duration-1000 delay-300 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                    <span className="relative">
                      Full Stack Developer
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 animate-expand"></div>
                    </span>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Sexto Semestre</span>
                  </div>
                </div>

                <p className={`text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-light transform transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  Estudiante de ingeniería enfocado en desarrollo web moderno. 
                  Creando soluciones digitales eficientes con React, Node.js y bases de datos.
                </p>

                <div className={`flex items-center gap-6 transform transition-all duration-1000 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <button 
                    onClick={() => handleSectionChange('projects')}
                    className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">Ver Proyectos</span>
                    <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>

                  <button 
                    onClick={() => handleSectionChange('about')}
                    className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 border border-gray-700 text-gray-300 rounded-full font-medium hover:border-purple-500 hover:text-white transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">Mi Perfil</span>
                    <User className="relative z-10 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </button>
                  
                  <button 
                    onClick={() => handleSectionChange('contact')}
                    className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 border border-gray-700 text-gray-300 rounded-full font-medium hover:border-purple-500 hover:text-white transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">Contactar</span>
                    <Mail className="relative z-10 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </section>

            {/* Animated Skills Section */}
            <section>
              <h2 className="text-4xl font-light text-gray-100 mb-16 hover:text-purple-300 transition-colors duration-300">
                Tecnologías & Habilidades
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <div key={index} className="group hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 text-sm group-hover:text-purple-400 transition-colors">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden group-hover:bg-gray-700 transition-colors">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-purple-500/30"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'about':
        return (
          <div className={`${contentClass} space-y-16`}>
            <section>
              <h2 className="text-5xl font-light text-gray-100 mb-16 hover:text-purple-300 transition-colors duration-300">
                Perfil Profesional
              </h2>
              
              <div className="grid md:grid-cols-3 gap-16">
                <div className="md:col-span-2 space-y-8">
                  <p className="text-xl text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                    Estudiante de sexto semestre de Ingeniería de Sistemas con sólidos conocimientos 
                    en desarrollo web full stack. Me apasiona crear aplicaciones eficientes y 
                    mantenerme actualizado con las últimas tecnologías del sector.
                  </p>
                  
                  <p className="text-xl text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                    Mi enfoque se centra en escribir código limpio, implementar buenas prácticas 
                    de desarrollo y crear experiencias de usuario intuitivas.
                  </p>

                  <div className="pt-8 border-t border-gray-800">
                    <h3 className="text-2xl text-gray-100 mb-6 font-medium hover:text-purple-300 transition-colors">
                      Educación
                    </h3>
                    <div className="group p-6 border border-gray-800 rounded-2xl hover:border-purple-500 hover:bg-gray-900/30 transition-all duration-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors">
                            Ingeniería de Sistemas
                          </div>
                          <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                            Universidad - Sexto Semestre
                          </div>
                        </div>
                        <div className="text-purple-400 font-medium">2022 - 2026</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl text-gray-100 mb-6 font-medium hover:text-purple-300 transition-colors">
                      Especialidades
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Desarrollo Frontend",
                        "APIs REST",
                        "Bases de Datos",
                        "Desarrollo Móvil",
                        "UI/UX Design"
                      ].map((spec, index) => (
                        <div key={index} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900/30 transition-all duration-300 hover:scale-105">
                          <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                          <span className="text-gray-300 group-hover:text-white transition-colors">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center p-8 border border-gray-800 rounded-2xl hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-900/10 hover:to-violet-900/10 transition-all duration-500 group">
                    <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      15+
                    </div>
                    <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                      Proyectos Desarrollados
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'projects':
        return (
          <div className={`${contentClass} space-y-16`}>
            <section>
              <h2 className="text-5xl font-light text-gray-100 mb-16 hover:text-purple-300 transition-colors duration-300">
                Proyectos Destacados
              </h2>
              
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <div 
                    key={index}
                    className="group border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition-all duration-500 hover:bg-gradient-to-br hover:from-gray-900/30 hover:to-purple-900/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-medium text-gray-100 mb-3 group-hover:text-purple-300 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                          <span className="px-3 py-1 bg-gray-800 rounded-full group-hover:bg-purple-800/30 transition-colors">
                            {project.type}
                          </span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                      
                      <button className="mt-6 md:mt-0 group-hover:scale-105 flex items-center gap-3 px-6 py-3 border border-gray-700 text-gray-300 rounded-full text-sm hover:border-purple-500 hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-300">
                        <span>Ver Detalles</span>
                        <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      </button>
                    </div>
                    
                    <p className="text-gray-400 mb-8 leading-relaxed max-w-4xl group-hover:text-gray-300 transition-colors duration-300">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-4 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-full text-sm hover:border-purple-500 hover:bg-purple-500/20 hover:text-white hover:scale-110 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'contact':
        return (
          <div className={`${contentClass} space-y-16`}>
            <section className="max-w-3xl">
              <h2 className="text-5xl font-light text-gray-100 mb-16 hover:text-purple-300 transition-colors duration-300">
                Contacto
              </h2>
              
              <p className="text-2xl text-gray-300 mb-16 leading-relaxed hover:text-white transition-colors duration-300">
                ¿Tienes un proyecto en mente o quieres colaborar? 
                Me encantaría conocer más sobre tu idea y cómo puedo contribuir.
              </p>

              <div className="space-y-6">
                {[
                  { 
                    icon: Mail, 
                    title: "Email", 
                    subtitle: "brayan@example.com",
                    href: "mailto:brayan@example.com",
                    bgColor: "from-violet-600 to-purple-600"
                  },
                  { 
                    icon: Github, 
                    title: "GitHub", 
                    subtitle: "@brayanguerrero",
                    href: "#",
                    bgColor: "from-gray-700 to-gray-800"
                  },
                  { 
                    icon: Linkedin, 
                    title: "LinkedIn", 
                    subtitle: "Brayan Guerrero",
                    href: "#",
                    bgColor: "from-blue-600 to-blue-700"
                  }
                ].map((contact, index) => (
                  <a 
                    key={index}
                    href={contact.href}
                    className="group flex items-center gap-6 p-8 border border-gray-800 rounded-2xl hover:border-gray-600 transition-all duration-500 hover:bg-gradient-to-br hover:from-gray-900/40 hover:to-purple-900/10 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${contact.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <contact.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-300 font-medium text-lg mb-2 group-hover:text-white transition-colors duration-300">
                        {contact.title}
                      </div>
                      <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                        {contact.subtitle}
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white relative overflow-hidden">
      {/* Animated Particle Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Additional Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-1">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Enhanced Vertical Navigation */}
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col gap-8">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className="group relative"
              >
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 hover:scale-125 ${
                  activeSection === section.id 
                    ? 'bg-purple-400 border-purple-400 scale-125 shadow-lg shadow-purple-400/50' 
                    : 'border-gray-600 hover:border-purple-400 hover:bg-purple-400/20'
                }`} />
                
                <div className={`absolute left-8 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-full text-sm whitespace-nowrap transition-all duration-500 ${
                  activeSection === section.id 
                    ? 'opacity-100 translate-x-0 border-purple-500 text-purple-300' 
                    : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                }`}>
                  {section.label}
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 ml-20 mr-8 py-16">
          <div className="max-w-6xl mx-auto px-8">
            {renderContent()}
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-expand {
          animation: expand 2s ease-out 1s forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .bg-300\\% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
}

export default App;