import { useParams, useNavigate } from "react-router-dom";
import { loadBuildsByClass, loadSeasons, getLatestSeason, loadClasses } from "../utils/dataLoader";
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
    // Find the correct classId by matching buildId prefix against known classes
    loadClasses().then((classes) => {
      // Find which class this build belongs to by checking if buildId starts with classId
      const matchingClass = classes.find((c) => buildId?.startsWith(c.id));

      if (matchingClass) {
        loadBuildsByClass(matchingClass.id).then((builds) => {
          const found = builds.find((b) => b.id === buildId);
          setBuild(found || null);
        });
      } else {
        setBuild(null);
      }
    });

    loadSeasons().then((allSeasons) => {
      setSeasons(allSeasons);
      getLatestSeason().then((latest) => {
        if (latest) setSelectedSeason(latest.id);
      });
    });
  }, [buildId]);

  if (!build) return <div>Not found</div>;

  const isNightmareTemple = build.eventId === 'nightmare-temple';
  const hasSeasonalStats = build.divineArmament?.seasonalStats && Object.keys(build.divineArmament.seasonalStats).length > 0;
  const currentSeasonalStats = selectedSeason && build.divineArmament?.seasonalStats
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
          {build.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {isNightmareTemple && hasSeasonalStats && (
        <SeasonFilter
          seasons={seasons}
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StatsDisplay stats={build.stats} seasonalStats={currentSeasonalStats} />
        <SkillsDisplay skills={build.skills || []} />
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

      {build.medals && Object.keys(build.medals).length > 0 && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Medals</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(build.medals).map(([medalName, medalData], index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm"
              >
                {medalName} (Level {medalData.Level})
              </span>
            ))}
          </div>
        </div>
      )}

      {build.divineArmament && (
        <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-white">Divine Armament</h3>
          {build.divineArmament.weapon && (
            <div className="mb-4">
              <div className="text-white font-bold mb-2">Weapon: {build.divineArmament.weapon.set}</div>
              {build.divineArmament.weapon.effects?.base && (
                <div className="text-sm text-gray-400 mb-2">
                  <div className="font-semibold text-gray-300">Base Effects:</div>
                  {build.divineArmament.weapon.effects.base.map((effect, i) => (
                    <div key={i}>• {effect}</div>
                  ))}
                </div>
              )}
              {build.divineArmament.weapon.effects?.refine && (
                <div className="text-sm text-gray-400">
                  <div className="font-semibold text-gray-300">Refine Effects:</div>
                  {build.divineArmament.weapon.effects.refine.map((refine, i) => (
                    <div key={i}>+{refine.level}: {refine.effects.join(', ')}</div>
                  ))}
                </div>
              )}
            </div>
          )}
          {build.divineArmament.shield && (
            <div className="mb-4">
              <div className="text-white font-bold mb-2">Shield: {build.divineArmament.shield.set || 'None'}</div>
              {build.divineArmament.shield.effects?.base && build.divineArmament.shield.effects.base.length > 0 && (
                <div className="text-sm text-gray-400 mb-2">
                  <div className="font-semibold text-gray-300">Base Effects:</div>
                  {build.divineArmament.shield.effects.base.map((effect, i) => (
                    <div key={i}>• {effect}</div>
                  ))}
                </div>
              )}
              {build.divineArmament.shield.effects?.refine && build.divineArmament.shield.effects.refine.length > 0 && (
                <div className="text-sm text-gray-400">
                  <div className="font-semibold text-gray-300">Refine Effects:</div>
                  {build.divineArmament.shield.effects.refine.map((refine, i) => (
                    <div key={i}>+{refine.level}: {refine.effects.join(', ')}</div>
                  ))}
                </div>
              )}
            </div>
          )}
          {build.divineArmament.armor && (
            <div className="mb-4">
              <div className="text-white font-bold mb-2">Armor: {build.divineArmament.armor.set}</div>
              {build.divineArmament.armor.effects?.base && (
                <div className="text-sm text-gray-400 mb-2">
                  <div className="font-semibold text-gray-300">Base Effects:</div>
                  {build.divineArmament.armor.effects.base.map((effect, i) => (
                    <div key={i}>• {effect}</div>
                  ))}
                </div>
              )}
              {build.divineArmament.armor.effects?.refine && (
                <div className="text-sm text-gray-400 mb-2">
                  <div className="font-semibold text-gray-300">Refine Effects:</div>
                  {build.divineArmament.armor.effects.refine.map((refine, i) => (
                    <div key={i}>+{refine.level}: {refine.effects.join(', ')}</div>
                  ))}
                </div>
              )}
              {build.divineArmament.armor.set_effects && build.divineArmament.armor.set_effects.length > 0 && (
                <div className="text-sm text-gray-400">
                  <div className="font-semibold text-gray-300">Set Effects:</div>
                  {build.divineArmament.armor.set_effects.map((setEffect, i) => (
                    <div key={i}>{setEffect.pieces} pieces: {setEffect.effects.join(', ')}</div>
                  ))}
                </div>
              )}
            </div>
          )}
          {hasSeasonalStats && (
            <div className="text-sm text-gray-400 mt-4">
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