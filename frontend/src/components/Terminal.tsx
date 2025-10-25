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
    <div className="bg-black text-green-500 font-mono rounded-lg w-full max-w-xl h-64 overflow-y-auto border overflow-hidden">
        <div className="w-full h-10 border flex flex-row items-center justify-between relative">
            <div className="flex flex-row items-center gap-1 px-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
            <div className="w-full flex items-center justify-center absolute">hi!</div>
        </div>
        <div className="p-4">
            {output.map((line, idx) => (
                <div key={idx}>$ {line}</div>
            ))}
            {commandIndex < fakeCommands.length && (
                <div>
                $ {currentLine}
                <span className="inline-block w-2 h-4 bg-green-500 animate-blink ml-1"></span>
                </div>
            )}
        </div>
    </div>
  );
};

export default Terminal;
