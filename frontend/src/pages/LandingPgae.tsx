const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white font-spectral flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Main content */}
      <div className="z-10 max-w-4xl w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="block text-white">Dulshan</span>
            <span className="block text-green-400 mt-2">Siriwardhana</span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-green-400"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-green-400"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            Software Developer & Creative Problem Solver
          </p>
        </div>

        {/* Navigation/Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <a
            href="#about"
            className="px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
          >
            About
          </a>
          <a
            href="#projects"
            className="px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
          >
            Contact
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 mt-16 animate-bounce">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;