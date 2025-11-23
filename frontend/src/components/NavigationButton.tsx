interface NavigationButtonProps {
  href: string;
  label: string;
}

const NavigationButton = ({ href, label }: NavigationButtonProps) => {
  return (
    <a
      href={href}
      className="px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
    >
      {label}
    </a>
  );
};

export default NavigationButton;

