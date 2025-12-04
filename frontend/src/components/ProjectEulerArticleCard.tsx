import type { ProjectEulerArticle } from '../utils/api';
import ScrollAnimation from './ScrollAnimation';

interface ProjectEulerArticleCardProps {
  article: ProjectEulerArticle;
  index: number;
  onClick: () => void;
}

const ProjectEulerArticleCard = ({ article, index, onClick }: ProjectEulerArticleCardProps) => {
  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <ScrollAnimation delay={index * 50} direction="up">
      <div
        onClick={onClick}
        className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 hover:bg-[#1a1a1a]/70 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 h-full flex flex-col min-h-[320px] cursor-pointer"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-green-400 text-sm font-semibold">
            Problem #{article.problemNumber}
          </span>
          <span className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${difficultyColors[article.difficulty]}`}>
            {article.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed flex-grow line-clamp-3">
          {article.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-xs text-purple-400 font-medium">
            {article.solution.language}
          </span>
          {article.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-400 font-medium"
            >
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2.5 py-1 text-xs text-gray-500 font-medium">
              +{article.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center text-green-400 text-sm font-semibold group-hover:gap-2 transition-all mt-auto pt-2 border-t border-green-500/10">
          View Solution
          <span className="ml-2 group-hover:translate-x-1 transition-transform text-lg">
            →
          </span>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default ProjectEulerArticleCard;

