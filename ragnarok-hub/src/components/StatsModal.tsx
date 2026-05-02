import { useState, useEffect } from 'react';
import { loadEvents, loadCategories } from '../utils/dataLoader';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
  author: string;
  eventId: string;
  categoryId: string;
  buildName: string;
}

export default function StatsModal({ isOpen, onClose, classId, author, eventId, categoryId, buildName }: StatsModalProps) {
  const [eventName, setEventName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [imagePaths, setImagePaths] = useState<{
    basicStats: string;
    statsDetails: string[];
  } | null>(null);

  useEffect(() => {
    loadEvents().then((events) => {
      const event = events.find((e) => e.id === eventId);
      setEventName(event?.name || '');
    });
    loadCategories().then((categories) => {
      const category = categories.find((c) => c.id === categoryId);
      setCategoryName(category?.name || '');
    });
  }, [eventId, categoryId]);

  // Construct image paths when eventName and categoryName are available
  useEffect(() => {
    if (!eventName || !categoryName) return;

    // Convert IDs to match directory structure (remove hyphens, lowercase)
    const normalizedClassId = classId.replace(/-/g, '');
    const normalizedAuthor = author.toLowerCase();
    const normalizedEventId = eventId.replace(/-/g, '');

    // Simplify build name for image files (e.g., "Storm Gust High Wizard" → "Stormgust")
    let simplifiedBuildName = buildName
      .replace(/\s+/g, '')
      .replace(/HighWizard/gi, '')
      .replace(/HighPriest/gi, '')
      .replace(/LordKnight/gi, '')
      .replace(/AssassinCross/gi, '')
      .replace(/BioChemist/gi, '')
      .replace(/WhiteSmith/gi, '')
      .replace(/Champion/gi, '')
      .replace(/Paladin/gi, '')
      .replace(/Sniper/gi, '')
      .replace(/Stalker/gi, '')
      .replace(/Summoner/gi, '')
      .replace(/Gypsy/gi, '')
      .replace(/Ministrel/gi, '')
      .replace(/Sage/gi, '')
      .replace(/DreamShader/gi, '')
      .replace(/PvP/gi, '')
      .replace(/PvE/gi, '')
      .replace(/GuildLeague/gi, '')
      .replace(/DimensionDrill/gi, '')
      .replace(/EmperiumOverrun/gi, '')
      .replace(/MVPHunt/gi, '')
      .replace(/TeamDungeon/gi, '')
      .replace(/Juperos/gi, '')
      .replace(/EndlessTower/gi, '')
      .replace(/NightmareTemple/gi, '')
      .replace(/Build/gi, '')
      .replace(/Builds/gi, '')
      .trim()
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());

    console.log('Build name processing:', {
      original: buildName,
      simplified: simplifiedBuildName,
    });

    // Format the paths based on the build
    // Path format: /builds/{normalizedClassId}/{normalizedAuthor}/{normalizedEventId}/{eventName} {categoryName} {simplifiedBuildName} {type}.jpg
    const basePath = `/builds/${normalizedClassId}/${normalizedAuthor}/${normalizedEventId}`;
    const basicStatsImage = `${basePath}/${eventName} ${categoryName} ${simplifiedBuildName} Basic Stats.jpg`;
    const statsDetailImages = [
      `${basePath}/${eventName} ${categoryName} ${simplifiedBuildName} Stats Details 1.jpg`,
      `${basePath}/${eventName} ${categoryName} ${simplifiedBuildName} Stats Details 2.jpg`,
      `${basePath}/${eventName} ${categoryName} ${simplifiedBuildName} Stats Details 3.jpg`,
    ];

    // Debug logging
    console.log('StatsModal paths:', {
      normalizedClassId,
      normalizedAuthor,
      normalizedEventId,
      eventName,
      categoryName,
      simplifiedBuildName,
      basePath,
      basicStatsImage,
      statsDetailImages,
    });
    console.log('Basic Stats Image Path:', basicStatsImage);

    setImagePaths({
      basicStats: basicStatsImage,
      statsDetails: statsDetailImages,
    });
  }, [eventName, categoryName, classId, author, eventId, buildName]);

  if (!isOpen) return null;

  if (!imagePaths) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-slate-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="text-white text-center">Loading images...</div>
        </div>
      </div>
    );
  }

  const { basicStats, statsDetails } = imagePaths;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Stats Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Stats Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Basic Stats</h3>
            <div className="bg-slate-800 rounded-lg p-4">
              
              <img
                src={basicStats}
                alt="Basic Stats"
                className="w-full rounded-lg"
                style={{ minHeight: '200px', backgroundColor: '#1e293b' }}
                onError={(e) => {
                  console.error('Failed to load basic stats image:', basicStats);
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  // Show error message
                  const parent = img.parentElement;
                  if (parent) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'text-red-400 text-sm mt-2';
                    errorMsg.textContent = `Failed to load: ${basicStats}`;
                    parent.appendChild(errorMsg);
                  }
                }}
                onLoad={() => {
                  console.log('Loaded basic stats image:', basicStats);
                }}
              />
            </div>
          </div>

          {/* Stats Details Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Stats Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statsDetails.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Stats Details ${index + 1}`}
                  className="w-full rounded-lg"
                  onError={(e) => {
                    console.error(`Failed to load stats detail image ${index + 1}:`, src);
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    // Show error message
                    const parent = img.parentElement;
                    if (parent) {
                      const errorMsg = document.createElement('div');
                      errorMsg.className = 'text-red-400 text-sm';
                      errorMsg.textContent = `Failed to load: ${src}`;
                      parent.appendChild(errorMsg);
                    }
                  }}
                  onLoad={() => {
                    console.log(`Loaded stats detail image ${index + 1}:`, src);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
