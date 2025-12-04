import { useState, useEffect } from 'react';
import {
  createProjectEulerArticle,
  updateProjectEulerArticle,
  getProjectEulerArticles,
  deleteProjectEulerArticle,
  ProjectEulerArticle,
  ProjectEulerArticleData,
} from '../utils/api';

const AdminPanel = () => {
  const [articles, setArticles] = useState<ProjectEulerArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ProjectEulerArticle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await getProjectEulerArticles(1, 100, '-problemNumber', '', '', '');
      setArticles(response.data);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && selectedArticle) {
        await updateProjectEulerArticle(selectedArticle._id!, formData);
      } else {
        await createProjectEulerArticle(formData);
      }
      resetForm();
      loadArticles();
    } catch (error: any) {
      alert(error.message || 'Failed to save article');
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
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      await deleteProjectEulerArticle(id);
      loadArticles();
      if (selectedArticle?._id === id) {
        resetForm();
      }
    } catch (error: any) {
      alert(error.message || 'Failed to delete article');
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
    <div className="min-h-screen bg-black text-white p-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-2">Project Euler Admin Panel</h1>
          <p className="text-gray-400">Create and manage Project Euler solution articles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                {isEditing ? 'Edit Article' : 'Create New Article'}
              </h2>
              {isEditing && (
                <button
                  onClick={resetForm}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  New Article
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Problem Number</label>
                <input
                  type="number"
                  value={formData.problemNumber}
                  onChange={(e) => setFormData({ ...formData, problemNumber: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all"
                  required
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all resize-none"
                  rows={3}
                  required
                  placeholder="Brief description of the problem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Problem Statement</label>
                <textarea
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all font-mono text-sm resize-none"
                  rows={5}
                  required
                  placeholder="Paste the problem statement here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Programming Language</label>
                <select
                  value={formData.solution.language}
                  onChange={(e) => setFormData({
                    ...formData,
                    solution: { ...formData.solution, language: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all cursor-pointer hover:border-green-500/40"
                >
                  <option value="Python" className="bg-[#0a0a0a] text-white py-2">Python</option>
                  <option value="JavaScript" className="bg-[#0a0a0a] text-white py-2">JavaScript</option>
                  <option value="Java" className="bg-[#0a0a0a] text-white py-2">Java</option>
                  <option value="C++" className="bg-[#0a0a0a] text-white py-2">C++</option>
                  <option value="C" className="bg-[#0a0a0a] text-white py-2">C</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Solution Code</label>
                <textarea
                  value={formData.solution.code}
                  onChange={(e) => setFormData({
                    ...formData,
                    solution: { ...formData.solution, code: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all font-mono text-sm resize-none"
                  rows={10}
                  required
                  placeholder="Paste your solution code here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Algorithm Explanation</label>
                <textarea
                  value={formData.solution.explanation}
                  onChange={(e) => setFormData({
                    ...formData,
                    solution: { ...formData.solution, explanation: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all resize-none"
                  rows={5}
                  required
                  placeholder="Explain your algorithm approach"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Time Complexity</label>
                  <input
                    type="text"
                    value={formData.solution.timeComplexity || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      solution: { ...formData.solution, timeComplexity: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all font-mono"
                    placeholder="O(n)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Space Complexity</label>
                  <input
                    type="text"
                    value={formData.solution.spaceComplexity || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      solution: { ...formData.solution, spaceComplexity: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all font-mono"
                    placeholder="O(1)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all cursor-pointer hover:border-green-500/40"
                >
                  <option value="Easy" className="bg-[#0a0a0a] text-green-400 py-2">Easy</option>
                  <option value="Medium" className="bg-[#0a0a0a] text-yellow-400 py-2">Medium</option>
                  <option value="Hard" className="bg-[#0a0a0a] text-red-400 py-2">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2.5 bg-[#0a0a0a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all"
                    placeholder="Add tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2.5 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 hover:border-green-500 transition-all font-medium"
                  >
                    Add
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-2 text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-red-400 hover:text-red-300 transition-colors text-lg leading-none"
                          title="Remove tag"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#0a0a0a]/50 rounded-lg border border-green-500/10">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-green-500/50 bg-[#1a1a1a] text-green-500 focus:ring-2 focus:ring-green-500/50 cursor-pointer"
                />
                <label htmlFor="published" className="text-sm text-gray-300 cursor-pointer">Published (visible on website)</label>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  {loading ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-500/20 border border-gray-500/50 rounded-lg text-gray-400 hover:bg-gray-500/30 hover:border-gray-500 transition-all font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">
              Articles <span className="text-green-400">({articles.length})</span>
            </h2>
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-gray-400">No articles yet</p>
                <p className="text-sm text-gray-500 mt-2">Create your first article using the form</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[800px] overflow-y-auto green-scrollbar pr-2">
                {articles.map((article) => (
                  <div
                    key={article._id}
                    className={`bg-[#0a0a0a] border rounded-lg p-4 transition-all cursor-pointer ${
                      selectedArticle?._id === article._id
                        ? 'border-green-500/50 bg-green-500/5'
                        : 'border-green-500/20 hover:border-green-500/40 hover:bg-[#0f0f0f]'
                    }`}
                    onClick={() => handleEdit(article)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                          Problem #{article.problemNumber}: {article.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{article.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded font-medium ml-2 flex-shrink-0 ${
                        article.published
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        article.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        article.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {article.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded font-medium border border-purple-500/30">
                        {article.solution.language}
                      </span>
                      {article.tags.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {article.tags.length} tag{article.tags.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(article);
                        }}
                        className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/50 rounded text-blue-400 hover:bg-blue-500/30 hover:border-blue-500 text-sm font-medium transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          article._id && handleDelete(article._id);
                        }}
                        className="px-3 py-1.5 bg-red-500/20 border border-red-500/50 rounded text-red-400 hover:bg-red-500/30 hover:border-red-500 text-sm font-medium transition-all"
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
  );
};

export default AdminPanel;

