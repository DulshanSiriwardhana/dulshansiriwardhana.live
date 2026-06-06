import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ value, suffix = "", duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  // Detect if the value is a decimal
  const isDecimal = value.includes(".");
  const decimalPlaces = isDecimal ? value.split(".")[1].length : 0;

  // Parse as float but remove non-numeric chars except the decimal point
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(easeOutQuart * numericValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [numericValue, duration]);

  return (
    <span>
      {isDecimal
        ? count.toFixed(decimalPlaces)
        : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;

