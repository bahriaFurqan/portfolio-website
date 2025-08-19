import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiMail, FiDownload, FiArrowUp, FiSun, FiMoon, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaReact, FaJs, FaJava, FaGithub, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiThreedotjs, SiFramer, SiCplusplus, SiCsharp, SiHtml5, SiCss3, SiPostgresql, SiMysql, SiWebstorm, SiVisualstudiocode } from 'react-icons/si';
import emailjs from '@emailjs/browser';
import './App.css';

// Theme Context
const ThemeContext = React.createContext();

// Theme Provider Component
function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('light-theme', !isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 3D Animated Sphere Component
function AnimatedSphere() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#60a5fa" 
        wireframe 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

// Floating Cubes Component
function FloatingCubes() {
  return (
    <group>
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial 
            color={`hsl(${Math.random() * 360}, 70%, 60%)`}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Navigation Component
function Navigation({ isOpen, setIsOpen }) {
  const { isDark, toggleTheme } = useTheme();
  const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl font-bold gradient-text"
          >
            Furqan Ahmad
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group nav-link"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800/20 hover:bg-gray-800/40 transition-all duration-300 theme-toggle"
            >
              {isDark ? (
                <FiSun className="text-yellow-400" size={20} />
              ) : (
                <FiMoon className="text-gray-700" size={20} />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle Button Mobile */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800/20 hover:bg-gray-800/40 transition-all duration-300 theme-toggle"
            >
              {isDark ? (
                <FiSun className="text-yellow-400" size={20} />
              ) : (
                <FiMoon className="text-gray-700" size={20} />
              )}
            </motion.button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass border-t border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 hover:bg-white/5 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// Hero Section Component
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden mobile-section">
      {/* 3D Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <FloatingCubes />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </motion.div>

      <div className="relative z-10 text-center mobile-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative mb-6 md:mb-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-600 p-1 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src={process.env.PUBLIC_URL + "/WhatsApp Image 2025-06-28 at 19.55.27_e8dfcad4.jpg"} 
                  alt="Furqan Ahmad" 
                  className="w-full h-full object-cover mobile-image"
                  onError={(e) => {
                    console.log('Image failed to load, using fallback');
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
                  }}
                />
              </div>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full border-2 md:border-4 border-gray-900"
            />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6"
          >
            <span className="gradient-text">Hello</span>
            <br />
            <span className="text-white">I'm Furqan Ahmad</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mobile-text"
          >
            Software Engineer & Full Stack Developer
            <br />
            <span className="text-base sm:text-lg text-gray-400">Crafting robust software solutions with modern technologies</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 btn-primary mobile-btn touch-target mobile-tap-highlight w-full sm:w-auto"
            >
              View My Work
              <FiArrowUp className="rotate-45" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 mobile-btn touch-target mobile-tap-highlight w-full sm:w-auto"
            >
              Download CV
              <FiDownload />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 md:h-3 bg-white/60 rounded-full mt-1 md:mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-12 md:py-20 relative mobile-section">
      <div className="mobile-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mobile-text">
            Software Engineer with expertise in full stack development and modern technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 card-hover">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 gradient-text">My Journey</h3>
              <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed mobile-text">
                I'm a passionate Software Engineer with a strong foundation in both frontend and backend development. 
                My journey in software development began with mastering core programming languages like C++, C#, and Java, 
                which gave me a solid understanding of object-oriented programming principles and software architecture.
              </p>
              <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed mobile-text">
                As I progressed in my career, I expanded my expertise to include modern web technologies, becoming proficient 
                in JavaScript, React, TypeScript, and various database technologies. This full-stack knowledge allows me to 
                create comprehensive software solutions from concept to deployment.
              </p>
              <p className="text-gray-300 leading-relaxed mobile-text">
                I'm constantly learning and adapting to new technologies, tools, and best practices. When I'm not coding, 
                you can find me contributing to open-source projects, exploring new frameworks, or sharing knowledge with 
                the developer community.
              </p>
              
              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-xl md:text-2xl font-bold gradient-text">3+</div>
                  <div className="text-xs md:text-sm text-gray-400">Years Experience</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-xl md:text-2xl font-bold gradient-text">25+</div>
                  <div className="text-xs md:text-sm text-gray-400">Projects Completed</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-xl md:text-2xl font-bold gradient-text">10+</div>
                  <div className="text-xs md:text-sm text-gray-400">Technologies</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-64 h-64 md:w-80 md:h-80"
            >
              <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      tech: ["React", "TypeScript", "PostgreSQL", "Node.js"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      link: "#"
    },
    {
      title: "Task Management System",
      description: "Java-based task management application with MySQL database",
      tech: ["Java", "MySQL", "Spring Boot", "React"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      link: "#"
    },
    {
      title: "Real-time Chat Application",
      description: "C# WPF application with real-time messaging capabilities",
      tech: ["C#", "WPF", "SignalR", "SQL Server"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-12 md:py-20 mobile-section">
      <div className="mobile-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">My Projects</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mobile-text">
            Here are some of the projects I've worked on recently
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="glass rounded-2xl p-0 border border-white/10 shadow-2xl flex flex-col justify-between max-w-xl w-full"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 40px 0 rgba(59,130,246,0.25)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-t-2xl"
                style={{ minHeight: '16rem', maxHeight: '20rem' }}
              />
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-3xl font-bold mb-3 gradient-text">{project.title}</h3>
                <p className="text-gray-300 mb-6 flex-1 text-lg">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Skills Section Component
function SkillsSection() {
  const programmingLanguages = [
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "C#", icon: SiCsharp, color: "#239120" },
    { name: "Java", icon: FaJava, color: "#ED8B00" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  ];

  const webTechnologies = [
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Three.js", icon: SiThreedotjs, color: "#000000" },
  ];

  const databases = [
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  ];

  const tools = [
    { name: "WebStorm", icon: SiWebstorm, color: "#000000" },
    { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC" },
    { name: "GitHub", icon: FaGithub, color: "#181717" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
  ];

  const skillCategories = [
    { title: "Programming Languages", skills: programmingLanguages },
    { title: "Web Technologies", skills: webTechnologies },
    { title: "Databases", skills: databases },
    { title: "Development Tools", skills: tools },
  ];

  return (
    <section id="skills" className="py-12 md:py-20 mobile-section">
      <div className="mobile-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">Skills & Technologies</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mobile-text">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 gradient-text text-center">{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (index * 0.1), ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                    className="text-center group"
                  >
                    <div className="glass rounded-2xl p-4 md:p-6 mb-4 border border-white/10 group-hover:border-white/30 transition-all duration-300 card-hover">
                      <skill.icon size={40} color={skill.color} className="mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 md:w-12 md:h-12" />
                      <p className="text-xs md:text-sm font-medium group-hover:gradient-text transition-all duration-300">{skill.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // You'll need to replace these with your actual EmailJS credentials
      const result = await emailjs.sendForm(
        'service_abc123x', // Replace with your EmailJS service ID
        'template_xyz789m', // Replace with your EmailJS template ID
        formRef.current,
        'K9mP7qR3nL2vB5tY8' // Replace with your EmailJS public key
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 mobile-section">
      <div className="mobile-container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mobile-text">
            Let's work together on your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 card-hover">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 gradient-text">Let's Connect</h3>
              <div className="space-y-3 md:space-y-4">
                <motion.a 
                  href="mailto:ahmedfurqan679@gmail.com"
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center space-x-3 md:space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 touch-target mobile-tap-highlight"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <FiMail className="text-blue-400" size={18} />
                  </div>
                  <span className="text-gray-300 text-sm md:text-base">ahmedfurqan679@gmail.com</span>
                </motion.a>
                <motion.a 
                  href="https://github.com/bahriaFurqan"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center space-x-3 md:space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 touch-target mobile-tap-highlight"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-500/20 rounded-full flex items-center justify-center">
                    <FiGithub className="text-gray-400" size={18} />
                  </div>
                  <span className="text-gray-300 text-sm md:text-base">github.com/bahriaFurqan</span>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/furqan-ahmad-yousafzai"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center space-x-3 md:space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 touch-target mobile-tap-highlight"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <FiLinkedin className="text-blue-400" size={18} />
                  </div>
                  <span className="text-gray-300 text-sm md:text-base">linkedin.com/in/furqan-ahmad-yousafzai</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 border border-white/10 card-hover">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-dark-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 touch-target"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-dark-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 touch-target"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-dark-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 resize-none touch-target"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
                  >
                    <FiCheck className="text-green-400" />
                    <span className="text-green-400 text-sm">Message sent successfully!</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
                  >
                    <FiAlertCircle className="text-red-400" />
                    <span className="text-red-400 text-sm">Failed to send message. Please try again.</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mobile-btn touch-target mobile-tap-highlight ${
                    isSubmitting 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg btn-primary'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 md:py-12 border-t border-white/10 mobile-section">
      <div className="mobile-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl md:text-2xl font-bold gradient-text mb-3 md:mb-4">Furqan Ahmad</h3>
            <p className="text-gray-400 mb-4 max-w-md mobile-text">
              Software Engineer passionate about creating robust software solutions with expertise in full stack development, 
              from C++ and Java to modern web technologies like React and TypeScript.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <motion.a
                href="https://github.com/bahriaFurqan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 touch-target mobile-tap-highlight"
              >
                <FiGithub className="text-white" size={16} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/furqan-ahmad-yousafzai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 touch-target mobile-tap-highlight"
              >
                <FiLinkedin className="text-white" size={16} />
              </motion.a>
              <motion.a
                href="https://twitter.com/furqanahmad"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 touch-target mobile-tap-highlight"
              >
                <FiTwitter className="text-white" size={16} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base touch-target mobile-tap-highlight"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Contact</h4>
            <div className="space-y-2 text-gray-400 text-sm md:text-base mobile-text">
              <p>ahmedfurqan679@gmail.com</p>
              <p>+92 313 2004596</p>
              <p>Pakistan</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs md:text-sm">
            © {currentYear} Furqan Ahmad. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs md:text-sm mt-2 md:mt-0">
            Built with ❤️ using React, Three.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <ThemeProvider>
      <div className="App">
        <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;