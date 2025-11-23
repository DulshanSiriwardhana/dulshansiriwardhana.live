interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-5xl md:text-6xl font-bold text-green-400">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400"></div>
      </div>
      {subtitle && (
        <p className="text-lg text-gray-400 mt-4">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;

