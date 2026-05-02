import type { Stats, AllocatedStats, BonusStats } from '../types/builds';

interface StatsDisplayProps {
  stats: Stats;
  seasonalStats?: any;
}

function getTotalStat(allocated: number, bonus?: number): number {
  return allocated + (bonus || 0);
}

export default function StatsDisplay({ stats, seasonalStats }: StatsDisplayProps) {
  const { allocated, bonus } = stats;

  const totalStats: AllocatedStats = {
    str: getTotalStat(allocated.str, bonus?.str),
    agi: getTotalStat(allocated.agi, bonus?.agi),
    vit: getTotalStat(allocated.vit, bonus?.vit),
    int: getTotalStat(allocated.int, bonus?.int),
    dex: getTotalStat(allocated.dex, bonus?.dex),
    luk: getTotalStat(allocated.luk, bonus?.luk),
  };

  const statConfig = [
    { key: 'str' as keyof AllocatedStats, label: 'STR', color: 'bg-red-500' },
    { key: 'agi' as keyof AllocatedStats, label: 'AGI', color: 'bg-green-500' },
    { key: 'vit' as keyof AllocatedStats, label: 'VIT', color: 'bg-yellow-500' },
    { key: 'int' as keyof AllocatedStats, label: 'INT', color: 'bg-blue-500' },
    { key: 'dex' as keyof AllocatedStats, label: 'DEX', color: 'bg-purple-500' },
    { key: 'luk' as keyof AllocatedStats, label: 'LUK', color: 'bg-pink-500' },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-white">Stats</h3>
      <div className="space-y-3">
        {statConfig.map((stat) => {
          const value = totalStats[stat.key];
          const baseValue = allocated[stat.key];
          const bonusValue = bonus?.[stat.key] || 0;

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
                {bonusValue > 0 && (
                  <span className="text-xs text-green-400 ml-1">(+{bonusValue})</span>
                )}
              </span>
            </div>
          );
        })}
        {(bonus?.maxhp || bonus?.maxsp) && (
          <div className="mt-4 pt-4 border-t border-slate-600">
            {bonus.maxhp && (
              <div className="flex items-center gap-3 mb-2">
                <span className="w-12 font-bold text-gray-300">HP</span>
                <span className="text-green-400">+{bonus.maxhp}</span>
              </div>
            )}
            {bonus.maxsp && (
              <div className="flex items-center gap-3">
                <span className="w-12 font-bold text-gray-300">SP</span>
                <span className="text-blue-400">+{bonus.maxsp}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
