import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import { blogArticles } from "../constants/landingPageData";

const BlogSection = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {blogArticles.map((article, index) => (
            <ScrollAnimation key={index} delay={index * 100} direction="up">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300 h-full flex flex-col"
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

          {/* CTA Card */}
          <ScrollAnimation delay={blogArticles.length * 100} direction="up">
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
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
      </div>
    </section>
  );
};

export default BlogSection;

