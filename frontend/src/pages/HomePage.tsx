import Terminal from "../components/Terminal";

const HomePage = () => {
  const commands = [
    "echo Hello from the homepage!",
    "ls -la",
    "pwd",
    "echo Goodbye!",
  ];

  const handleUserInput = (input: string) => {
    console.log("User typed:", input);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Terminal
        commands={commands}
        enableUserTyping={true}
        onUserInput={handleUserInput}
      />
    </div>
  );
};

export default HomePage;
