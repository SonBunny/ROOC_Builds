import type { Build } from '../types/builds';

interface BuildCardProps {
  build: Build;
  onClick: () => void;
}

export default function BuildCard({ build, onClick }: BuildCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6
                 hover:scale-105 transition-all duration-300
                 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:border-blue-500"
    >
      <h3 className="text-xl font-bold text-white mb-2">{build.name}</h3>
      <p className="text-sm text-gray-400 mb-3">{build.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {build.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-purple-600 text-white rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-xs text-gray-500">
        By {build.author} • Updated {build.lastUpdated}
      </div>
    </div>
  );
}
