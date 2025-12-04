import { ProjectEulerArticle } from '../utils/api';
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
        className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300 h-full flex flex-col min-h-[300px] cursor-pointer"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-green-400 text-sm font-medium">
            Problem #{article.problemNumber}
          </span>
          <span className={`px-2 py-1 text-xs rounded border ${difficultyColors[article.difficulty]}`}>
            {article.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed flex-grow">
          {article.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-xs text-purple-400">
            {article.solution.language}
          </span>
          {article.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400"
            >
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{article.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center text-green-400 text-sm font-medium group-hover:gap-2 transition-all">
          View Solution
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default ProjectEulerArticleCard;

