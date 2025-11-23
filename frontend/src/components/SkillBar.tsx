import { useEffect, useState } from "react";
import ScrollAnimation from "./ScrollAnimation";

interface SkillBarProps {
  skill: string;
  level: number;
  delay?: number;
}

const SkillBar = ({ skill, level, delay = 0 }: SkillBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(level);
    }, delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <ScrollAnimation delay={delay} direction="left">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">{skill}</span>
          <span className="text-green-400 text-sm">{level}%</span>
        </div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default SkillBar;

