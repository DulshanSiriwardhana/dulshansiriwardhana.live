import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createProjectEulerArticle,
  updateProjectEulerArticle,
  getProjectEulerArticles,
  deleteProjectEulerArticle,
  ProjectEulerArticleData,
} from '../utils/api';
import type { ProjectEulerArticle } from '../utils/api';
import Toast from '../components/Toast';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ProjectEulerArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ProjectEulerArticle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articlesLoading, setArticlesLoading] = useState(true);
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
  }, []);

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
    <div className="h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black text-white overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="relative flex-1 flex flex-col overflow-hidden p-4">
        <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 min-h-0">
          <div className="mb-4 animate-fade-in flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 md:h-10 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Project Euler Admin
                  </h1>
                  <p className="text-gray-400 text-xs md:text-sm">Create and manage solution articles</p>
                </div>
              </div>
              {user && (
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-gray-400 text-xs">Logged in as </span>
                    <span className="text-green-400 font-semibold text-xs">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 hover:border-red-500 transition-all text-xs font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs md:text-sm">
              <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                <span className="text-gray-400">Total: </span>
                <span className="text-green-400 font-semibold">{articles.length}</span>
              </div>
              <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                <span className="text-gray-400">Published: </span>
                <span className="text-green-400 font-semibold">
                  {articles.filter(a => a.published).length}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 flex-1 min-h-0">
            <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 md:p-6 shadow-2xl shadow-green-500/10 animate-fade-in flex flex-col min-h-0 overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-green-500/20 flex-shrink-0">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {isEditing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                        Edit Article
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span className="text-green-400">+</span>
                        Create Article
                      </span>
                    )}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-400">
                    {isEditing ? 'Update existing article' : 'Add a new Project Euler solution'}
                  </p>
                </div>
                {isEditing && (
                  <button
                    onClick={resetForm}
                    className="px-3 py-1.5 bg-gray-500/20 border border-gray-500/50 rounded-lg text-gray-400 hover:bg-gray-500/30 hover:text-white transition-all text-xs font-medium"
                  >
                    New
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 flex-1 overflow-y-auto green-scrollbar pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Problem #
                    </label>
                    <input
                      type="number"
                      value={formData.problemNumber}
                      onChange={(e) => setFormData({ ...formData, problemNumber: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all font-medium"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                      className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all cursor-pointer hover:border-green-500/40 font-medium"
                    >
                      <option value="Easy" className="bg-[#0a0a0a] text-green-400 py-2">Easy</option>
                      <option value="Medium" className="bg-[#0a0a0a] text-yellow-400 py-2">Medium</option>
                      <option value="Hard" className="bg-[#0a0a0a] text-red-400 py-2">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all"
                    required
                    placeholder="Enter article title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all resize-none"
                    rows={3}
                    required
                    placeholder="Brief description of the problem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Problem Statement
                  </label>
                  <textarea
                    value={formData.problemStatement}
                    onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all font-mono text-xs md:text-sm resize-none"
                    rows={4}
                    required
                    placeholder="Paste the problem statement here"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Programming Language
                  </label>
                  <select
                    value={formData.solution.language}
                    onChange={(e) => setFormData({
                      ...formData,
                      solution: { ...formData.solution, language: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all cursor-pointer hover:border-green-500/40 font-medium"
                  >
                    <option value="Python" className="bg-[#0a0a0a] text-white py-2">Python</option>
                    <option value="JavaScript" className="bg-[#0a0a0a] text-white py-2">JavaScript</option>
                    <option value="Java" className="bg-[#0a0a0a] text-white py-2">Java</option>
                    <option value="C++" className="bg-[#0a0a0a] text-white py-2">C++</option>
                    <option value="C" className="bg-[#0a0a0a] text-white py-2">C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Solution Code
                  </label>
                  <div className="relative">
                    <textarea
                      value={formData.solution.code}
                      onChange={(e) => setFormData({
                        ...formData,
                        solution: { ...formData.solution, code: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all font-mono text-xs md:text-sm resize-none"
                      rows={6}
                      required
                      placeholder="Paste your solution code here"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-mono">
                      {formData.solution.language}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Algorithm Explanation
                  </label>
                  <textarea
                    value={formData.solution.explanation}
                    onChange={(e) => setFormData({
                      ...formData,
                      solution: { ...formData.solution, explanation: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all resize-none"
                    rows={4}
                    required
                    placeholder="Explain your algorithm approach"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Time Complexity
                    </label>
                    <input
                      type="text"
                      value={formData.solution.timeComplexity || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        solution: { ...formData.solution, timeComplexity: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all font-mono"
                      placeholder="O(n)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Space Complexity
                    </label>
                    <input
                      type="text"
                      value={formData.solution.spaceComplexity || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        solution: { ...formData.solution, spaceComplexity: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all font-mono"
                      placeholder="O(1)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 px-4 py-3 bg-[#0a0a0a]/80 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/30 transition-all"
                      placeholder="Add tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-6 py-3 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/50 rounded-xl text-green-400 hover:from-green-500/30 hover:to-green-500/20 hover:border-green-500 transition-all font-semibold shadow-lg shadow-green-500/10"
                    >
                      Add
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-2 text-sm font-medium shadow-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-red-400 hover:text-red-300 transition-colors text-lg leading-none font-bold"
                            title="Remove tag"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/5 to-green-500/0 rounded-xl border border-green-500/20">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded border-green-500/50 bg-[#1a1a1a] text-green-500 focus:ring-2 focus:ring-green-500/50 cursor-pointer accent-green-500"
                  />
                  <label htmlFor="published" className="text-sm text-gray-300 cursor-pointer flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${formData.published ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></span>
                    Published (visible on website)
                  </label>
                </div>

                <div className="flex gap-3 pt-2 flex-shrink-0 border-t border-green-500/10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/50 rounded-xl text-green-400 hover:from-green-500/30 hover:to-green-500/20 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg shadow-green-500/10 disabled:shadow-none flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>{isEditing ? 'Update' : 'Create'} Article</span>
                        <span className="text-lg">→</span>
                      </>
                    )}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-3 bg-gray-500/20 border border-gray-500/50 rounded-xl text-gray-400 hover:bg-gray-500/30 hover:border-gray-500 hover:text-white transition-all font-semibold text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 md:p-6 shadow-2xl shadow-green-500/10 animate-fade-in flex flex-col min-h-0 overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-green-500/20 flex-shrink-0">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                    Articles
                  </h2>
                  <p className="text-xs md:text-sm text-gray-400">
                    Manage your Project Euler solutions
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <span className="text-green-400 font-bold text-base md:text-lg">{articles.length}</span>
                </div>
              </div>

              {articlesLoading ? (
                <div className="text-center py-12 flex-1 flex items-center justify-center">
                  <div>
                    <div className="inline-block w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-green-400 text-sm md:text-base font-medium">Loading articles...</div>
                  </div>
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-12 flex-1 flex items-center justify-center">
                  <div>
                    <div className="text-5xl mb-3 animate-bounce">📝</div>
                    <p className="text-gray-300 text-base md:text-lg font-semibold mb-2">No articles yet</p>
                    <p className="text-xs md:text-sm text-gray-500">Create your first article using the form</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 md:space-y-3 flex-1 overflow-y-auto green-scrollbar pr-2 min-h-0">
                  {articles.map((article, index) => (
                    <div
                      key={article._id}
                      className={`bg-gradient-to-br from-[#0a0a0a]/80 to-[#050505]/80 border rounded-lg md:rounded-xl p-3 md:p-4 transition-all cursor-pointer transform hover:scale-[1.01] ${
                        selectedArticle?._id === article._id
                          ? 'border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/20'
                          : 'border-green-500/20 hover:border-green-500/40 hover:bg-[#0f0f0f]/50 hover:shadow-lg hover:shadow-green-500/10'
                      } animate-fade-in`}
                      style={{ animationDelay: `${index * 30}ms` }}
                      onClick={() => handleEdit(article)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-green-400 text-xs md:text-sm font-bold flex-shrink-0">#{article.problemNumber}</span>
                            <h3 className="text-sm md:text-base font-bold text-white line-clamp-1 truncate">
                              {article.title}
                            </h3>
                          </div>
                          <p className="text-xs md:text-sm text-gray-400 line-clamp-2">{article.description}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-lg font-bold ml-2 flex-shrink-0 border ${
                          article.published
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}>
                          {article.published ? '✓' : 'Draft'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-lg font-bold border ${
                          article.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          article.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {article.difficulty}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-lg font-bold border border-purple-500/30">
                          {article.solution.language}
                        </span>
                        {article.tags.length > 0 && (
                          <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-lg font-bold border border-blue-500/30">
                            {article.tags.length}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1.5 md:gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(article);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-blue-500/10 border border-blue-500/50 rounded-lg text-blue-400 hover:from-blue-500/30 hover:to-blue-500/20 hover:border-blue-500 text-xs md:text-sm font-semibold transition-all shadow-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            article._id && handleDelete(article._id);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-red-500/20 to-red-500/10 border border-red-500/50 rounded-lg text-red-400 hover:from-red-500/30 hover:to-red-500/20 hover:border-red-500 text-xs md:text-sm font-semibold transition-all shadow-sm"
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
