export const personalInfo = {
  name: "Suyambu Raja A",
  title: "Full Stack Developer",
  tagline: "I build things for the web.",
  bio: "Final-year CSE student with a passion for crafting clean, scalable web applications. I specialize in React and Django, with hands-on experience in machine learning and deployment. Currently seeking full-time opportunities to create impactful software.",
  email: "asuyamburaja35@gmail.com",
  github: "https://github.com/suyambu-raja",
  linkedin: "https://linkedin.com/in/suyambu-raja-a-088994293",
  leetcode: "https://leetcode.com/u/5z8YMTYoQr/",
  resumeUrl: "/Suyambu_Resume_Updated1.pdf",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "LeetCode", href: "#leetcode" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    id: 1,
    title: "Lost and Found Ai",
    description:
      "An AI-powered lost-and-found platform that matches lost and found reports using semantic text, image, and location similarity. Features privacy-first ownership verification, OTP-secured handovers, and direct UPI reward payments.",
    tags: ["React.js", "Django", "JWT Auth", "Postgres SQL", "CLIP", "EasyOCR"],
    highlight: "Local AI matching — Sentence-Transformers + CLIP + EasyOCR",
    github: "https://github.com/SanjayRam936/Lost_And_Found.git",
    demo: "https://lost-and-found-gilt-nine.vercel.app/",
    image: null,
  },
  {
    id: 2,
    title: "Invoice Generator",
    description:
      "A React web app that turns spreadsheets into polished invoices in bulk — upload an Excel file, map columns to a template, and generate print-ready PDFs for every row, with batch ZIP export and cloud-synced data sources.",
    tags: ["React.js", "Supabase", "React-pdf", "xlsx"],
    highlight: "Spreadsheet-to-PDF batch generation with live preview",
    github: "https://github.com/suyambu-raja/invoice-flow.git",
    demo: "https://invoice-flow-69tk.onrender.com",
    image: null,
  },
  {
    id: 3,
    title: "YouTube Clone",
    description:
      "A fully functional YouTube clone built with React.js that integrates the YouTube Data API for real-time search, video playback, and channel information display.",
    tags: ["React.js", "YouTube API", "Netlify"],
    highlight: "API integration — live demo deployed",
    github: "https://github.com/suyambu-raja/youtube-clone-008",
    demo: "https://youtube-clone-800.netlify.app/",
    image: null,
  },
  {
    id: 4,
    title: "Smart Agriculture PWA",
    description:
      "A progressive web app for smart farming featuring crop disease detection powered by a custom TensorFlow model, bilingual support (English & Tamil), and a Django REST backend.",
    tags: ["React", "Django", "TensorFlow", "PWA", "Render"],
    highlight: "Tensorflow Convolutional Neural Network (CNN) model + bilingual",
    github: "https://github.com/suyambu-raja/Smart_Agri_Disease_Detection",
    demo: "https://smart-agri-disease-detection.netlify.app/",
    image: null,
  },
  {
    id: 5,
    title: "Netflix Clone",
    description:
      "A fully functional Netflix clone built with React.js that integrates the TMDB API for real-time search, video playback.",
    tags: ["React", "TMDB API", "Netlify"],
    highlight: "API integration + netflix UI design",
    github: "https://github.com/suyambu-raja/Netflix-clone",
    demo: "https://neflix-clone-007.netlify.app",
    image: null,
  },
  {
    id: 6,
    title: "Amazon Clone",
    description:
      " Amazon clone built with HTML, CSS, JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Netlify"],
    highlight: "Advanced level javaScript and DOM manipulation",
    github: "https://github.com/suyambu-raja/amazon-project-with-javaScript",
    demo: "https://amazon-clone-with-js.netlify.app/",
    image: null,
  },
  

];

export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 90 },
      { name: "HTML / CSS", level: 95 },
      { name: "JavaScript", level: 88 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Django", level: 82 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 78 },
      { name: "JavaScript", level: 88 },
      { name: "C", level: 70 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "SQL", level: 80 },
      { name: "MongoDB", level: 80},
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Docker", level: 80},
      { name: "Git / GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Render / Netlify", level: 80 },
      { name: "Figma", level: 60 },
    ],
  },
];

export const experiences = [
  {
    type: "work",
    title: "Developer Intern",
    organization: "iTTS (Intelligent Translation & Technology Solutions)",
    duration: "Jun 2025 – Present",
    description:
      "Working on real-time translation pipeline optimization, WebRTC media systems, and full-stack development using React, Django, and Python.",
    tech: ["React", "Django", "Python", "WebRTC"],
  },
  {
    type: "education",
    title: "B.E. Computer Science & Engineering",
    organization: "Prathyusha Engineering College",
    duration: "2022 – 2026",
    description:
      "Final-year student with focus on web development, machine learning, and software engineering. Actively involved in coding clubs and hackathons.",
    tech: [],
  },
  {
    type: "certification",
    title: "Certifications",
    organization: "",
    duration: "",
    description: "",
    certifications: [
      "NPTEL — Programming in Python",
      "NPTEL — Database Management system", 
      "Google — Digital Marketing Fundamentals",
    ],
  },
];

export const techStrip = [
  "React",
  "Django",
  "Python",
  "Java",
  "Html",
  "css",
  "scss",
  "JavaScript",
  "SQL",
  "MongoDB",
  "Docker",
  "Git",
];
