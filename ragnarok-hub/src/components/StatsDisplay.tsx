import { useState } from 'react';
import type { Stats, AllocatedStats, SeasonalStat } from '../types/builds';
import StatsModal from './StatsModal';

interface StatsDisplayProps {
  stats: Stats;
  seasonalStats?: SeasonalStat;
  classId?: string;
  author?: string;
  eventId?: string;
  categoryId?: string;
  buildName?: string;
}

export default function StatsDisplay({ stats, seasonalStats, classId, author, eventId, categoryId, buildName }: StatsDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allocated, bonus } = stats;

  const totalStats: AllocatedStats = {
    str: allocated.str + (bonus?.str || 0),
    agi: allocated.agi + (bonus?.agi || 0),
    vit: allocated.vit + (bonus?.vit || 0),
    int: allocated.int + (bonus?.int || 0),
    dex: allocated.dex + (bonus?.dex || 0),
    luk: allocated.luk + (bonus?.luk || 0),
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
    <>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Stats</h3>
          {classId && author && eventId && buildName && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-semibold transition"
            >
              View Details
            </button>
          )}
        </div>
        <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold">
          <span className="w-12"></span>
          <span className="flex-1"></span>
          <span className="w-16 text-center flex items-center justify-center gap-1">
            Allocated
            <span className="text-blue-400 font-bold cursor-help hover:text-blue-300 transition" title="Stats you manually allocate">?</span>
          </span>
          <span className="w-16 text-center flex items-center justify-center gap-1">
            Bonus
            <span className="text-green-400 font-bold cursor-help hover:text-green-300 transition" title="Stats from equipment, cards, job bonuses, and other sources">?</span>
          </span>
        </div>
        {statConfig.map((stat) => {
          const allocatedValue = allocated[stat.key];
          const bonusValue = bonus?.[stat.key] || 0;
          const totalValue = totalStats[stat.key];

          return (
            <div key={stat.key} className="flex items-center gap-3">
              <span className="w-12 font-bold text-gray-300">{stat.label}</span>
              <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden relative">
                <div
                  className={`${stat.color} h-full transition-all duration-300 flex items-center justify-center`}
                  style={{ width: `${(totalValue / 99) * 100}%` }}
                >
                  <span className="text-xs font-bold text-white absolute left-1/2 -translate-x-1/2">{totalValue}</span>
                </div>
              </div>
              <span className="w-16 text-center font-mono text-white">{allocatedValue}</span>
              <span className="w-16 text-center font-mono text-green-400">{bonusValue > 0 ? `+${bonusValue}` : '-'}</span>
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
        {seasonalStats && (
          <div className="mt-4 pt-4 border-t border-slate-600">
            <div className="text-sm text-gray-400 font-semibold mb-2">Seasonal Stats</div>
            {seasonalStats.Level && (
              <div className="flex items-center gap-3 mb-2">
                <span className="w-12 font-bold text-gray-300">Lvl</span>
                <span className="text-white">{seasonalStats.Level}</span>
              </div>
            )}
            {seasonalStats.PermanentStats && (
              <div className="space-y-1">
                {seasonalStats.PermanentStats.pdef && (
                  <div className="flex items-center gap-3">
                    <span className="w-12 font-bold text-gray-300">PDEF</span>
                    <span className="text-white">+{seasonalStats.PermanentStats.pdef}</span>
                  </div>
                )}
                {seasonalStats.PermanentStats.mdef && (
                  <div className="flex items-center gap-3">
                    <span className="w-12 font-bold text-gray-300">MDEF</span>
                    <span className="text-white">+{seasonalStats.PermanentStats.mdef}</span>
                  </div>
                )}
                {seasonalStats.PermanentStats.maxhp && (
                  <div className="flex items-center gap-3">
                    <span className="w-12 font-bold text-gray-300">HP</span>
                    <span className="text-green-400">+{seasonalStats.PermanentStats.maxhp}</span>
                  </div>
                )}
                {seasonalStats.PermanentStats.pvpdmgreduction && (
                  <div className="flex items-center gap-3">
                    <span className="w-12 font-bold text-gray-300">PvP</span>
                    <span className="text-blue-400">+{seasonalStats.PermanentStats.pvpdmgreduction}%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      </div>
      <StatsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classId={classId || ''}
        author={author || ''}
        eventId={eventId || ''}
        categoryId={categoryId || ''}
        buildName={buildName || ''}
      />
    </>
  );
}
