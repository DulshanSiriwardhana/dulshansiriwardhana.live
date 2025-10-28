import { useEffect, useState, useRef } from "react";

interface TerminalProps {
  commands?: string[];
  enableUserTyping?: boolean;
  onUserInput?: (input: string) => void;
}

const Terminal = ({ commands = [], enableUserTyping = false, onUserInput }: TerminalProps) => {
  const [output, setOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [userInput, setUserInput] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandIndex < commands.length) {
      const typingTimeout = setTimeout(() => {
        const nextChar = commands[commandIndex][charIndex];
        setCurrentLine((prev) => prev + nextChar);
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === commands[commandIndex].length) {
          setOutput((prev) => [...prev, `$ ${commands[commandIndex]}`]);
          setCurrentLine("");
          setCharIndex(0);
          setCommandIndex((prev) => prev + 1);
        }
      }, 100);

      return () => clearTimeout(typingTimeout);
    }
  }, [charIndex, commandIndex, commands]);

  useEffect(() => {
    if (enableUserTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [enableUserTyping]);

  const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInput.trim()) {
        onUserInput && onUserInput(userInput);
        setOutput((prev) => [...prev, `$ ${userInput}`]);
        setUserInput("");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="bg-black text-green-500 font-mono rounded-lg w-full max-w-xl h-64 overflow-y-auto border border-green-500">
      <div className="p-4">
        {output.map((line, idx) => (
          <div key={idx} className="mb-1">{line}</div>
        ))}
        {commandIndex < commands.length && (
          <div className="flex items-center">
            <span className="mr-2">$</span>
            <span>{currentLine}<span className="animate-pulse">_</span></span>
          </div>
        )}
        {enableUserTyping && commandIndex >= commands.length && (
          <div className="flex items-center">
            <span className="mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleChange}
              onKeyDown={handleUserInput}
              className="bg-transparent outline-none text-green-500 flex-1 caret-green-500"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;