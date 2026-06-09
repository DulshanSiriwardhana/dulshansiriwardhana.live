import { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import ProjectEulerArticleCard from "../components/ProjectEulerArticleCard";
import ProjectEulerArticleDetail from "../components/ProjectEulerArticleDetail";
import { blogArticles } from "../constants/landingPageData";
import { getProjectEulerArticles } from "../utils/api";
import type { ProjectEulerArticle } from "../utils/api";

const BlogSection = () => {
  const [projectEulerArticles, setProjectEulerArticles] = useState<ProjectEulerArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'blog' | 'project-euler'>('blog');

  useEffect(() => {
    if (activeTab === 'project-euler') {
      const timeoutId = setTimeout(() => {
        loadProjectEulerArticles();
      }, searchQuery ? 500 : 0);

      return () => clearTimeout(timeoutId);
    }
  }, [activeTab, currentPage, searchQuery, difficultyFilter]);

  useEffect(() => {
    if (activeTab === 'project-euler' && (searchQuery || difficultyFilter)) {
      setCurrentPage(1);
    }
  }, [searchQuery, difficultyFilter, activeTab]);

  const loadProjectEulerArticles = async () => {
    setLoading(true);
    try {
      const response = await getProjectEulerArticles(
        currentPage,
        12,
        '-problemNumber',
        searchQuery,
        difficultyFilter,
        'true'
      );
      setProjectEulerArticles(response.data);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error('Error loading Project Euler articles:', error);
      setProjectEulerArticles([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadProjectEulerArticles();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setDifficultyFilter('');
    setCurrentPage(1);
  };

  return (
    <section
      id="blog"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-[1440px] w-full space-y-12">
        <SectionTitle
          title="Blog & Articles"
          subtitle="Sharing knowledge and insights about technology"
        />

        <div className="flex gap-4 border-b border-green-500/20 mb-8">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 font-medium transition-all ${activeTab === 'blog'
              ? 'text-green-400 border-b-2 border-green-400'
              : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Blog Articles
          </button>
          <button
            onClick={() => setActiveTab('project-euler')}
            className={`px-6 py-3 font-medium transition-all ${activeTab === 'project-euler'
              ? 'text-green-400 border-b-2 border-green-400'
              : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Project Euler Solutions
          </button>
        </div>

        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {blogArticles.map((article, index) => (
              <ScrollAnimation key={index} delay={index * 100} direction="up">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300 h-full flex flex-col min-h-[300px]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-400 text-sm font-medium">
                      {article.date}
                    </span>
                    {article.readTime && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">
                          {article.readTime}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed flex-grow">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-green-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Read Article
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </a>
              </ScrollAnimation>
            ))}

            <ScrollAnimation delay={blogArticles.length * 100} direction="up">
              <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px] md:min-h-[350px]">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  More Articles Coming Soon
                </h3>
                <p className="text-gray-400 mb-4">
                  Follow me on Medium for the latest articles
                </p>
                <a
                  href="https://medium.com/@dulshansiriwardhanaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 transition-all"
                >
                  Visit Medium
                </a>
              </div>
            </ScrollAnimation>
          </div>
        )}

        {activeTab === 'project-euler' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-[#1a1a1a]/50 backdrop-blur-md border border-green-500/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50 group-focus-within:text-green-400 transition-colors">
                      <Search size={18} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search threshold nodes..."
                      className="w-full pl-12 pr-12 py-3.5 bg-black/40 border border-green-500/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20 transition-all font-mono text-sm"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                        aria-label="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50 pointer-events-none">
                      <Filter size={16} />
                    </div>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="w-full md:w-[220px] pl-11 pr-4 py-3.5 bg-black/40 border border-green-500/10 rounded-xl text-white focus:outline-none focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20 transition-all cursor-pointer appearance-none font-mono text-sm"
                    >
                      <option value="" className="bg-[#1a1a1a]">ALL PROTOCOLS</option>
                      <option value="Easy" className="bg-[#1a1a1a] text-green-400">L1 // TRIVIAL</option>
                      <option value="Medium" className="bg-[#1a1a1a] text-yellow-400">L2 // MODERATE</option>
                      <option value="Hard" className="bg-[#1a1a1a] text-red-500">L3 // CRITICAL</option>
                    </select>
                  </div>
                  {(searchQuery || difficultyFilter) && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="px-6 py-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-all whitespace-nowrap font-black uppercase tracking-widest text-[10px]"
                    >
                      Reset Buffer
                    </button>
                  )}
                </div>
                {(searchQuery || difficultyFilter) && (
                  <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-green-500/5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Active Stream:</span>
                    {searchQuery && (
                      <span className="px-3 py-1 bg-green-500/5 border border-green-500/10 rounded-full text-green-400 text-[10px] font-bold flex items-center gap-2">
                        <span>SEARCH: {searchQuery}</span>
                        <button onClick={() => setSearchQuery('')} className="hover:text-white"><X size={10} /></button>
                      </span>
                    )}
                    {difficultyFilter && (
                      <span className="px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full text-blue-400 text-[10px] font-bold flex items-center gap-2">
                        <span>LEVEL: {difficultyFilter}</span>
                        <button onClick={() => setDifficultyFilter('')} className="hover:text-white"><X size={10} /></button>
                      </span>
                    )}
                  </div>
                )}
              </form>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400 mb-4"></div>
                <div className="text-green-400 text-xl font-medium">Loading articles...</div>
              </div>
            ) : projectEulerArticles.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <div className="text-gray-300 text-xl font-semibold mb-2">No articles found</div>
                <div className="text-gray-500 text-sm">
                  {searchQuery || difficultyFilter
                    ? 'Try adjusting your search criteria'
                    : 'No Project Euler solutions published yet'}
                </div>
                {(searchQuery || difficultyFilter) && (
                  <button
                    onClick={handleClearSearch}
                    className="mt-4 px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-400 text-sm">
                    Showing <span className="text-green-400 font-semibold">{projectEulerArticles.length}</span> article{projectEulerArticles.length !== 1 ? 's' : ''}
                    {totalPages > 1 && (
                      <span className="ml-2">
                        (Page {currentPage} of {totalPages})
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectEulerArticles.map((article, index) => (
                    <ProjectEulerArticleCard
                      key={article._id}
                      article={article}
                      index={index}
                      onClick={() => setSelectedArticle(article.problemNumber)}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 mt-8">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-6 py-2.5 bg-[#1a1a1a]/50 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1a1a1a]/50 disabled:hover:border-green-500/20 transition-all font-medium"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg border transition-all font-medium ${currentPage === pageNum
                              ? 'bg-green-500/20 border-green-500/50 text-green-400'
                              : 'bg-[#1a1a1a]/50 border-green-500/20 text-gray-400 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400'
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-6 py-2.5 bg-[#1a1a1a]/50 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1a1a1a]/50 disabled:hover:border-green-500/20 transition-all font-medium"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {selectedArticle && (
        <ProjectEulerArticleDetail
          problemNumber={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
};

export default BlogSection;
