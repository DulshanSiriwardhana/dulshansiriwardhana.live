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
} from '../utils/api';
import type { ProjectEulerArticle, Message } from '../utils/api';
import Toast from '../components/Toast';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

type TabType = 'articles' | 'messages';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [articles, setArticles] = useState<ProjectEulerArticle[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ProjectEulerArticle | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
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

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    loadArticles();
    loadMessages();
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
      console.error('Error loading articles:', error);
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
      console.error('Error loading messages:', error);
      showToast('Failed to load messages', 'error');
    } finally {
      setMessagesLoading(false);
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
      showToast(error.message || 'Failed to mark message as read', 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteMessage(id);
      setMessages(messages.filter(msg => msg._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      showToast('Message deleted successfully', 'success');
      loadMessages();
    } catch (error: any) {
      showToast(error.message || 'Failed to delete message', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && selectedArticle) {
        await updateProjectEulerArticle(selectedArticle._id!, formData);
        showToast('Article updated successfully!', 'success');
      } else {
        await createProjectEulerArticle(formData);
        showToast('Article created successfully!', 'success');
      }
      resetForm();
      loadArticles();
    } catch (error: any) {
      showToast(error.message || 'Failed to save article', 'error');
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
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      await deleteProjectEulerArticle(id);
      showToast('Article deleted successfully', 'success');
      loadArticles();
      if (selectedArticle?._id === id) {
        resetForm();
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to delete article', 'error');
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
    <div className="h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 min-h-0">
          <div className="mb-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Admin Panel
                </h1>
                <p className="text-gray-400 text-sm">Manage content and messages</p>
              </div>
              {user && (
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                    <span className="text-gray-400 text-xs">Logged in as </span>
                    <span className="text-[#22c55e] font-semibold text-xs">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-[#dc2626]/20 border border-[#dc2626]/50 rounded-lg text-[#ef4444] hover:bg-[#dc2626]/30 hover:border-[#dc2626] transition-colors text-xs font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex gap-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'articles'
                      ? 'bg-[#22c55e] text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Project Euler
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    activeTab === 'messages'
                      ? 'bg-[#22c55e] text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Messages
                  {messages.filter(m => !m.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {messages.filter(m => !m.read).length}
                    </span>
                  )}
                </button>
              </div>
              {activeTab === 'articles' && (
                <>
                  <div className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                    <span className="text-gray-400 text-xs">Total: </span>
                    <span className="text-[#22c55e] font-semibold text-xs">{articles.length}</span>
                  </div>
                  <div className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                    <span className="text-gray-400 text-xs">Published: </span>
                    <span className="text-[#22c55e] font-semibold text-xs">
                      {articles.filter(a => a.published).length}
                    </span>
                  </div>
                </>
              )}
              {activeTab === 'messages' && (
                <>
                  <div className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                    <span className="text-gray-400 text-xs">Total: </span>
                    <span className="text-[#22c55e] font-semibold text-xs">{messagesTotal}</span>
                  </div>
                  <div className="px-3 py-1.5 bg-[#1a1a1a] border border-[#dc2626]/30 rounded-lg">
                    <span className="text-gray-400 text-xs">Unread: </span>
                    <span className="text-[#ef4444] font-semibold text-xs">
                      {messages.filter(m => !m.read).length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {activeTab === 'articles' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex flex-col min-h-0 overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a2a] flex-shrink-0">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">
                      {isEditing ? 'Edit Article' : 'Create Article'}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {isEditing ? 'Update existing article' : 'Add a new Project Euler solution'}
                    </p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={resetForm}
                      className="px-3 py-1.5 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-gray-400 hover:bg-[#3a3a3a] hover:text-white transition-colors text-xs font-medium"
                    >
                      New
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 flex-1 overflow-y-auto green-scrollbar pr-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-gray-300">
                        Problem #
                      </label>
                      <input
                        type="number"
                        value={formData.problemNumber}
                        onChange={(e) => setFormData({ ...formData, problemNumber: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-gray-300">
                        Difficulty
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors cursor-pointer"
                      >
                        <option value="Easy" className="bg-[#0a0a0a]">Easy</option>
                        <option value="Medium" className="bg-[#0a0a0a]">Medium</option>
                        <option value="Hard" className="bg-[#0a0a0a]">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-300">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors"
                      required
                      placeholder="Enter article title"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-300">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors resize-none"
                      rows={2}
                      required
                      placeholder="Brief description"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-300">
                      Problem Statement
                    </label>
                    <textarea
                      value={formData.problemStatement}
                      onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors font-mono text-xs resize-none"
                      rows={3}
                      required
                      placeholder="Problem statement"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-300">
                      Language
                    </label>
                    <select
                      value={formData.solution.language}
                      onChange={(e) => setFormData({
                        ...formData,
                        solution: { ...formData.solution, language: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors cursor-pointer"
                    >
                      <option value="Python" className="bg-[#0a0a0a]">Python</option>
                      <option value="JavaScript" className="bg-[#0a0a0a]">JavaScript</option>
                      <option value="Java" className="bg-[#0a0a0a]">Java</option>
                      <option value="C++" className="bg-[#0a0a0a]">C++</option>
                      <option value="C" className="bg-[#0a0a0a]">C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-300">
                      Solution Code
                    </label>
                    <textarea
                      value={formData.solution.code}
                      onChange={(e) => setFormData({
                        ...formData,
                        solution: { ...formData.solution, code: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors font-mono text-xs resize-none"
                      rows={4}
                      required
                      placeholder="Solution code"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-300">
                      Explanation
                    </label>
                    <textarea
                      value={formData.solution.explanation}
                      onChange={(e) => setFormData({
                        ...formData,
                        solution: { ...formData.solution, explanation: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors resize-none"
                      rows={3}
                      required
                      placeholder="Algorithm explanation"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-gray-300">
                        Time Complexity
                      </label>
                      <input
                        type="text"
                        value={formData.solution.timeComplexity || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          solution: { ...formData.solution, timeComplexity: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors font-mono text-xs"
                        placeholder="O(n)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-gray-300">
                        Space Complexity
                      </label>
                      <input
                        type="text"
                        value={formData.solution.spaceComplexity || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          solution: { ...formData.solution, spaceComplexity: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors font-mono text-xs"
                        placeholder="O(1)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-300">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors"
                        placeholder="Add tag"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-[#22c55e] text-black font-medium rounded-lg hover:bg-[#20b955] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-[#22c55e] flex items-center gap-1.5 text-xs font-medium"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-[#ef4444] hover:text-[#dc2626] transition-colors text-sm leading-none font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 rounded border-[#2a2a2a] bg-[#0a0a0a] text-[#22c55e] focus:ring-1 focus:ring-[#22c55e] cursor-pointer accent-[#22c55e]"
                    />
                    <label htmlFor="published" className="text-xs text-gray-300 cursor-pointer">
                      Published (visible on website)
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2 flex-shrink-0 border-t border-[#2a2a2a]">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 bg-[#22c55e] text-black font-semibold rounded-lg hover:bg-[#20b955] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>{isEditing ? 'Update' : 'Create'} Article</span>
                      )}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2.5 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-gray-400 hover:bg-[#3a3a3a] hover:text-white transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex flex-col min-h-0 overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a2a] flex-shrink-0">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">
                      Articles
                    </h2>
                    <p className="text-xs text-gray-400">
                      Manage your Project Euler solutions
                    </p>
                  </div>
                  <div className="px-3 py-1.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg">
                    <span className="text-[#22c55e] font-bold">{articles.length}</span>
                  </div>
                </div>

                {articlesLoading ? (
                  <div className="text-center py-12 flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-[#22c55e] border-t-transparent rounded-full animate-spin mb-3"></div>
                    <div className="text-[#22c55e] text-sm font-medium">Loading articles...</div>
                  </div>
                ) : articles.length === 0 ? (
                  <div className="text-center py-12 flex-1 flex items-center justify-center">
                    <div>
                      <div className="text-4xl mb-2">📝</div>
                      <p className="text-gray-300 font-medium mb-1">No articles yet</p>
                      <p className="text-xs text-gray-500">Create your first article</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 flex-1 overflow-y-auto green-scrollbar pr-2 min-h-0">
                    {articles.map((article, index) => (
                      <div
                        key={article._id}
                        className={`bg-[#0a0a0a] border rounded-lg p-3 transition-all cursor-pointer ${
                          selectedArticle?._id === article._id
                            ? 'border-[#22c55e] bg-[#22c55e]/10'
                            : 'border-[#2a2a2a] hover:border-[#3a3a3a] hover:bg-[#1a1a1a]'
                        }`}
                        onClick={() => handleEdit(article)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[#22c55e] text-xs font-bold">#{article.problemNumber}</span>
                              <h3 className="text-sm font-bold text-white truncate">
                                {article.title}
                              </h3>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2">{article.description}</p>
                          </div>
                          <span className={`px-2 py-0.5 text-xs rounded font-bold ml-2 flex-shrink-0 border ${
                            article.published
                              ? 'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30'
                              : 'bg-[#2a2a2a] text-gray-400 border-[#3a3a3a]'
                          }`}>
                            {article.published ? '✓' : 'Draft'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded font-bold border ${
                            article.difficulty === 'Easy' ? 'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30' :
                            article.difficulty === 'Medium' ? 'bg-[#eab308]/20 text-[#eab308] border-[#eab308]/30' :
                            'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30'
                          }`}>
                            {article.difficulty}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-gray-300 font-medium">
                            {article.solution.language}
                          </span>
                          {article.tags.length > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-gray-400 font-medium">
                              {article.tags.length} tags
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(article);
                            }}
                            className="px-2.5 py-1 bg-[#2563eb]/20 border border-[#2563eb]/50 rounded text-[#3b82f6] hover:bg-[#2563eb]/30 hover:border-[#2563eb] text-xs font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              article._id && handleDelete(article._id);
                            }}
                            className="px-2.5 py-1 bg-[#dc2626]/20 border border-[#dc2626]/50 rounded text-[#ef4444] hover:bg-[#dc2626]/30 hover:border-[#dc2626] text-xs font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex flex-col min-h-0 overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a2a] flex-shrink-0">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">
                      Messages
                    </h2>
                    <p className="text-xs text-gray-400">
                      View and manage contact messages
                    </p>
                  </div>
                </div>

                {messagesLoading ? (
                  <div className="text-center py-12 flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-[#22c55e] border-t-transparent rounded-full animate-spin mb-3"></div>
                    <div className="text-[#22c55e] text-sm font-medium">Loading messages...</div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 flex-1 flex items-center justify-center">
                    <div>
                      <div className="text-4xl mb-2">📧</div>
                      <p className="text-gray-300 font-medium mb-1">No messages yet</p>
                      <p className="text-xs text-gray-500">Messages will appear here</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 flex-1 overflow-y-auto green-scrollbar pr-2 min-h-0">
                      {messages.map((message) => (
                        <div
                          key={message._id}
                          className={`bg-[#0a0a0a] border rounded-lg p-3 transition-all cursor-pointer ${
                            selectedMessage?._id === message._id
                              ? 'border-[#22c55e] bg-[#22c55e]/10'
                              : message.read
                              ? 'border-[#2a2a2a] hover:border-[#3a3a3a] hover:bg-[#1a1a1a]'
                              : 'border-[#3b82f6] bg-[#3b82f6]/10 hover:border-[#2563eb]'
                          }`}
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {!message.read && (
                                  <span className="w-2 h-2 bg-[#3b82f6] rounded-full flex-shrink-0"></span>
                                )}
                                <h3 className="text-sm font-bold text-white truncate">
                                  {message.subject}
                                </h3>
                              </div>
                              <p className="text-xs text-gray-400 mb-1">
                                <span className="text-[#22c55e]">{message.name}</span>
                                <span className="text-gray-500 mx-1">•</span>
                                <span>{message.email}</span>
                              </p>
                              <p className="text-xs text-gray-500 line-clamp-2">{message.message}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 ml-2 flex-shrink-0">
                              {!message.read && (
                                <span className="px-2 py-0.5 text-xs rounded font-bold bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30">
                                  New
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : ''}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1.5 mt-2">
                            {!message.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  message._id && handleMarkAsRead(message._id);
                                }}
                                className="px-2.5 py-1 bg-[#22c55e]/20 border border-[#22c55e]/50 rounded text-[#22c55e] hover:bg-[#22c55e]/30 hover:border-[#22c55e] text-xs font-medium transition-colors"
                              >
                                Mark Read
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                message._id && handleDeleteMessage(message._id);
                              }}
                              className="px-2.5 py-1 bg-[#dc2626]/20 border border-[#dc2626]/50 rounded text-[#ef4444] hover:bg-[#dc2626]/30 hover:border-[#dc2626] text-xs font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {messagesTotal > 20 && (
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2a2a2a] flex-shrink-0">
                        <button
                          onClick={() => setMessagesPage(p => Math.max(1, p - 1))}
                          disabled={messagesPage === 1}
                          className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-gray-400">
                          Page {messagesPage} of {Math.ceil(messagesTotal / 20)}
                        </span>
                        <button
                          onClick={() => setMessagesPage(p => p + 1)}
                          disabled={messagesPage >= Math.ceil(messagesTotal / 20)}
                          className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {selectedMessage && (
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a2a] flex-shrink-0">
                    <div>
                      <h2 className="text-lg font-bold text-white mb-1">
                        Message Details
                      </h2>
                      <p className="text-xs text-gray-400">
                        {selectedMessage.read ? 'Read' : 'Unread'}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="px-3 py-1.5 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-gray-400 hover:bg-[#3a3a3a] hover:text-white transition-colors text-xs font-medium"
                    >
                      Close
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto green-scrollbar pr-2 space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-400">Subject</label>
                      <div className="px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white font-medium">
                        {selectedMessage.subject}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Name</label>
                        <div className="px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-[#22c55e]">
                          {selectedMessage.name}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Email</label>
                        <div className="px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white">
                          {selectedMessage.email}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-400">Date</label>
                      <div className="px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-gray-400">
                        {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'N/A'}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-400">Message</label>
                      <div className="px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white whitespace-pre-wrap min-h-[150px]">
                        {selectedMessage.message}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-[#2a2a2a]">
                      {!selectedMessage.read && (
                        <button
                          onClick={() => selectedMessage._id && handleMarkAsRead(selectedMessage._id)}
                          className="flex-1 px-4 py-2 bg-[#22c55e] text-black font-semibold rounded-lg hover:bg-[#20b955] transition-colors text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => selectedMessage._id && handleDeleteMessage(selectedMessage._id)}
                        className="px-4 py-2 bg-[#dc2626]/20 border border-[#dc2626]/50 rounded-lg text-[#ef4444] hover:bg-[#dc2626]/30 hover:border-[#dc2626] transition-colors font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default AdminPanel;
