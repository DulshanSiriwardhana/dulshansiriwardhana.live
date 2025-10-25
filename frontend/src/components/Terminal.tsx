import { useEffect, useState } from "react";

const fakeCommands = [
  "echo Welcome to my terminal!",
  "ls -la",
  "pwd",
  "echo Thank you for visiting!",
];

const Terminal = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (commandIndex >= fakeCommands.length) return;

    const typingTimeout = setTimeout(() => {
      const nextChar = fakeCommands[commandIndex][charIndex];
      setCurrentLine((prev) => prev + nextChar);
      setCharIndex((prev) => prev + 1);

      if (charIndex + 1 === fakeCommands[commandIndex].length) {
        setOutput((prev) => [...prev, fakeCommands[commandIndex]]);
        setCurrentLine("");
        setCharIndex(0);
        setCommandIndex((prev) => prev + 1);
      }
    }, 100);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, commandIndex]);

  return (
    <div className="bg-black text-green-500 font-mono p-4 rounded-lg w-full h-64 overflow-y-auto">
      {output.map((line, idx) => (
        <div key={idx}>$ {line}</div>
      ))}
      {commandIndex < fakeCommands.length && (
        <div>
          $ {currentLine}
          <span className="inline-block w-2 h-4 bg-green-500 animate-blink ml-1"></span>
        </div>
      )}
      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
};

export default Terminal;
