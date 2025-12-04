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
    <div className="min-h-screen bg-black text-white p-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">Project Euler Admin Panel</h1>
          <p className="text-gray-400">Create and manage Project Euler solution articles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#1a1a1a]/50 border border-green-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {isEditing ? 'Edit Article' : 'Create New Article'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Problem Number</label>
                <input
                  type="number"
                  value={formData.problemNumber}
                  onChange={(e) => setFormData({ ...formData, problemNumber: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Problem Statement</label>
                <textarea
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white font-mono text-sm"
                  rows={5}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Programming Language</label>
                <select
                  value={formData.solution.language}
                  onChange={(e) => setFormData({
                    ...formData,
                    solution: { ...formData.solution, language: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                >
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="C">C</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Solution Code</label>
                <textarea
                  value={formData.solution.code}
                  onChange={(e) => setFormData({
                    ...formData,
                    solution: { ...formData.solution, code: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white font-mono text-sm"
                  rows={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Algorithm Explanation</label>
                <textarea
                  value={formData.solution.explanation}
                  onChange={(e) => setFormData({
                    ...formData,
                    solution: { ...formData.solution, explanation: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Time Complexity</label>
                  <input
                    type="text"
                    value={formData.solution.timeComplexity || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      solution: { ...formData.solution, timeComplexity: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                    placeholder="O(n)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Space Complexity</label>
                  <input
                    type="text"
                    value={formData.solution.spaceComplexity || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      solution: { ...formData.solution, spaceComplexity: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                    placeholder="O(1)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white"
                    placeholder="Add tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="text-sm">Published</label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-500/20 border border-gray-500/50 rounded-lg text-gray-400 hover:bg-gray-500/30"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-[#1a1a1a]/50 border border-green-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Articles ({articles.length})</h2>
            <div className="space-y-3 max-h-[800px] overflow-y-auto green-scrollbar">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="bg-[#1a1a1a] border border-green-500/20 rounded-lg p-4 hover:border-green-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Problem #{article.problemNumber}: {article.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{article.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      article.published
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      {article.difficulty}
                    </span>
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                      {article.solution.language}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(article)}
                      className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-blue-400 hover:bg-blue-500/30 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => article._id && handleDelete(article._id)}
                      className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 hover:bg-red-500/30 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

