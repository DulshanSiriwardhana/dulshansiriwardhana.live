export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export interface ContactLink {
  label: string;
  url: string;
  type: "email" | "external";
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  email: string;
}

export const personalInfo: PersonalInfo = {
  firstName: "Dulshan",
  lastName: "Siriwardhana",
  title: "Software Developer & Creative Problem Solver",
  bio: "I'm a passionate software developer with a love for creating innovative solutions and bringing ideas to life. With expertise in modern web technologies, I specialize in building scalable applications that deliver exceptional user experiences.",
  email: "your.email@example.com",
};

export const skills: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Git",
  "Docker",
  "AWS",
];

export const projects: Project[] = [
  {
    title: "Project One",
    description: "A full-stack web application built with modern technologies.",
    tech: ["React", "Node.js", "TypeScript"],
    link: "#",
  },
  {
    title: "Project Two",
    description: "An innovative solution for real-world problems.",
    tech: ["Python", "FastAPI", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Three",
    description: "A mobile-first responsive design with cutting-edge features.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    link: "#",
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Send Email",
    url: `mailto:${personalInfo.email}`,
    type: "email",
  },
  {
    label: "GitHub",
    url: "https://github.com",
    type: "external",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com",
    type: "external",
  },
];

export const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

