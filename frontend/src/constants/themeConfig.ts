export interface ThemeConfig {
    id: string;
    name: string;
    baseColor: string; // e.g., 'emerald'
    backgroundColor: string; // e.g., 'bg-[#030303]'
    cardColor: string; // e.g., 'bg-white/5'
    textColor: string; // e.g., 'text-white'
    mutedTextColor: string; // e.g., 'text-gray-400'
    borderColor: string; // e.g., 'border-white/10'
    isDark: boolean;
}

export const themes: ThemeConfig[] = [
    {
        id: 'emerald',
        name: 'Emerald Night',
        baseColor: 'emerald',
        backgroundColor: 'bg-[#030303]',
        cardColor: 'bg-white/5',
        textColor: 'text-white',
        mutedTextColor: 'text-emerald-500/60',
        borderColor: 'border-emerald-500/20',
        isDark: true
    },
    {
        id: 'ruby',
        name: 'Ruby Void',
        baseColor: 'ruby',
        backgroundColor: 'bg-[#050101]',
        cardColor: 'bg-white/5',
        textColor: 'text-white',
        mutedTextColor: 'text-rose-500/60',
        borderColor: 'border-rose-500/20',
        isDark: true
    },
    {
        id: 'ocean',
        name: 'Ocean Depth',
        baseColor: 'blue',
        backgroundColor: 'bg-[#01040a]',
        cardColor: 'bg-white/5',
        textColor: 'text-white',
        mutedTextColor: 'text-blue-500/60',
        borderColor: 'border-blue-500/20',
        isDark: true
    },
    {
        id: 'amber',
        name: 'Amber Glow',
        baseColor: 'amber',
        backgroundColor: 'bg-[#080501]',
        cardColor: 'bg-white/5',
        textColor: 'text-white',
        mutedTextColor: 'text-amber-500/60',
        borderColor: 'border-amber-500/20',
        isDark: true
    },
    {
        id: 'frost',
        name: 'Pure Frost',
        baseColor: 'slate',
        backgroundColor: 'bg-white',
        cardColor: 'bg-slate-50',
        textColor: 'text-slate-900',
        mutedTextColor: 'text-slate-500',
        borderColor: 'border-slate-200',
        isDark: false
    },
    {
        id: 'lilac',
        name: 'Soft Lilac',
        baseColor: 'violet',
        backgroundColor: 'bg-[#fdfaff]',
        cardColor: 'bg-violet-50',
        textColor: 'text-violet-950',
        mutedTextColor: 'text-violet-600',
        borderColor: 'border-violet-100',
        isDark: false
    },
    {
        id: 'desert',
        name: 'Desert Sand',
        baseColor: 'orange',
        backgroundColor: 'bg-[#faf7f2]',
        cardColor: 'bg-[#f5eeda]',
        textColor: 'text-[#4a3721]',
        mutedTextColor: 'text-[#8b7355]',
        borderColor: 'border-[#e8dfcc]',
        isDark: false
    },
    {
        id: 'midnight',
        name: 'Midnight Purple',
        baseColor: 'purple',
        backgroundColor: 'bg-[#0a0118]',
        cardColor: 'bg-purple-900/10',
        textColor: 'text-white',
        mutedTextColor: 'text-purple-300',
        borderColor: 'border-purple-500/20',
        isDark: true
    },
    {
        id: 'rose',
        name: 'Vivid Rose',
        baseColor: 'rose',
        backgroundColor: 'bg-[#fff5f7]',
        cardColor: 'bg-rose-50',
        textColor: 'text-rose-950',
        mutedTextColor: 'text-rose-600',
        borderColor: 'border-rose-100',
        isDark: false
    },
    {
        id: 'nordic',
        name: 'Nordic Blue',
        baseColor: 'indigo',
        backgroundColor: 'bg-[#f0f4f8]',
        cardColor: 'bg-white',
        textColor: 'text-[#1e293b]',
        mutedTextColor: 'text-[#64748b]',
        borderColor: 'border-[#e2e8f0]',
        isDark: false
    },
    {
        id: 'lime',
        name: 'Cyber Lime',
        baseColor: 'lime',
        backgroundColor: 'bg-[#020400]',
        cardColor: 'bg-lime-900/5',
        textColor: 'text-white',
        mutedTextColor: 'text-lime-200/50',
        borderColor: 'border-lime-500/20',
        isDark: true
    },
    {
        id: 'forest',
        name: 'Deep Forest',
        baseColor: 'green',
        backgroundColor: 'bg-[#010502]',
        cardColor: 'bg-green-900/5',
        textColor: 'text-green-50',
        mutedTextColor: 'text-green-500/50',
        borderColor: 'border-green-800/20',
        isDark: true
    },
    {
        id: 'slate',
        name: 'Elegant Slate',
        baseColor: 'slate',
        backgroundColor: 'bg-[#0f172a]',
        cardColor: 'bg-slate-800/50',
        textColor: 'text-white',
        mutedTextColor: 'text-slate-400',
        borderColor: 'border-slate-700',
        isDark: true
    },
    {
        id: 'sunset',
        name: 'Warm Sunset',
        baseColor: 'red',
        backgroundColor: 'bg-[#fffcf0]',
        cardColor: 'bg-orange-50',
        textColor: 'text-orange-950',
        mutedTextColor: 'text-orange-700',
        borderColor: 'border-orange-200',
        isDark: false
    },
    {
        id: 'terminal',
        name: 'Matrix Terminal',
        baseColor: 'green',
        backgroundColor: 'bg-black',
        cardColor: 'bg-black',
        textColor: 'text-green-500',
        mutedTextColor: 'text-green-500/50',
        borderColor: 'border-green-500/30',
        isDark: true
    },
    {
        id: 'dracula',
        name: 'Dracula',
        baseColor: 'pink',
        backgroundColor: 'bg-[#282a36]',
        cardColor: 'bg-[#44475a]/50',
        textColor: 'text-[#f8f8f2]',
        mutedTextColor: 'text-[#6272a4]',
        borderColor: 'border-[#bd93f9]/30',
        isDark: true
    },
    {
        id: 'solar-light',
        name: 'Solarized Light',
        baseColor: 'teal',
        backgroundColor: 'bg-[#fdf6e3]',
        cardColor: 'bg-[#eee8d5]',
        textColor: 'text-[#073642]',
        mutedTextColor: 'text-[#586e75]',
        borderColor: 'border-[#93a1a1]/30',
        isDark: false
    },
    {
        id: 'solar-dark',
        name: 'Solarized Dark',
        baseColor: 'blue',
        backgroundColor: 'bg-[#002b36]',
        cardColor: 'bg-[#073642]',
        textColor: 'text-[#839496]',
        mutedTextColor: 'text-[#586e75]',
        borderColor: 'border-[#586e75]/30',
        isDark: true
    },
    {
        id: 'gold',
        name: 'Royal Gold',
        baseColor: 'yellow',
        backgroundColor: 'bg-[#0a0800]',
        cardColor: 'bg-yellow-900/10',
        textColor: 'text-white',
        mutedTextColor: 'text-yellow-500/50',
        borderColor: 'border-yellow-500/20',
        isDark: true
    },
    {
        id: 'carbon',
        name: 'Carbon Fiber',
        baseColor: 'slate',
        backgroundColor: 'bg-[#111111]',
        cardColor: 'bg-[#1a1a1a]',
        textColor: 'text-white',
        mutedTextColor: 'text-slate-400',
        borderColor: 'border-slate-800',
        isDark: true
    }
];
