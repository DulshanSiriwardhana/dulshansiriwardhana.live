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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
      {/* Dynamic Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-full flex flex-col bg-[#080808] border border-green-500/20 rounded-[2rem] shadow-2xl shadow-green-500/5 animate-in zoom-in-95 fade-in duration-300 overflow-hidden">

        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          {!loading && article && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-green-500 font-mono text-[10px] tracking-widest uppercase font-black px-2 py-0.5 bg-green-500/10 rounded">Node // #{article.problemNumber}</span>
                <span className="h-1 w-1 bg-white/20 rounded-full"></span>
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest font-bold">{article.solution.language}</span>
              </div>
              <h1 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                {article.title}
              </h1>
            </div>
          )}
          {loading && (
            <div className="h-10 w-48 bg-white/5 rounded-lg animate-pulse" />
          )}
          <button
            onClick={onClose}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 transition-all group shrink-0"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto green-scrollbar p-6 md:p-10 scroll-smooth">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-green-500/20 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-t-2 border-green-500 rounded-full animate-spin"></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-green-500 font-mono text-xs uppercase tracking-[0.3em] font-black animate-pulse">Syncing Logic...</p>
                <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest">Accessing central buffer</p>
              </div>
            </div>
          ) : !article ? (
            <div className="text-center py-20 flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500 border border-rose-500/20">
                <X size={40} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white italic uppercase tracking-widest mb-2">SYSTEM_ERROR</h2>
                <p className="text-gray-500 text-sm font-medium">Requested node sequence could not be established.</p>
              </div>
              <button 
                onClick={onClose} 
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
              >
                Abort Connection
              </button>
            </div>
          ) : (
            <div className="space-y-12 pb-10">
              {article.description && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-green-500/30"></div>
                    <h2 className="text-[10px] font-black text-green-500/50 uppercase tracking-[0.2em]">Abstract</h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base font-medium selection:bg-green-500/30">
                    {article.description}
                  </p>
                </div>
              )}

              {article.problemStatement && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-green-500/30"></div>
                    <h2 className="text-[10px] font-black text-green-500/50 uppercase tracking-[0.2em]">Constraint</h2>
                  </div>
                  <div className="bg-black/60 border border-white/5 rounded-3xl p-6 lg:p-10 shadow-inner group">
                    <p className="text-gray-400 whitespace-pre-wrap font-mono text-xs lg:text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {article.problemStatement}
                    </p>
                  </div>
                </div>
              )}

              {article.answer && (
                <div className="space-y-4 animate-in slide-in-from-left duration-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-emerald-500/30"></div>
                    <h2 className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.2em]">Solution Value</h2>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-700"></div>
                    <div className="bg-emerald-500/10 p-5 rounded-2xl text-emerald-400 shadow-xl shadow-emerald-500/10 relative z-10 scale-110">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="text-center md:text-left relative z-10">
                      <p className="text-[10px] text-emerald-500/50 font-black uppercase tracking-widest mb-1">Decrypted Output</p>
                      <span className="text-3xl md:text-5xl font-mono font-black text-white tracking-[0.15em] break-all">
                        {article.answer}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-blue-500/30"></div>
                  <h2 className="text-[10px] font-black text-blue-500/50 uppercase tracking-[0.2em]">Algorithm Implementation</h2>
                </div>
                <div className="bg-black/80 border border-blue-500/20 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-500/5 group">
                  <div className="bg-blue-500/5 px-8 py-4 border-b border-blue-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></div>
                      </div>
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest ml-2">{article.solution.language} // CORE</span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 overflow-x-auto green-scrollbar bg-gradient-to-br from-blue-500/[0.02] to-transparent">
                    <pre className="text-blue-200/90 font-mono text-sm lg:text-base leading-relaxed">
                      <code>{article.solution.code}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {article.solution.explanation && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-white/10"></div>
                    <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Trace Analysis</h2>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10">
                    <p className="text-gray-400 leading-relaxed whitespace-pre-wrap text-sm font-medium">
                      {article.solution.explanation}
                    </p>
                  </div>
                </div>
              )}

              {(article.solution.timeComplexity || article.solution.spaceComplexity) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.solution.timeComplexity && (
                    <div className="bg-black/60 border border-green-500/10 rounded-2xl p-8 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-all"></div>
                      <h3 className="text-[9px] font-black text-green-500/40 uppercase tracking-[0.25em] mb-4">Runtime Efficiency</h3>
                      <p className="text-white font-mono text-lg font-black group-hover:text-green-400 transition-colors">{article.solution.timeComplexity}</p>
                    </div>
                  )}
                  {article.solution.spaceComplexity && (
                    <div className="bg-black/60 border border-blue-500/10 rounded-2xl p-8 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
                      <h3 className="text-[9px] font-black text-blue-500/40 uppercase tracking-[0.25em] mb-4">Memory footprint</h3>
                      <p className="text-white font-mono text-lg font-black group-hover:text-blue-400 transition-colors">{article.solution.spaceComplexity}</p>
                    </div>
                  )}
                </div>
              )}

              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2.5 pt-10 border-t border-white/5">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-green-500 hover:border-green-500/30 transition-all cursor-default"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent shrink-0 opacity-50" />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
export default ProjectEulerArticleDetail;
