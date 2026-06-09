import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getProjectEulerArticleByNumber } from '../utils/api';
import type { ProjectEulerArticle } from '../utils/api';
import { CheckCircle2, X } from 'lucide-react';

interface ProjectEulerArticleDetailProps {
  problemNumber: number;
  onClose: () => void;
}

const ProjectEulerArticleDetail = ({ problemNumber, onClose }: ProjectEulerArticleDetailProps) => {
  const [article, setArticle] = useState<ProjectEulerArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    loadArticle();
    return () => {
      document.body.style.overflow = 'unset';
    };
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

  const modalContent = (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] overflow-y-auto flex items-center justify-center p-4">
      <div className="min-h-screen w-full py-20 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="bg-[#0a0a0a] border border-green-500/10 rounded-3xl p-6 md:p-10 shadow-2xl relative animate-in zoom-in-95 duration-300">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-t-2 border-green-500 rounded-full animate-spin"></div>
                <p className="text-green-500 font-mono text-xs uppercase tracking-widest">Accessing Node...</p>
              </div>
            ) : !article ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-red-500 mb-4">DATA_NOT_FOUND</h2>
                <button onClick={onClose} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all">TERMINAL_CLOSE</button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-10 pb-6 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-green-500 font-mono text-xs tracking-tighter italic">NODE // #{article.problemNumber}</span>
                      <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                      <span className="text-white/40 font-mono text-xs uppercase tracking-widest">{article.solution.language}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
                      {article.title}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-[10px] font-black rounded-full border tracking-[0.2em] uppercase ${article.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        article.difficulty === 'Medium' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                        {article.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  >
                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {article.description && (
                    <div className="space-y-4">
                      <h2 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Protocol Summary</h2>
                      <p className="text-gray-400 leading-relaxed text-sm lg:text-base font-medium">{article.description}</p>
                    </div>
                  )}

                  {article.problemStatement && (
                    <div className="space-y-4">
                      <h2 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Logic Constraint</h2>
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 lg:p-8">
                        <p className="text-gray-300 whitespace-pre-wrap font-mono text-xs lg:text-sm leading-relaxed">
                          {article.problemStatement}
                        </p>
                      </div>
                    </div>
                  )}

                  {article.answer && (
                    <div className="space-y-4">
                      <h2 className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest">Validation Output (Answer)</h2>
                      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 flex items-center gap-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400">
                          <CheckCircle2 size={24} />
                        </div>
                        <span className="text-2xl md:text-3xl font-mono font-black text-white tracking-[0.2em]">
                          {article.answer}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h2 className="text-[10px] font-black text-blue-500/40 uppercase tracking-widest">Solution Matrix</h2>
                    <div className="bg-black border border-blue-500/10 rounded-3xl overflow-hidden">
                      <div className="bg-blue-500/5 px-6 py-3 border-b border-blue-500/10 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{article.solution.language} // SOURCE</span>
                      </div>
                      <div className="p-6 lg:p-8 overflow-x-auto custom-scrollbar">
                        <pre className="text-blue-400/90 font-mono text-xs lg:text-sm">
                          <code>{article.solution.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {article.solution.explanation && (
                    <div className="space-y-4">
                      <h2 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Algorithm Trace</h2>
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 lg:p-8">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                          {article.solution.explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {(article.solution.timeComplexity || article.solution.spaceComplexity) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {article.solution.timeComplexity && (
                        <div className="bg-black border border-white/5 rounded-2xl p-6">
                          <h3 className="text-[10px] font-black text-green-500/40 uppercase tracking-widest mb-3">Time Efficiency</h3>
                          <p className="text-white font-mono text-sm">{article.solution.timeComplexity}</p>
                        </div>
                      )}
                      {article.solution.spaceComplexity && (
                        <div className="bg-black border border-white/5 rounded-2xl p-6">
                          <h3 className="text-[10px] font-black text-blue-500/40 uppercase tracking-widest mb-3">Space Requirement</h3>
                          <p className="text-white font-mono text-sm">{article.solution.spaceComplexity}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                        >
                          # {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
export default ProjectEulerArticleDetail;
