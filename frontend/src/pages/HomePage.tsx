import { useEffect, useState } from "react";
import Terminal from "../components/Terminal";
import LandingPage from "./LandingPage";

const HomePage = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const commands = [
    "echo Hello from the homepage!",
    "ls -la",
    "pwd",
    "echo Goodbye!",
  ];

  const handleUserInput = (input: string) => {
    console.log("User typed:", input);
  };

  useEffect(()=>{
    setTimeout(()=>setIsTerminalOpen(false), 10000);
  },[]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {
        isTerminalOpen ? (
        <Terminal
          commands={commands}
          enableUserTyping={true}
          onUserInput={handleUserInput}
        />
        ) : (
          <LandingPage/>
        )
      }
    </div>
  );
};

export default HomePage;
