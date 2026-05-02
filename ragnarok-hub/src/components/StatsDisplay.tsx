import type { Stats } from '../types/builds';

interface StatsDisplayProps {
  stats: Stats;
  seasonalStats?: Partial<Stats>;
}

export default function StatsDisplay({ stats, seasonalStats }: StatsDisplayProps) {
  const displayStats = seasonalStats ? { ...stats, ...seasonalStats } : stats;

  const statConfig = [
    { key: 'str' as keyof Stats, label: 'STR', color: 'bg-red-500' },
    { key: 'agi' as keyof Stats, label: 'AGI', color: 'bg-green-500' },
    { key: 'vit' as keyof Stats, label: 'VIT', color: 'bg-yellow-500' },
    { key: 'int' as keyof Stats, label: 'INT', color: 'bg-blue-500' },
    { key: 'dex' as keyof Stats, label: 'DEX', color: 'bg-purple-500' },
    { key: 'luk' as keyof Stats, label: 'LUK', color: 'bg-pink-500' },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-white">Stats</h3>
      <div className="space-y-3">
        {statConfig.map((stat) => {
          const value = displayStats[stat.key];
          const baseValue = stats[stat.key];
          const isSeasonal = seasonalStats && seasonalStats[stat.key] !== undefined;

          return (
            <div key={stat.key} className="flex items-center gap-3">
              <span className="w-12 font-bold text-gray-300">{stat.label}</span>
              <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`${stat.color} h-full transition-all duration-300`}
                  style={{ width: `${(value / 99) * 100}%` }}
                />
              </div>
              <span className="w-16 text-right font-mono text-white">
                {value}
                {isSeasonal && (
                  <span className="text-xs text-green-400 ml-1">(+{value - baseValue})</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
