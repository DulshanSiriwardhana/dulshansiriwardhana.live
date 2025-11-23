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
  location: string;
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

export const personalInfo: PersonalInfo = {
  firstName: "Dulshan",
  lastName: "Siriwardhana",
  title: "Blockchain Developer & Full-Stack Developer",
  bio: "I'm a 4th-year Computer Engineering undergraduate at the University of Ruhuna, passionate about crafting elegant solutions to complex problems. I love diving deep into new technologies and turning innovative ideas into reality. As a Blockchain and Full-Stack Developer, I specialize in building decentralized applications and scalable web solutions.",
  email: "dulshan@dulshansiriwardhana.live",
  location: "Galle, Sri Lanka",
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "JavaScript", "Java", "C", "C#", "Solidity"],
  },
  {
    category: "Web Development",
    skills: ["HTML5", "CSS3", "React", "Next.js", "Node.js", "Bootstrap"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Git"],
  },
  {
    category: "Databases & Tools",
    skills: ["MongoDB", "Git", "TypeScript"],
  },
];

export const skills: string[] = [
  "Python",
  "JavaScript",
  "Java",
  "C",
  "C#",
  "Solidity",
  "React",
  "Next.js",
  "Node.js",
  "HTML5",
  "CSS3",
  "Bootstrap",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Git",
];

export const projects: Project[] = [
  {
    title: "HDLGenHub",
    description: "An E-learning platform created for teaching HDL (Hardware Description Language). Main repository of the HDLGenHub platform designed to help students learn and master HDL concepts.",
    tech: ["JavaScript", "React", "Node.js", "HTML5", "CSS3"],
    link: "https://github.com/HDLGenHub/HDLGenHub",
    github: "https://github.com/HDLGenHub/HDLGenHub",
    featured: true,
  },
  {
    title: "DeedLink Client",
    description: "Client application for DeedLink platform. Built with TypeScript and modern web technologies for seamless user experience.",
    tech: ["TypeScript", "React", "Next.js", "Node.js"],
    link: "https://github.com/DeedLink/deedlink-client",
    github: "https://github.com/DeedLink/deedlink-client",
    featured: true,
  },
  {
    title: "Chess Player Management",
    description: "A comprehensive chess player management system built with JavaScript. Features include player tracking, game management, and tournament organization.",
    tech: ["JavaScript", "Node.js", "HTML5", "CSS3"],
    link: "https://github.com/DulshanSiriwardhana/chessplayermanagement",
    github: "https://github.com/DulshanSiriwardhana/chessplayermanagement",
  },
  {
    title: "DevOps Chess Player Management",
    description: "DevOps implementation of the Chess Player Management system with CI/CD pipelines, containerization, and cloud deployment.",
    tech: ["JavaScript", "Docker", "Kubernetes", "Jenkins", "AWS"],
    link: "https://github.com/DulshanSiriwardhana/DevOps-ChessPlayerManagement",
    github: "https://github.com/DulshanSiriwardhana/DevOps-ChessPlayerManagement",
  },
  {
    title: "GUI Group Project",
    description: "A collaborative GUI project developed in C#. Group project showcasing modern desktop application development with SandarenuDT and TDRD.",
    tech: ["C#", ".NET", "Windows Forms"],
    link: "https://github.com/DulshanSiriwardhana/GUI_Group_Project_SandarenuDT_Siriwardhana_TDRD",
    github: "https://github.com/DulshanSiriwardhana/GUI_Group_Project_SandarenuDT_Siriwardhana_TDRD",
  },
  {
    title: "Ethereum Token Development",
    description: "Building Your First Ethereum Token Using Solidity - A comprehensive step-by-step guide for beginners to create and deploy ERC-20 tokens on the Ethereum blockchain.",
    tech: ["Solidity", "Web3.js", "React", "Ethereum", "Blockchain"],
    link: "https://medium.com/@dulshansiriwardhanaofficial",
    github: "https://github.com/DulshanSiriwardhana",
    featured: true,
  },
];

export const experience: Experience[] = [
  {
    company: "HDLGenHub",
    position: "Core Contributor & Developer",
    duration: "2023 - Present",
    description: [
      "Contributing to the main HDLGenHub E-learning platform for teaching HDL",
      "Developing interactive learning modules and educational content",
      "Collaborating with team members on platform architecture and features",
      "Maintaining code quality and documentation standards",
    ],
    tech: ["JavaScript", "React", "Node.js", "HTML5", "CSS3"],
  },
  {
    company: "DeedLink",
    position: "Full-Stack Developer",
    duration: "2023 - Present",
    description: [
      "Building client-side applications using TypeScript and modern frameworks",
      "Developing scalable web solutions for the DeedLink platform",
      "Implementing responsive designs and user-friendly interfaces",
      "Contributing to open-source projects and team collaboration",
    ],
    tech: ["TypeScript", "React", "Next.js", "Node.js"],
  },
  {
    company: "University of Ruhuna",
    position: "Computer Engineering Student",
    duration: "2021 - Present",
    description: [
      "4th-year undergraduate in Computer Engineering",
      "Specializing in Blockchain Development and Full-Stack Development",
      "Working on various academic and personal projects",
      "Active in multiple organizations: HDLGenHub, DeedLink, Team-OrByte",
    ],
    tech: ["Python", "JavaScript", "Java", "C", "C#", "Solidity"],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Innovations Inc.",
    content: "Dulshan is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding. He transformed our product vision into reality.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "StartupXYZ",
    content: "Working with Dulshan was a pleasure. He's not just a developer but a true problem solver. His code is clean, well-documented, and scalable. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "CEO",
    company: "Digital Solutions",
    content: "Dulshan exceeded our expectations. He delivered our project ahead of schedule and the quality was exceptional. His technical expertise and communication skills are top-notch.",
    rating: 5,
  },
];

export const stats: Stat[] = [
  {
    label: "GitHub Repositories",
    value: "81",
    suffix: "+",
    description: "Open source projects and contributions",
  },
  {
    label: "GitHub Stars",
    value: "23",
    suffix: "+",
    description: "Stars received on repositories",
  },
  {
    label: "GitHub Followers",
    value: "77",
    suffix: "+",
    description: "Developers following my work",
  },
  {
    label: "Organizations",
    value: "4",
    suffix: "+",
    description: "Active member in tech organizations",
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    url: `mailto:${personalInfo.email}`,
    type: "email",
    icon: "✉️",
  },
  {
    label: "GitHub",
    url: "https://github.com/DulshanSiriwardhana",
    type: "external",
    icon: "💻",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/dulshan-siriwardhana-17b77521a",
    type: "external",
    icon: "💼",
  },
  {
    label: "Medium",
    url: "https://medium.com/@dulshansiriwardhanaofficial",
    type: "external",
    icon: "✍️",
  },
  {
    label: "Website",
    url: "https://dulshansiriwardhana.live",
    type: "external",
    icon: "🌐",
  },
];

export const navigationLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

