import type { Season } from '../types/builds';

interface SeasonFilterProps {
  seasons: Season[];
  selectedSeason: string | null;
  onSeasonChange: (seasonId: string | null) => void;
}

export default function SeasonFilter({ seasons, selectedSeason, onSeasonChange }: SeasonFilterProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">Season</label>
      <select
        value={selectedSeason || ''}
        onChange={(e) => onSeasonChange(e.target.value || null)}
        className="w-full md:w-64 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Seasons</option>
        {seasons.map((season) => (
          <option key={season.id} value={season.id}>
            {season.name} {season.isLatest && '(Latest)'}
          </option>
        ))}
      </select>
    </div>
  );
}
