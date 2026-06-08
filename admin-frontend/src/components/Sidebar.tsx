import React from 'react';
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    Database,
    Cpu,
    Terminal,
    User,
    Activity,
    Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    user: any;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Monitor', icon: LayoutDashboard, desc: 'Central Overview' },
        { id: 'articles', label: 'Euler Engine', icon: Cpu, desc: 'Logical Nodes' },
        { id: 'messages', label: 'Transmissions', icon: MessageSquare, desc: 'Buffer Comms' },
        { id: 'settings', label: 'Atmosphere', icon: Settings, desc: 'System Styles' },
    ];

    const sidebarVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: '-100%', opacity: 0 },
    };

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-6 left-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 shadow-xl"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <AnimatePresence>
                {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                    <motion.aside
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                        className={`fixed inset-y-0 left-0 z-40 w-80 glass-panel border-r border-slate-800/40 flex flex-col lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-[0_0_100px_rgba(0,0,0,0.8)]' : '-translate-x-full'}`}
                    >
                        {/* Logo Section */}
                        <div className="p-10">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 relative group">
                                    <Terminal className="text-white group-hover:scale-110 transition-transform" size={24} />
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black tracking-tighter text-white italic">OMNIX<span className="text-blue-500 not-italic ml-0.5">OS</span></h1>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                                        <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-black">Central Core</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2">
                                {menuItems.map((item) => {
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between group px-5 py-4 rounded-2xl transition-all duration-300 ${isActive
                                                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_10px_30px_rgba(59,130,246,0.1)]'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-blue-500/10' : 'bg-transparent group-hover:bg-white/5'}`}>
                                                    <item.icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-bold tracking-tight">{item.label}</p>
                                                    <p className={`text-[10px] uppercase tracking-widest font-black transition-opacity ${isActive ? 'text-blue-500/60' : 'text-slate-700 opacity-0 group-hover:opacity-100'}`}>
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activePointer"
                                                    className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Footer Section */}
                        <div className="mt-auto p-8 space-y-6">
                            <div className="p-5 bg-slate-950/40 border border-slate-800/40 rounded-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <Box size={60} />
                                </div>

                                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mb-4 font-black">Authorized Operator</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center shadow-lg group-hover:border-blue-500/30 transition-colors">
                                        <User size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-white truncate uppercase tracking-tight">{user?.username || 'Root Admin'}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </div>
                                            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Node Live</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onLogout}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500/70 hover:text-red-500 rounded-[1.25rem] transition-all duration-400 text-[10px] font-black uppercase tracking-[0.3em] group"
                            >
                                <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Terminate Session
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
