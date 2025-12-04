import { useState, useEffect } from 'react';
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
      loadProjectEulerArticles();
    }
  }, [activeTab, currentPage, searchQuery, difficultyFilter]);

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
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadProjectEulerArticles();
  };

  return (
    <section
      id="blog"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle
          title="Blog & Articles"
          subtitle="Sharing knowledge and insights about technology"
        />

        <div className="flex gap-4 border-b border-green-500/20 mb-8">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'blog'
                ? 'text-green-400 border-b-2 border-green-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Blog Articles
          </button>
          <button
            onClick={() => setActiveTab('project-euler')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'project-euler'
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
          <div className="space-y-6">
            <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, description, or tags..."
                  className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
                <select
                  value={difficultyFilter}
                  onChange={(e) => {
                    setDifficultyFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-3 bg-[#1a1a1a] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500/50"
                >
                  <option value="">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 transition-all"
                >
                  Search
                </button>
              </form>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="text-green-400 text-xl">Loading articles...</div>
              </div>
            ) : projectEulerArticles.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 text-xl">No articles found</div>
              </div>
            ) : (
              <>
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
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-[#1a1a1a]/50 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-[#1a1a1a]/50 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
