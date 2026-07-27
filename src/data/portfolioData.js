export const personalInfo = {
  name: "Suyambu Raja A",
  title: "Full Stack Developer",
  tagline: "I build things for the web.",
  bio: "Final-year CSE student with a passion for crafting clean, scalable web applications. I specialize in React and Django, with hands-on experience in machine learning and deployment. Currently seeking full-time opportunities to create impactful software.",
  email: "asuyamburaja35@gmail.com",
  github: "https://github.com/suyambu-raja",
  linkedin: "https://linkedin.com/in/suyambu-raja-a-088994293",
  leetcode: "https://leetcode.com/u/5z8YMTYoQr/",
  resumeUrl: "/Suyambu_Resume_Updated.pdf",
  avatarUrl: "/profile.jpg",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
    image: null,
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: "devicon-react-original colored" },
      { name: "HTML/CSS", icon: "devicon-html5-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Django", icon: "devicon-django-plain" },
      { name: "REST APIs", icon: "devicon-fastapi-plain colored" },
      { name: "JWT", icon: null, customIcon: "jwt" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "C", icon: "devicon-c-plain" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
      { name: "SQL", icon: "devicon-azuresqldatabase-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Supabase", icon: "devicon-supabase-plain colored" },
      { name: "Firebase", icon: "devicon-firebase-plain colored" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Git/GitHub", icon: "devicon-git-plain colored" },
      { name: "Postman", icon: "devicon-postman-plain colored" },
      { name: "Figma", icon: "devicon-figma-plain colored" },
      { name: "Hugging Face", icon: null, customIcon: "huggingface" },
    ],
  },
];

export const experiences = [
  {
    type: "education",
    title: "B.E. Computer Science Engineering",
    organization: "Prathyusha Engineering College",
    duration: "2023 – 2027",
    status: "Final year student",
    statusColor: "var(--color-teal)",
    description: "CGPA: 8.18",
    icon: "GraduationCap",
  },
  {
    type: "education",
    title: "12th Standard (HSC)",
    duration: "2023",
    description: "Percentage: 82.6%",
    icon: "BookOpen",
  },
  {
    type: "work",
    title: "Web Developer Intern",
    organization: "iDAS Skill Academy",
    duration: "June 2026 – July 2026",
    tech: ["React.js", "Django", "Web Design"],
    bullets: [
      "Built reusable components and modern interfaces using React.js.",
      "Implemented SEO best practices and semantic HTML.",
      "Designed clean, responsive layouts using modern CSS.",
    ],
    icon: "Briefcase",
    logoPlaceholder: true,
  },
  {
    type: "freelance",
    title: "Freelance Work",
    badge: "Independent",
    icon: "Laptop",
    projects: [
      {
        name: "Organic Fruit Box",
        client: "Fruit Shop",
        stack: ["React", "Vite"],
        work: "Build an organic fruit box website for online ordering of fruits.",
        status: "Completed",
        statusColor: "var(--color-teal)",
      },
      {
        name: "Invoice Flow",
        client: "Travel Agency",
        stack: ["React", "Vite", "Supabase"],
        work: "Bulk invoice generation from Excel, PDF export, Supabase Auth, deployed on Render with custom domain.",
        status: "Completed",
        statusColor: "var(--color-teal)",
      },
      {
        name: "WordPress Redesign",
        client: "WBR Labs (wbrlabs.in)",
        stack: ["WordPress", "Custom CSS"],
        work: "Full site redesign, performance optimization.",
        status: "In Progress",
        statusColor: "#F5C542",
      },
    ],
  },
];

export const achievements = [
  {
    category: "hackathon",
    event: "Codeathon 4.0",
    result: "Special Price",
    organizer: "Prathyusha Engineering College",
    description: "Developed a smart agri AI web app with AI voice assistance voice call, Agri news updates, yield prediction, crop disease detection, weather data for farmers in multilingual language.",
    image: "/images/codeathon4.jpg",
  },
  {
    category: "hackathon",
    event: "HackFest 2023",
    result: "Special Prize",
    organizer: "Prathyusha Engineering College",
    year: 2023,
    description: "Created a food waste management web app by connecting hotels and food provide with the trusts to donate the excess food to the needy people",
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
