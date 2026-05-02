import { useParams, useNavigate } from "react-router-dom";
import { loadBuilds, loadSeasons, getLatestSeason } from "../utils/dataLoader";
import PageContainer from "../components/PageContainer";
import StatsDisplay from "../components/StatsDisplay";
import EquipmentDisplay from "../components/EquipmentDisplay";
import SkillsDisplay from "../components/SkillsDisplay";
import SeasonFilter from "../components/SeasonFilter";
import { useState, useEffect } from "react";
import type { Build, Season } from "../types/builds";

export default function BuildDetail() {
  const { buildId } = useParams();
  const nav = useNavigate();
  const [build, setBuild] = useState<Build | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  useEffect(() => {
    loadBuilds().then((builds) => {
      const found = builds.find((b) => b.id === buildId);
      setBuild(found || null);
    });
    loadSeasons().then((allSeasons) => {
      setSeasons(allSeasons);
      getLatestSeason().then((latest) => {
        if (latest) setSelectedSeason(latest.id);
      });
    });
  }, [buildId]);

  if (!build) return <div>Not found</div>;

  const hasSeasonalStats = build.divineArmament.seasonalStats && Object.keys(build.divineArmament.seasonalStats).length > 0;
  const currentSeasonalStats = selectedSeason && build.divineArmament.seasonalStats
    ? build.divineArmament.seasonalStats[selectedSeason]
    : undefined;

  return (
    <PageContainer>
      <button
        onClick={() => nav(-1)}
        className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-white"
      >
        ← Back
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{build.name}</h1>
        <p className="text-gray-400 mb-4">{build.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>By {build.author}</span>
          <span>•</span>
          <span>Updated {build.lastUpdated}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {build.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {hasSeasonalStats && (
        <SeasonFilter
          seasons={seasons}
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StatsDisplay stats={build.stats} seasonalStats={currentSeasonalStats} />
        <SkillsDisplay skills={build.skills} />
      </div>

      <EquipmentDisplay equipment={build.equipment} />

      {build.feather && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Feather</h3>
          <div className="text-white">
            {build.feather.name} (Level {build.feather.level})
          </div>
        </div>
      )}

      {build.pet && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Pet</h3>
          <div className="text-white">
            {build.pet.name} (Level {build.pet.level})
          </div>
        </div>
      )}

      {build.medals && build.medals.length > 0 && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Medals</h3>
          <div className="flex flex-wrap gap-2">
            {build.medals.map((medal, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm"
              >
                {medal}
              </span>
            ))}
          </div>
        </div>
      )}

      {build.divineArmament && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Divine Armament</h3>
          <div className="text-white mb-4">{build.divineArmament.set}</div>
          {hasSeasonalStats && (
            <div className="text-sm text-gray-400">
              {selectedSeason
                ? `Showing stats for Season ${selectedSeason}`
                : 'Showing base stats'}
            </div>
          )}
        </div>
      )}

      {build.cards && build.cards.length > 0 && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Cards</h3>
          <div className="flex flex-wrap gap-2">
            {build.cards.map((card, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-600 text-white rounded-full text-sm"
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      )}

      {build.enchants && build.enchants.length > 0 && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Enchants</h3>
          <div className="flex flex-wrap gap-2">
            {build.enchants.map((enchant, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm"
              >
                {enchant}
              </span>
            ))}
          </div>
        </div>
      )}

      {build.guildSkills && build.guildSkills.length > 0 && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Guild Skills</h3>
          <div className="flex flex-wrap gap-2">
            {build.guildSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {build.consumableBuffs && build.consumableBuffs.length > 0 && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Consumable Buffs</h3>
          <div className="flex flex-wrap gap-2">
            {build.consumableBuffs.map((buff, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm"
              >
                {buff}
              </span>
            ))}
          </div>
        </div>
      )}

      {build.images && build.images.length > 0 && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {build.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Build image ${index + 1}`}
                className="rounded-xl w-full h-auto"
              />
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}