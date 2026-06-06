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
  const [selectedArticle, setSelectedArticle] = useState<ProjectEulerArticle | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [cvTheme, setCvTheme] = useState('emerald');
  const [themeSaving, setThemeSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesTotal, setMessagesTotal] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<ProjectEulerArticleData>({
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
  const [tagInput, setTagInput] = useState('');
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
  }, [messagesPage, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/login');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
  };

  const loadArticles = async () => {
    setArticlesLoading(true);
    try {
      const response = await getProjectEulerArticles(1, 100, '-problemNumber', '', '', '');
      setArticles(response.data);
    } catch (error) {
      showToast('Failed to load articles', 'error');
    } finally {
      setArticlesLoading(false);
    }
  };

  const loadMessages = async () => {
    setMessagesLoading(true);
    try {
      const response = await getMessages(messagesPage, 20, '-createdAt');
      setMessages(response.data);
      setMessagesTotal(response.pagination.total);
    } catch (error) {
      showToast('Failed to load messages', 'error');
    } finally {
      setMessagesLoading(false);
    }
  };

  const loadCvTheme = async () => {
    try {
      const response = await getCvTheme();
      if (response && response.value) setCvTheme(response.value);
    } catch (error) {
      console.error('Failed to load CV theme');
    }
  };

  const handleUpdateTheme = async (theme: string) => {
    setThemeSaving(true);
    try {
      await updateCvTheme(theme);
      setCvTheme(theme);
      showToast('CV theme synchronized', 'success');
    } catch (error: any) {
      showToast(error.message || 'Synchronization failed', 'error');
    } finally {
      setThemeSaving(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      setMessages(messages.map(msg => msg._id === id ? { ...msg, read: true } : msg));
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
      showToast('Message marked as read', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to mark as read', 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteMessage(id);
      setMessages(messages.filter(msg => msg._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      showToast('Message deleted', 'success');
      loadMessages();
    } catch (error: any) {
      showToast('Deletion failed', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && selectedArticle) {
        await updateProjectEulerArticle(selectedArticle._id!, formData);
        showToast('Article updated', 'success');
      } else {
        await createProjectEulerArticle(formData);
        showToast('Article created', 'success');
      }
      resetForm();
      loadArticles();
    } catch (error: any) {
      showToast('Saving failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: ProjectEulerArticle) => {
    setSelectedArticle(article);
    setIsEditing(true);
    setFormData({
      problemNumber: article.problemNumber,
      title: article.title,
      description: article.description,
      problemStatement: article.problemStatement,
      solution: article.solution,
      tags: article.tags,
      difficulty: article.difficulty,
      published: article.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      await deleteProjectEulerArticle(id);
      showToast('Article deleted', 'success');
      loadArticles();
      if (selectedArticle?._id === id) {
        resetForm();
      }
    } catch (error: any) {
      showToast('Deletion failed', 'error');
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
    setSelectedArticle(null);
    setIsEditing(false);
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  return (
    <div className="h-screen bg-[#020202] text-[#e5e7eb] flex overflow-hidden font-spectral noise-overlay scanlines">
      <div className="w-64 glass-panel border-r border-green-500/20 flex flex-col z-20">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 border border-green-500/50 rounded-lg flex items-center justify-center bg-green-500/10">
              <span className="text-green-400 font-bold text-xl">Ω</span>
            </div>
            <h1 className="text-xl font-bold tracking-widest text-white uppercase">Omnix</h1>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Monitor', icon: '📊' },
              { id: 'articles', label: 'Euler Engine', icon: '🧮' },
              { id: 'messages', label: 'Comms', icon: '📡' },
              { id: 'settings', label: 'Configs', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mono text-xs uppercase tracking-widest ${activeTab === tab.id
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30 active-tab-glow'
                  : 'text-gray-500 hover:text-green-400 hover:bg-green-500/5 border border-transparent'
                  }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
            <p className="text-[10px] text-gray-500 mono uppercase mb-2">Authenticated As</p>
            <p className="text-sm font-bold text-green-400 truncate">{user?.username || 'GUEST'}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] text-green-500/60 uppercase mono tracking-tighter">System Online</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 mono text-[10px] uppercase tracking-widest"
          >
            Terminal Exit
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="h-20 glass-panel border-b border-green-500/10 flex items-center px-10 justify-between">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-[0.2em]">{activeTab} Terminal</h2>
            <p className="text-xs text-green-500/50 mono uppercase">Rev. 7.0.1-Local // Siriwardhana OS</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] text-gray-500 mono uppercase">Uptime</p>
                <p className="text-sm font-bold text-green-400">100.0%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 mono uppercase">Nodes</p>
                <p className="text-sm font-bold text-green-400">Primary_01</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 green-scrollbar animate-slide-up">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'Total Articles', value: articles.length, color: 'green' },
                { label: 'Unread Messages', value: messages.filter(m => !m.read).length, color: 'blue' },
                { label: 'Comms Throughput', value: messagesTotal, color: 'green' },
                { label: 'System Load', value: '0.04 ms', color: 'green' },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl border-green-500/20 hover:border-green-500/40 transition-all duration-500 group">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 mono">{stat.label}</p>
                  <p className={`text-4xl font-bold text-${stat.color}-400 group-hover:scale-110 transition-transform`}>{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
              <div className="xl:col-span-5">
                <div className="glass-panel p-8 rounded-3xl sticky top-0 border-green-500/20">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                      {isEditing ? 'Update Node' : 'Register Solution'}
                    </h3>
                    {isEditing && (
                      <button onClick={resetForm} className="text-xs text-green-500 hover:underline mono">[ABORT]</button>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase mono">Problem ID</label>
                        <input
                          type="number"
                          value={formData.problemNumber}
                          onChange={(e) => setFormData({ ...formData, problemNumber: parseInt(e.target.value) || 1 })}
                          className="w-full px-4 py-3 bg-black/40 border border-green-500/10 rounded-xl text-white mono text-sm"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase mono">Complexity</label>
                        <select
                          value={formData.difficulty}
                          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                          className="w-full px-4 py-3 bg-black/40 border border-green-500/10 rounded-xl text-white mono text-sm cursor-pointer"
                        >
                          <option value="Easy">L1: Easy</option>
                          <option value="Medium">L2: Medium</option>
                          <option value="Hard">L3: Hard</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase mono">Solution Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-green-500/10 rounded-xl text-white text-sm"
                        required
                        placeholder="Prime Summation Algorithm..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase mono">Narrative</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-green-500/10 rounded-xl text-white text-sm resize-none"
                        rows={2}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase mono">Logic Buffer (Code)</label>
                      <textarea
                        value={formData.solution.code}
                        onChange={(e) => setFormData({ ...formData, solution: { ...formData.solution, code: e.target.value } })}
                        className="w-full px-4 py-4 bg-black/60 border border-green-500/20 rounded-xl text-green-400 font-mono text-xs resize-none"
                        rows={8}
                        required
                        placeholder="class Solution: ..."
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                      <input
                        type="checkbox"
                        id="pub-check"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-5 h-5 rounded border-green-500/30 bg-black text-green-500 accent-green-500 cursor-pointer"
                      />
                      <label htmlFor="pub-check" className="text-xs text-gray-400 uppercase tracking-widest cursor-pointer mono">Broadcast to Live Web</label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 active:scale-95 transition-all shadow-lg shadow-green-500/20 uppercase tracking-[0.2em]"
                    >
                      {loading ? 'Processing...' : isEditing ? 'Push Updates' : 'Deploy Article'}
                    </button>
                  </form>
                </div>
              </div>

              <div className="xl:col-span-7 space-y-4">
                {articles.map((article) => (
                  <div key={article._id} className="glass-panel p-6 rounded-2xl border-green-500/10 hover:border-green-500/50 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-black/40 border border-green-500/20 rounded-xl flex items-center justify-center text-green-400 font-bold mono">
                        #{article.problemNumber}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors uppercase tracking-tight">{article.title}</h4>
                        <div className="flex gap-3 items-center mt-1">
                          <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded uppercase mono">{article.difficulty}</span>
                          <span className="text-[10px] text-gray-500 uppercase mono">{article.solution.language}</span>
                          <span className={`text-[10px] uppercase mono ${article.published ? 'text-green-400' : 'text-yellow-500'}`}>
                            {article.published ? 'LIVE' : 'BUFFERED'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(article)} className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => article._id && handleDelete(article._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div key={msg._id} className={`glass-panel p-8 rounded-3xl transition-all border-l-4 ${msg.read ? 'border-green-500/10' : 'border-blue-500 active-tab-glow'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold uppercase tracking-tight ${msg.read ? 'text-gray-300' : 'text-white'}`}>{msg.subject}</h3>
                      <p className="text-sm text-green-500 mono mt-1">{msg.name} // {msg.email}</p>
                    </div>
                    {!msg.read && <span className="px-3 py-1 bg-blue-500 text-[10px] font-bold text-white rounded-full uppercase mono animate-pulse">New Transmission</span>}
                  </div>
                  <p className="text-gray-400 bg-black/30 p-6 rounded-2xl border border-white/5 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-[10px] text-gray-600 mono uppercase tracking-widest">Captured: {msg.createdAt && new Date(msg.createdAt).toLocaleString()}</span>
                    <div className="flex gap-3">
                      {!msg.read && (
                        <button onClick={() => msg._id && handleMarkAsRead(msg._id)} className="px-6 py-2 bg-green-500/10 text-green-500 border border-green-500/30 rounded-xl hover:bg-green-500 hover:text-black transition-all mono text-[10px] uppercase font-bold">
                          Aknowledge
                        </button>
                      )}
                      <button onClick={() => msg._id && handleDeleteMessage(msg._id)} className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/30 rounded-xl hover:bg-red-500 hover:text-white transition-all mono text-[10px] uppercase font-bold">
                        Purge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto">
              <div className="glass-panel p-8 rounded-3xl border-green-500/20">
                <header className="mb-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">System Configs</h3>
                  <div className="h-0.5 w-16 bg-green-500 rounded-full"></div>
                </header>

                <div className="space-y-10">
                  <section className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-1 font-spectral italic">CV Atmosphere Synthesis</h4>
                        <p className="text-xs text-gray-500 uppercase mono">Select a global chromatic spectrum for the live CV</p>
                      </div>
                      {themeSaving && (
                        <div className="flex items-center gap-2 text-green-400 mono text-[10px] animate-pulse">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          UPLOADING...
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleUpdateTheme(theme.id)}
                          className={`relative p-0 rounded-3xl border-2 transition-all duration-500 group overflow-hidden flex flex-col text-left ${cvTheme === theme.id ? 'border-white/40 ring-4 ring-white/10' : 'border-white/5 hover:border-white/20'}`}
                        >
                          {/* Visual Preview */}
                          <div className={`h-24 w-full relative ${theme.backgroundColor}`}>
                            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-br from-white/20 to-transparent"></div>

                            {/* Theme Details Badge */}
                            <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                              <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                                {theme.isDark ? 'Dark Mode' : 'Light Mode'}
                              </span>
                              {cvTheme === theme.id && (
                                <span className="text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter bg-green-500 text-white animate-pulse">
                                  Synchronized
                                </span>
                              )}
                            </div>

                            {/* Color Swatches */}
                            <div className="absolute bottom-3 left-4 flex gap-1.5 items-center">
                              <div
                                className="w-5 h-5 rounded-full border border-white/20 shadow-lg"
                                style={{ backgroundColor: colorMap[theme.baseColor] || '#555' }}
                              ></div>
                              <div
                                className="w-3 h-3 rounded-full border border-white/10 opacity-60"
                                style={{ backgroundColor: theme.textColor.match(/\[(.*?)\]/)?.[1] || (theme.textColor.includes('white') ? '#fff' : '#000') }}
                              ></div>
                            </div>
                          </div>

                          {/* Info Area */}
                          <div className="p-4 bg-[#0a0a0a] flex-grow">
                            <h5 className="text-sm font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{theme.name}</h5>
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center justify-between text-[9px] uppercase font-mono tracking-tighter">
                                <span className="text-gray-600">Base:</span>
                                <span className="text-gray-400">{theme.baseColor}</span>
                              </div>
                              <div className="flex items-center justify-between text-[9px] uppercase font-mono tracking-tighter">
                                <span className="text-gray-600">Palette:</span>
                                <span className="text-gray-400 truncate max-w-[80px]">{theme.mutedTextColor.match(/\[(.*?)\]/)?.[1] || theme.mutedTextColor}</span>
                              </div>
                            </div>
                          </div>

                          {/* Hover Overlay Detail */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                            <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-2">Deploy Theme</span>
                            <div className="flex gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorMap[theme.baseColor] }}></div>
                              <div className="w-2 h-2 rounded-full bg-white/20"></div>
                              <div className="w-2 h-2 rounded-full bg-white/5"></div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                    <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-2 font-spectral italic">Warning: Runtime Environment</h4>
                    <p className="text-[10px] text-gray-500 mono leading-relaxed mb-4">
                      Theme changes are broadcast instantly to the frontend. Changes will manifest in both the digital interface and the dynamic PDF exporter.
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
