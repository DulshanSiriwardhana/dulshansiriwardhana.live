import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createProjectEulerArticle,
  updateProjectEulerArticle,
  getProjectEulerArticles,
  deleteProjectEulerArticle,
  ProjectEulerArticleData,
  getMessages,
  markMessageAsRead,
  deleteMessage,
  getCvTheme,
  updateCvTheme,
} from '../utils/api';
import { themes } from '../constants/themeConfig';
import type { ProjectEulerArticle, Message } from '../utils/api';
import Toast from '../components/Toast';
import Sidebar from '../components/Sidebar';
import {
  LayoutDashboard,
  Cpu,
  MessageSquare,
  Settings,
  Loader2,
  Fingerprint,
  Box,
  Save,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  Activity,
  ChevronRight,
  Search,
  Bell,
  RefreshCcw,
  AlertCircle,
  FileCode,
  Terminal,
  Database
} from 'lucide-react';


interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

type TabType = 'articles' | 'messages' | 'dashboard' | 'settings';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [articles, setArticles] = useState<ProjectEulerArticle[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [cvTheme, setCvTheme] = useState('emerald');
  const [themeSaving, setThemeSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messagesTotal, setMessagesTotal] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<ProjectEulerArticle>({
    problemNumber: 1,

    title: '',
    description: '',
    problemStatement: '',
    solution: {
      code: '',
      language: 'Python',
      explanation: '',
      timeComplexity: '',
      spaceComplexity: '',
    },
    tags: [],
    difficulty: 'Medium',
    published: false,
  });
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });

  const colorMap: Record<string, string> = {
    emerald: '#10b981',
    ruby: '#e11d48',
    rose: '#f43f5e',
    blue: '#3b82f6',
    amber: '#f59e0b',
    slate: '#64748b',
    violet: '#8b5cf6',
    orange: '#f97316',
    purple: '#a855f7',
    indigo: '#6366f1',
    lime: '#84cc16',
    green: '#22c55e',
    red: '#ef4444',
    pink: '#ec4899',
    teal: '#14b8a6',
    yellow: '#eab308'
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    loadArticles();
    loadMessages();
    loadCvTheme();
  }, []);

  useEffect(() => {
    if (activeTab === 'messages') {
      loadMessages();
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/login');
  };

  const loadArticles = async () => {
    try {
      const response = await getProjectEulerArticles();
      // The API returns { data: [...], pagination: { total: ... } }
      const articlesList = response?.data || response || [];
      setArticles(Array.isArray(articlesList) ? articlesList : []);
    } catch (error) {
      showToast('Error loading articles', 'error');
    }
  };


  const loadMessages = async () => {
    try {
      const response = await getMessages(1);
      // The API returns { data: [...], pagination: { total: ... } }
      const messagesList = response?.data || [];
      const total = response?.pagination?.total || 0;

      setMessages(Array.isArray(messagesList) ? messagesList : []);
      setMessagesTotal(total);
    } catch (error) {
      showToast('Error loading messages', 'error');
    }
  };



  const loadCvTheme = async () => {
    try {
      const data = await getCvTheme();
      // The API returns { key: 'cv_theme', value: '...' } or just the value
      const themeValue = data?.value || data || 'emerald';
      setCvTheme(themeValue);
    } catch (error) {
      console.error('Error loading CV theme:', error);
    }
  };


  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && formData._id) {
        await updateProjectEulerArticle(formData._id, formData);
        showToast('Article synchronized successfully', 'success');
      } else {
        await createProjectEulerArticle(formData);
        showToast('New node initialized successfully', 'success');
      }
      resetForm();
      loadArticles();
    } catch (error) {
      showToast('Protocol failure: Synthesis error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: ProjectEulerArticle) => {
    setFormData({
      _id: article._id,
      problemNumber: article.problemNumber,
      title: article.title,
      description: article.description,
      problemStatement: article.problemStatement || '',
      solution: article.solution,
      tags: article.tags || [],
      difficulty: article.difficulty,
      published: article.published,
    });
    setIsEditing(true);
    setActiveTab('articles');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('PROTOCOL WARNING: Destructive operation imminent. Proceed?')) {
      try {
        await deleteProjectEulerArticle(id);
        showToast('Node purged from registry', 'success');
        loadArticles();
      } catch (error) {
        showToast('Error purging node', 'error');
      }
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      loadMessages();
      showToast('Signal acknowledged', 'success');
    } catch (error) {
      showToast('Error acknowledging signal', 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Purge this transmission?')) {
      try {
        await deleteMessage(id);
        loadMessages();
        showToast('Transmission purged', 'success');
      } catch (error) {
        showToast('Error purging transmission', 'error');
      }
    }
  };

  const handleUpdateTheme = async (themeId: string) => {
    setThemeSaving(true);
    try {
      const data = await updateCvTheme(themeId);
      const newValue = data?.value || data || themeId;
      setCvTheme(newValue);
      showToast(`Atmosphere synchronized to ${themeId}`, 'success');
    } catch (error) {
      showToast('Atmosphere sync failed', 'error');
    } finally {
      setThemeSaving(false);
    }
  };


  const resetForm = () => {
    setFormData({
      problemNumber: 1,
      title: '',
      description: '',
      problemStatement: '',
      solution: {
        code: '',
        language: 'Python',
        explanation: '',
        timeComplexity: '',
        spaceComplexity: '',
      },
      tags: [],
      difficulty: 'Medium',
      published: false,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Sidebar Integration */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" />

        <header className="h-20 flex items-center px-12 justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/10 p-2 rounded-xl text-blue-500 border border-blue-500/10">
              {activeTab === 'dashboard' && <LayoutDashboard size={20} />}
              {activeTab === 'articles' && <Cpu size={20} />}
              {activeTab === 'messages' && <MessageSquare size={20} />}
              {activeTab === 'settings' && <Settings size={20} />}
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-white italic">{activeTab}</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Protocol 7.0.1 // Localhost</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <Bell size={14} className="text-slate-500" />
              <div className="w-[1px] h-3 bg-slate-800" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-12 py-8 custom-scrollbar relative z-10">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'Articles', value: (articles || []).length, color: 'blue', icon: Cpu },
                { label: 'Unread', value: (messages || []).filter((m: Message) => !m?.read).length, color: 'indigo', icon: MessageSquare },
                { label: 'Throughput', value: messagesTotal || 0, color: 'blue', icon: Activity },
                { label: 'Latency', value: '0.04ms', color: 'emerald', icon: Box },
              ].map((stat, i) => (

                <div key={i} className="glass-panel p-8 rounded-3xl border border-slate-800/40 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden">
                  <div className={`absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12`}>
                    <stat.icon size={80} />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                      <stat.icon size={18} />
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-[.2em] font-black">{stat.label}</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-black text-white tracking-tighter italic">{stat.value}</p>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
              <div className="xl:col-span-5">
                <div className="glass-panel p-8 rounded-3xl sticky top-8 border-slate-800/40">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">
                        {isEditing ? 'Sync Node' : 'Initialize Article'}
                      </h3>
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">Euler Engine Protocol</p>
                    </div>
                    {isEditing && (
                      <button
                        onClick={resetForm}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] text-slate-400 hover:text-white uppercase tracking-widest font-black transition-all"
                      >
                        Abort
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black ml-1">Logic ID</label>
                        <div className="relative">
                          <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                          <input
                            type="number"
                            value={formData.problemNumber}
                            onChange={(e) => setFormData({ ...formData, problemNumber: parseInt(e.target.value) || 1 })}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white font-mono text-xs focus:border-blue-500/50 outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black ml-1">Threshold</label>
                        <select
                          value={formData.difficulty}
                          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                          className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white font-mono text-xs focus:border-blue-500/50 outline-none transition-all cursor-pointer appearance-none"
                        >
                          <option value="Easy">L1 // TRIVIAL</option>
                          <option value="Medium">L2 // MODERATE</option>
                          <option value="Hard">L3 // CRITICAL</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black ml-1">Header Label</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                        required
                        placeholder="Algorithm designation..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black ml-1">Executive Summary</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
                        rows={2}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between ml-1">
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Code Matrix</label>
                        <FileCode size={14} className="text-slate-600" />
                      </div>
                      <textarea
                        value={formData.solution.code}
                        onChange={(e) => setFormData({ ...formData, solution: { ...formData.solution, code: e.target.value } })}
                        className="w-full px-5 py-5 bg-slate-950 border border-slate-800 rounded-2xl text-blue-400 font-mono text-xs focus:border-blue-500/50 outline-none transition-all resize-none shadow-inner"
                        rows={8}
                        required
                        placeholder="def solution(): ..."
                      />
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 group cursor-pointer" onClick={() => setFormData({ ...formData, published: !formData.published })}>
                      <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${formData.published ? 'bg-blue-600' : 'bg-slate-800'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${formData.published ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                      <div>
                        <p className="text-[10px] text-white uppercase tracking-widest font-black">Live Broadcast</p>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Sync to main interface</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : (isEditing ? <RefreshCcw size={18} /> : <Plus size={18} />)}
                      {loading ? 'PROCESSING...' : (isEditing ? 'SYNC UPDATES' : 'INITIALIZE NODE')}
                    </button>
                  </form>
                </div>
              </div>

              <div className="xl:col-span-7 space-y-4">
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/10 rounded-lg text-blue-400">
                      <Terminal size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-widest">Article Registry</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{articles.length} Synchronized Nodes</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                    <input
                      type="text"
                      placeholder="FILTER NODES..."
                      className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-[10px] font-black tracking-widest text-white outline-none focus:border-blue-500/50 w-48"
                    />
                  </div>
                </div>

                <div className="grid gap-4 overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
                  {articles.map((article) => (
                    <div key={article._id} className="glass-panel p-6 rounded-3xl border border-slate-800/40 hover:border-blue-500/30 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center group-hover:border-blue-500/30 transition-colors">
                          <span className="text-[8px] text-slate-500 font-black uppercase mb-0.5">Node</span>
                          <span className="text-lg font-black text-white tracking-tighter italic">#{article.problemNumber}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight italic leading-tight mb-2">{article.title}</h4>
                          <div className="flex gap-4 items-center">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${article.difficulty === 'Easy' ? 'bg-emerald-500' :
                                article.difficulty === 'Medium' ? 'bg-blue-500' : 'bg-rose-500'
                                }`} />
                              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{article.difficulty}</span>
                            </div>
                            <div className="w-1 h-1 bg-slate-800 rounded-full" />
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">{article.solution.language}</span>
                            <div className="w-1 h-1 bg-slate-800 rounded-full" />
                            <span className={`text-[9px] font-black uppercase tracking-widest ${article.published ? 'text-blue-500' : 'text-slate-600'}`}>
                              {article.published ? 'LIVE' : 'IDLE'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(article)} className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all group/btn">
                          <Edit3 size={18} className="transition-transform group-hover/btn:scale-110" />
                        </button>
                        <button onClick={() => article._id && handleDelete(article._id)} className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:bg-rose-600 hover:text-white hover:border-rose-500 transition-all group/btn">
                          <Trash2 size={18} className="transition-transform group-hover/btn:scale-110" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-400 shadow-xl shadow-blue-600/5">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Transmission Buffer</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Central Communication Nodes</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Buffer Live</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {messages.length === 0 ? (
                  <div className="glass-panel p-20 rounded-[2rem] border border-slate-800/40 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-950 border border-slate-800 rounded-3xl flex items-center justify-center mb-6 opacity-40">
                      <MessageSquare size={40} className="text-slate-600" />
                    </div>
                    <h4 className="text-lg font-black text-slate-400 uppercase tracking-[0.2em]">No Active Transmissions</h4>
                    <p className="text-xs text-slate-600 uppercase tracking-widest mt-2 font-bold">Buffer is currently clear</p>
                  </div>
                ) : messages.map((msg) => (
                  <div key={msg._id} className={`glass-panel p-8 rounded-[2rem] transition-all border border-slate-800/40 relative overflow-hidden group hover:border-blue-500/30 ${!msg.read ? 'bg-blue-600/[0.02]' : ''}`}>
                    {!msg.read && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[2px_0_15px_rgba(59,130,246,0.5)]" />
                    )}

                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors ${!msg.read ? 'bg-blue-600/10 border-blue-500/20 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                          <Fingerprint size={24} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-black uppercase tracking-tight italic transition-colors ${!msg.read ? 'text-white' : 'text-slate-400'}`}>{msg.subject}</h3>
                          <div className="flex items-center gap-3 mt-1.5">
                            <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">{msg.name}</p>
                            <div className="w-1 h-1 bg-slate-800 rounded-full" />
                            <p className="text-[10px] text-slate-500 font-bold tracking-widest">{msg.email}</p>
                          </div>
                        </div>
                      </div>
                      {!msg.read && (
                        <div className="px-3 py-1.5 bg-blue-600 rounded-xl text-[9px] font-black text-white uppercase tracking-widest animate-pulse shadow-lg shadow-blue-600/20">
                          New Signal
                        </div>
                      )}
                    </div>

                    <div className="relative group/msg">
                      <p className="text-slate-400 bg-slate-950/50 p-8 rounded-3xl border border-slate-800/40 text-sm leading-relaxed font-medium transition-colors group-hover:border-slate-700/60 group-hover:text-slate-300">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                      <div className="flex items-center gap-2">
                        <Activity size={12} className="text-slate-600" />
                        <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">Captured: {msg.createdAt && new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex gap-3">
                        {!msg.read && (
                          <button
                            onClick={() => msg._id && handleMarkAsRead(msg._id)}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/10 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                          >
                            <CheckCircle2 size={14} />
                            Acknowledge
                          </button>
                        )}
                        <button
                          onClick={() => msg._id && handleDeleteMessage(msg._id)}
                          className="px-6 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:bg-rose-600 hover:text-white hover:border-rose-500 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                        >
                          <Trash2 size={14} />
                          Purge
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-5xl mx-auto">
              <div className="glass-panel p-12 rounded-[2.5rem] border border-slate-800/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                  <Settings size={200} />
                </div>

                <header className="mb-12 relative">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-400">
                      <Settings size={24} />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">System Atmosphere</h3>
                  </div>
                  <p className="text-xs text-slate-500 uppercase tracking-[.2em] font-bold ml-14">Central Core Configuration</p>
                </header>

                <div className="space-y-12">
                  <section>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Chromatic Spectrum Synthesis</h4>
                      </div>
                      {themeSaving && (
                        <div className="flex items-center gap-2 text-blue-400 font-black text-[9px] uppercase tracking-widest animate-pulse">
                          <Loader2 size={14} className="animate-spin" />
                          Broadcasting...
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleUpdateTheme(theme.id)}
                          className={`group relative p-0 rounded-[2rem] border-2 transition-all duration-500 overflow-hidden flex flex-col text-left ${cvTheme === theme.id ? 'border-blue-500 ring-8 ring-blue-500/10' : 'border-slate-800 hover:border-slate-700'}`}
                        >
                          <div className={`h-28 w-full relative ${theme.backgroundColor} flex items-center justify-center`}>
                            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                            <div className="absolute top-3 right-3">
                              <div className={`px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-widest ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                                {theme.isDark ? 'Void' : 'Lumos'}
                              </div>
                            </div>

                            <div className="relative">
                              <div className="w-12 h-12 rounded-2xl shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500" style={{ backgroundColor: colorMap[theme.baseColor] }}>
                                <div className="w-6 h-6 border-2 border-white/30 rounded-full" />
                              </div>
                            </div>

                            {cvTheme === theme.id && (
                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                                <div className="px-3 py-1 bg-blue-600 rounded-full text-[7px] font-black text-white uppercase tracking-widest flex items-center gap-1.5 shadow-xl shadow-blue-600/40">
                                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                  Active
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="p-5 bg-slate-950 flex-grow border-t border-slate-900">
                            <h5 className="text-xs font-black text-white mb-2 uppercase tracking-widest group-hover:text-blue-400 transition-colors">{theme.name}</h5>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Base</span>
                                <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">{theme.baseColor}</span>
                              </div>
                              <div className="w-full h-[1px] bg-slate-900" />
                              <div className="flex items-center justify-between">
                                <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Type</span>
                                <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">{theme.isDark ? 'Opaque' : 'Translucent'}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="p-8 bg-slate-950 border border-slate-800 rounded-[2rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <AlertCircle size={60} />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                        <AlertCircle size={18} />
                      </div>
                      <h4 className="text-sm font-black text-white uppercase tracking-widest">Environment Warning</h4>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl mb-2">
                      Atmosphere modifications are broadcast in real-time across the global content delivery network.
                    </p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                      Protocol // SYNC_IMMEDIATE // BUFFER_NONE
                    </p>
                  </section>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
};

export default AdminPanel;
