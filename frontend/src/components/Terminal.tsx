import { useEffect, useState, useRef, useCallback } from "react";
import { useTypingSound } from "../context/TypingSoundEffect";
import { personalInfo } from "../constants/landingPageData";

interface TerminalProps {
  onComplete?: () => void;
}

interface Command {
  text: string;
  output?: string[];
  delay?: number;
}

const Terminal = ({ onComplete }: TerminalProps) => {
  const [output, setOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const outputRef = useRef<HTMLDivElement>(null);
  const { playSound, stopSound, resetSound } = useTypingSound();

  // Auto-scroll to bottom function - memoized for stability
  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      });
    }
  }, []);

  const commands: Command[] = [
    {
      text: "whoami",
      output: [
        `${personalInfo.firstName} ${personalInfo.lastName}`,
        `${personalInfo.title}`,
        `Location: ${personalInfo.location}`,
      ],
      delay: 50,
    },
    {
      text: "cat about.txt",
      output: [
        personalInfo.bio,
        "",
        "Skills: Blockchain Development, Full-Stack Development",
        "Education: University of Ruhuna - Computer Engineering",
      ],
      delay: 30,
    },
    {
      text: "ls -la projects/",
      output: [
        "total 6",
        "drwxr-xr-x  HDLGenHub",
        "drwxr-xr-x  DeedLink",
        "drwxr-xr-x  ChessPlayerManagement",
        "drwxr-xr-x  EthereumTokenDevelopment",
        "-rw-r--r--  README.md",
      ],
      delay: 40,
    },
    {
      text: "git status",
      output: [
        "On branch main",
        "Your branch is up to date with 'origin/main'.",
        "",
        "nothing to commit, working tree clean",
        "",
        "✨ Portfolio ready to deploy!",
      ],
      delay: 50,
    },
    {
      text: "npm run start",
      output: [
        "> portfolio@1.0.0 start",
        "> vite",
        "",
        "  VITE v7.1.7  ready in 234 ms",
        "",
        "  ➜  Local:   http://localhost:5173/",
        "  ➜  Network: use --host to expose",
        "",
        "🚀 Welcome to my portfolio!",
      ],
      delay: 60,
    },
  ];


  useEffect(() => {
    playSound({ delay: 0, volume: 0.3, loop: true });
    return () => {
      stopSound();
      resetSound();
    };
  }, [playSound, stopSound, resetSound]);

  useEffect(() => {
    if (commandIndex < commands.length && isTyping) {
      const command = commands[commandIndex];
      const typingDelay = command.delay || 50;

      if (charIndex < command.text.length) {
        const timeout = setTimeout(() => {
          setCurrentLine((prev) => prev + command.text[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, typingDelay);

        return () => clearTimeout(timeout);
      } else {
        // Command typed, show output
        setTimeout(() => {
          setOutput((prev) => [...prev, `$ ${command.text}`]);
          setCurrentLine("");
          setCharIndex(0);

          if (command.output) {
            setTimeout(() => {
              setOutput((prev) => [...prev, ...command.output!]);
              setCommandIndex((prev) => prev + 1);
              setCharIndex(0);
            }, 300);
          } else {
            setCommandIndex((prev) => prev + 1);
            setCharIndex(0);
          }
        }, 500);
      }
    } else if (commandIndex >= commands.length && isTyping) {
      setIsTyping(false);
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    }
  }, [charIndex, commandIndex, isTyping, onComplete, commands]);

  useEffect(() => {
    // Cursor blink animation
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-scroll to bottom whenever output changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 50);
    return () => clearTimeout(timeout);
  }, [output, currentLine, scrollToBottom]);

  // Also scroll on every character typed
  useEffect(() => {
    if (isTyping && charIndex > 0) {
      // Small delay to ensure DOM is updated
      const timeout = setTimeout(() => {
        scrollToBottom();
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isTyping, scrollToBottom]);

  const getOutputColor = (line: string): string => {
    if (line.startsWith("$")) return "text-green-400";
    if (line.startsWith("drwx") || line.startsWith("-rw")) return "text-blue-400";
    if (line.includes("✨") || line.includes("🚀")) return "text-yellow-400";
    if (line.startsWith(">") || line.startsWith("VITE")) return "text-cyan-400";
    return "text-gray-300";
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-[#0a0a0a] border border-green-500/30 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border-b border-green-500/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            dulshan@portfolio:~$
          </div>
          <div className="w-16"></div>
        </div>

        {/* Terminal Body */}
        <div
          ref={outputRef}
          className="p-6 h-[500px] md:h-[600px] overflow-y-auto green-scrollbar font-mono text-sm scroll-smooth"
        >
          <div className="space-y-1">
            {/* Welcome Message */}
            {output.length === 0 && (
              <div className="text-green-400 mb-4">
                <div className="text-lg font-bold mb-2">
                  Welcome to {personalInfo.firstName}'s Portfolio Terminal
                </div>
                <div className="text-gray-400 text-xs">
                  Type commands to explore... (or wait for auto-demo)
                </div>
              </div>
            )}

            {/* Output Lines */}
            {output.map((line, idx) => (
              <div
                key={idx}
                className={`${getOutputColor(line)} ${
                  line === "" ? "h-2" : ""
                }`}
              >
                {line}
              </div>
            ))}

            {/* Current Typing Line */}
            {isTyping && commandIndex < commands.length && (
              <div className="flex items-center text-green-400">
                <span className="mr-2">$</span>
                <span>
                  {currentLine}
                  <span className={showCursor ? "opacity-100" : "opacity-0"}>
                    ▊
                  </span>
                </span>
              </div>
            )}

            {/* Completion Message */}
            {!isTyping && commandIndex >= commands.length && (
              <div className="mt-4 space-y-2">
                <div className="text-green-400">
                  $ <span className="text-gray-400">// Terminal session complete</span>
                </div>
                <div className="text-yellow-400 text-sm mt-4">
                  🎉 Loading portfolio...
                </div>
                <div className="flex gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
