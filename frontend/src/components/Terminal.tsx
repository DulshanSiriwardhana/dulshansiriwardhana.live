import { useEffect, useState, useRef } from "react";
import { useTypingSound } from "../context/TypingSoundEffect";

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
  const [initialCommandCount, setInitialCommandCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound, stopSound, resetSound } = useTypingSound();

  useEffect(() => {
    playSound({ delay: 0, volume: 1, loop: true });

    return () => {
      stopSound();
      resetSound();
    };
  }, [playSound, stopSound, resetSound, commands]);

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
    } else if (commandIndex === commands.length && initialCommandCount === 0) {
      setInitialCommandCount(commands.length);
    }
  }, [charIndex, commandIndex, commands, initialCommandCount]);

  useEffect(() => {
    if (enableUserTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [enableUserTyping]);

  const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInput.trim()) {
        if (userInput.trim().toLowerCase() === "clear") {
          setOutput((prev) => prev.slice(0, initialCommandCount));
          setUserInput("");
        } else {
          onUserInput && onUserInput(userInput);
          setOutput((prev) => [...prev, `$ ${userInput}`]);
          setUserInput("");
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="bg-black text-green-500 font-mono rounded-lg w-full max-w-xl h-[500px] border border-green-500 overflow-hidden flex flex-col">
      <div className="w-full h-10 border flex flex-row items-center justify-between rounded-t-lg relative">
        <div className="flex flex-row items-center gap-1 px-4 rounded-t-lg">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
        </div>
        <div className="w-full flex items-center justify-center absolute">hi!</div>
      </div>
      <div className="p-4 overflow-y-auto h-fit green-scrollbar">
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
            <span className="mr-[10px]">$</span>
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