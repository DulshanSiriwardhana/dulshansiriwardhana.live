import { useState, useEffect } from 'react';
import { getProjectEulerArticleByNumber, ProjectEulerArticle } from '../utils/api';

interface ProjectEulerArticleDetailProps {
  problemNumber: number;
  onClose: () => void;
}

const ProjectEulerArticleDetail = ({ problemNumber, onClose }: ProjectEulerArticleDetailProps) => {
  const [article, setArticle] = useState<ProjectEulerArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [problemNumber]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await getProjectEulerArticleByNumber(problemNumber);
      setArticle(response.data);
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-green-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-red-500/50 rounded-xl p-8 max-w-md">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">Article Not Found</h2>
          <p className="text-gray-400 mb-6">The requested article could not be found.</p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a1a] border border-green-500/20 rounded-xl p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Problem #{article.problemNumber}: {article.title}
                </h1>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-sm rounded border ${difficultyColors[article.difficulty]}`}>
                    {article.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-sm text-purple-400">
                    {article.solution.language}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-green-400 mb-3">Description</h2>
                <p className="text-gray-300 leading-relaxed">{article.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-green-400 mb-3">Problem Statement</h2>
                <div className="bg-[#0a0a0a] border border-green-500/10 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                    {article.problemStatement}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-green-400 mb-3">Solution</h2>
                <div className="bg-[#0a0a0a] border border-green-500/10 rounded-lg p-4">
                  <pre className="text-gray-300 overflow-x-auto">
                    <code className={`language-${article.solution.language.toLowerCase()}`}>
                      {article.solution.code}
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-green-400 mb-3">Algorithm Explanation</h2>
                <div className="bg-[#0a0a0a] border border-green-500/10 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {article.solution.explanation}
                  </p>
                </div>
              </div>

              {(article.solution.timeComplexity || article.solution.spaceComplexity) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.solution.timeComplexity && (
                    <div className="bg-[#0a0a0a] border border-green-500/10 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-green-400 mb-2">Time Complexity</h3>
                      <p className="text-gray-300 font-mono">{article.solution.timeComplexity}</p>
                    </div>
                  )}
                  {article.solution.spaceComplexity && (
                    <div className="bg-[#0a0a0a] border border-green-500/10 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-green-400 mb-2">Space Complexity</h3>
                      <p className="text-gray-300 font-mono">{article.solution.spaceComplexity}</p>
                    </div>
                  )}
                </div>
              )}

              {article.tags.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-green-400 mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-sm text-green-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEulerArticleDetail;

