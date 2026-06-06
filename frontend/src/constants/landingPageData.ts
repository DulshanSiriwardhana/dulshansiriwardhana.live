export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface ContactLink {
  label: string;
  url: string;
  type: "email" | "external";
  icon?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  avatar?: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  tech: string[];
  logo?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SkillWithLevel {
  skill: string;
  level: number;
}

export interface BlogArticle {
  title: string;
  description: string;
  url: string;
  date: string;
  readTime?: string;
  tags: string[];
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Reference {
  name: string;
  role: string;
  organization: string;
  phone: string;
  email: string;
}

export const personalInfo: PersonalInfo = {
  firstName: "Rasindu Dulshan",
  lastName: "Siriwardhana",
  title: "Full Stack Software Engineer",
  bio: "Results-driven Full Stack Software Engineer and Computer Engineering graduate from the University of Ruhuna, specializing in high-performance system architecture, blockchain ecosystems, and scalable distributed applications. Expert proficiency in the MERN stack (MongoDB, Express, React, Node.js), Spring Boot, and cloud-native solutions. Proven track record of delivering end-to-end engineering solutions, from SIMD-optimized C++ engines to interactive Web3 frontends. Active open-source contributor with 100+ repositories on GitHub, dedicated to building performant, secure, and user-centric software architectures.",
  email: "dulshansiriwardhanaofficial@gmail.com",
  phone: "+94 76 398 7108",
  location: "Madampe, 61230, Sri Lanka",
  linkedin: "linkedin.com/in/dulshans",
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C++", "Solidity", "Java", "C", "C#"],
  },
  {
    category: "Tech Stack",
    skills: ["MERN (MongoDB, Express, React, Node)", "Spring Boot", "Next.js", "Flutter", "Tailwind CSS"],
  },
  {
    category: "Architecture & DevOps",
    skills: ["Microservices", "RESTful APIs", "Blockchain", "Docker", "AWS", "CI/CD (GitHub Actions)"],
  },
  {
    category: "Tools & Collaboration",
    skills: ["Git", "GitHub", "Jira", "Linux", "Vercel", "Render"],
  },
];

export const skills: string[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Solidity",
  "Java",
  "React",
  "Next.js",
  "Node.js",
  "Spring Boot",
  "Flutter",
  "Docker",
  "AWS",
  "MongoDB",
  "GitHub Actions",
  "Tailwind CSS",
  "Microservices",
  "REST APIs",
];

export const projects: Project[] = [
  {
    title: "CyberHex AI",
    description: "High-performance AI & Machine Learning engine in C++ with a full-stack visualization dashboard. Features real-time data streaming via WebSockets and modular AI pipelines.",
    tech: ["C++", "React", "TypeScript", "Node.js", "WebSockets", "Docker"],
    link: "https://github.com/DulshanSiriwardhana/CyberHex",
    github: "https://github.com/DulshanSiriwardhana/CyberHex",
    featured: true,
  },
  {
    title: "DeedLink",
    description: "Blockchain property deed management system. A secure and transparent solution for property management using smart contracts and IPFS.",
    tech: ["Solidity", "Ethereum", "React", "Node.js", "AWS S3", "Docker"],
    link: "https://deedlink.live",
    github: "https://github.com/DeedLink/DeedLink",
    featured: true,
  },
  {
    title: "CIBF Reservation Ecosystem",
    description: "Microservices-based reservation system for the Colombo International Book Fair. Includes independently deployable services for notifications and email handling.",
    tech: ["Java", "Spring Boot", "RabbitMQ", "PostgreSQL", "MongoDB", "Docker"],
    link: "https://github.com/DulshanSiriwardhana/CIBF-Reservation-Portal",
    github: "https://github.com/DulshanSiriwardhana/CIBF-Reservation-Portal",
    featured: true,
  },
  {
    title: "HDLGenHub",
    description: "Hardware Learning Platform for teaching Hardware Description Languages. Features interactive e-learning modules and course management.",
    tech: ["React", "Node.js", "Tailwind CSS", "Express"],
    link: "https://github.com/HDLGenHub/HDLGenHub",
    github: "https://github.com/HDLGenHub/HDLGenHub",
    featured: true,
  },
  {
    title: "Expressway-R",
    description: "QR-based mobile application for expressway ticket reservation. Developed for efficient transit management with real-time verification.",
    tech: ["Flutter", "Firebase", "Dart"],
    link: "https://github.com/DulshanSiriwardhana/Express-R",
    github: "https://github.com/DulshanSiriwardhana/Express-R",
  },
  {
    title: "High Performance Computing",
    description: "2D heat equation simulator comparing sequential, OpenMP-parallelized, and CUDA GPU-accelerated execution strategies.",
    tech: ["C", "CUDA", "OpenMP", "Python"],
    link: "https://github.com/DulshanSiriwardhana/HeatEquationSimulater",
    github: "https://github.com/DulshanSiriwardhana/HeatEquationSimulater",
  },
];

export const experience: Experience[] = [
  {
    company: "BotCalm (PVT) Ltd",
    position: "Full-Stack Software Engineer Intern",
    duration: "Aug 2024 - June 2025",
    description: [
      "Architected and deployed scalable web features using the MERN stack for production environments, improving API response times by 25%.",
      "Engineered high-performance Next.js applications and integrated Web3 protocols (WalletConnect, Wagmi), serving 500+ daily active users.",
      "Optimized development workflows by leading Git-based collaboration and Jira task management, reducing sprint delivery time by 15%.",
      "Excelled in a high-autonomy hybrid model, delivering 40+ production-ready components with 98% unit test coverage.",
    ],
    tech: ["MERN Stack", "Next.js", "Web3", "Jira", "GitHub"],
  },
  {
    company: "University of Ruhuna",
    position: "Computer Engineering Student",
    duration: "2021 - 2026",
    description: [
      "Specializing in Computer Engineering with a focus on Software Architecture, Distributed Systems, and AI.",
      "Maintained a competitive 3.3 GPA while managing 100+ open-source project repositories.",
      "Lead developer for major academic and group projects, consistently achieving A+ grades for technical implementation.",
    ],
    tech: ["C++", "C", "Python", "Java", "Software Engineering"],
  },
];

export const certificates: Certificate[] = [
  { title: "Python (Basic)", issuer: "HackerRank", date: "04 June 2021", link: "https://www.hackerrank.com/certificates/4e87860509ae" },
  { title: "Problem Solving (Basic)", issuer: "HackerRank", date: "05 June 2021", link: "https://www.hackerrank.com/certificates/2ef01163a2f6" },
  { title: "JavaScript (Basic)", issuer: "HackerRank", date: "29 Feb 2024", link: "https://www.hackerrank.com/certificates/a78669e00a1f" },
  { title: "React (Basic)", issuer: "HackerRank", date: "03 July 2024", link: "https://www.hackerrank.com/certificates/a53bca26155d" },
  { title: "JavaScript (Intermediate)", issuer: "HackerRank", date: "03 July 2024", link: "https://www.hackerrank.com/certificates/89c8019d7803" },
  { title: "Frontend Developer (React)", issuer: "HackerRank", date: "03 July 2024", link: "https://www.hackerrank.com/certificates/02dba66138ff" },
  { title: "Software Engineer Intern", issuer: "HackerRank", date: "03 July 2024", link: "https://www.hackerrank.com/certificates/e38a91c02c06" },
  { title: "Software Engineer", issuer: "HackerRank", date: "16 April 2025", link: "https://www.hackerrank.com/certificates/42bbe9236ae9" },
];

export const references: Reference[] = [
  {
    name: "Dr. Kushan Sudheera",
    role: "Senior Lecturer",
    organization: "Faculty of Engineering, University of Ruhuna",
    phone: "+94 9122457656",
    email: "kushan@eie.ruh.ac.lk"
  },
  {
    name: "Dr. Prabath Weerasinghe",
    role: "Senior Lecturer",
    organization: "Faculty of Engineering, University of Ruhuna",
    phone: "+94717056638",
    email: "weera@eie.ruh.ac.lk"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Kushan Sudheera",
    role: "Senior Lecturer",
    company: "University of Ruhuna",
    content: "Dulshan is a dedicated engineering student with exceptional problem-solving skills and a strong commitment to high-performance computing and AI systems.",
    rating: 5,
  },
  {
    name: "Dr. Prabath Weerasinghe",
    role: "Senior Lecturer",
    company: "University of Ruhuna",
    content: "His work on microservices and blockchain shows a deep understanding of modern software architecture and distributed systems.",
    rating: 5,
  },
];

export const stats: Stat[] = [
  {
    label: "Repositories",
    value: "100",
    suffix: "+",
    description: "Public projects on GitHub",
  },
  {
    label: "Commits",
    value: "3800",
    suffix: "+",
    description: "Contribution volume on GitHub",
  },
  {
    label: "Streak",
    value: "95",
    suffix: " Days",
    description: "Longest contribution streak",
  },
  {
    label: "GPA",
    value: "3.3",
    description: "Academic Performance",
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    url: `mailto:${personalInfo.email}`,
    type: "email",
  },
  {
    label: "GitHub",
    url: "https://github.com/DulshanSiriwardhana",
    type: "external",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/dulshans",
    type: "external",
  },
  {
    label: "Medium",
    url: "https://medium.com/@dulshansiriwardhanaofficial",
    type: "external",
  },
  {
    label: "Facebook",
    url: "https://facebook.com/profile.php?id=61568544393764",
    type: "external",
  },
];

export const skillLevels: SkillWithLevel[] = [
  { skill: "JavaScript / TypeScript", level: 95 },
  { skill: "MERN Stack", level: 90 },
  { skill: "Python", level: 85 },
  { skill: "Solidity", level: 80 },
  { skill: "Spring Boot", level: 75 },
  { skill: "C++", level: 82 },
  { skill: "Next.js", level: 88 },
  { skill: "Docker", level: 78 },
];

export const blogArticles: BlogArticle[] = [
  {
    title: "Building Your First Ethereum Token Using Solidity",
    description: "A step-by-step guide on developing and deploying ERC-20 tokens on the Ethereum blockchain.",
    url: "https://medium.com/@dulshansiriwardhanaofficial/building-your-first-ethereum-token-using-solidity-a-step-by-step-guide-ac64d9ffd949",
    date: "2024",
    readTime: "8 min read",
    tags: ["Blockchain", "Solidity", "Web3"],
  },
];

export const achievements: Achievement[] = [
  {
    title: "Innovate with Ballerina 1st Runner-Up",
    issuer: "WSO2",
    date: "2025",
    description: "Awarded 1st Runner-Up in the national innovation competition using Ballerina language.",
  },
  {
    title: "Coders V9.0 Top 40",
    issuer: "University of Peradeniya",
    date: "2023",
    description: "Ranked among the Top 40 competitors in a prestigious national coding competition.",
  },
  {
    title: "Interfaculty Chess Champions",
    issuer: "University of Ruhuna",
    date: "2023",
    description: "Won the championship title for the faculty in the interfaculty chess tournament.",
  },
  {
    title: "Top 10 Contributor (Sri Lanka)",
    issuer: "GitHub",
    date: "2024",
    description: "Ranked as a Top 10 GitHub contributor in Sri Lanka.",
  },
];

export const navigationLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Hire Me", href: "#hire" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];


