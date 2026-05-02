import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { classes } from "../data/classes";
import Card from "../components/Card";
import PageContainer from "../components/PageContainer";

const classDescriptions: { [key: string]: string } = {
  "High Wizard": "Master the arcane arts of fire, ice, and lightning. Unleash devastating spells from afar.",
  "Sage": "Combine wisdom and magic to support allies and control the battlefield.",
  "Assassin Cross": "Strike from the shadows with unmatched speed and deadly precision.",
  "Bio Chemist": "Command the power of potions and biochemical warfare to overwhelm enemies.",
  "Champion": "Harness martial arts mastery with powerful combo attacks.",
  "Gypsy": "Weave fate itself with mystical songs and dances that alter reality.",
  "High Priest": "Heal and protect allies while commanding holy magic against evil.",
  "Lord Knight": "The ultimate warrior, combining strength and strategy with polearm mastery.",
  "Ministrel": "Inspire allies and devastate enemies with the power of music.",
  "Paladin": "Protect the weak and smite evil with righteous holy power.",
  "Sniper": "Master marksmanship for precision kills from long distances.",
  "Stalker": "Track and hunt prey with ninja-like stealth and traps.",
  "Summoner": "Command powerful summons to fight alongside you in battle.",
  "WhiteSmith": "Forge superior weapons and armor while crushing foes with hammer strikes."
};

const classGradients: { [key: string]: string } = {
  "High Wizard": "from-blue-500 to-purple-600",
  "Sage": "from-emerald-400 to-teal-500",
  "Assassin Cross": "from-gray-600 to-red-700",
  "Bio Chemist": "from-green-500 to-lime-600",
  "Champion": "from-yellow-500 to-orange-600",
  "Gypsy": "from-pink-500 to-rose-600",
  "High Priest": "from-yellow-300 to-amber-500",
  "Lord Knight": "from-red-600 to-orange-700",
  "Ministrel": "from-purple-500 to-pink-600",
  "Paladin": "from-blue-300 to-cyan-500",
  "Sniper": "from-gray-700 to-blue-800",
  "Stalker": "from-slate-700 to-slate-900",
  "Summoner": "from-indigo-600 to-purple-700",
  "WhiteSmith": "from-orange-500 to-amber-600"
};

export default function Home() {
  const nav = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("featured");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % classes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentClass = classes[currentIndex];
  const gradientClass = classGradients[currentClass.name] || "from-blue-500 to-purple-600";
  const description = classDescriptions[currentClass.name] || "A powerful Ragnarok class with unique abilities.";

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + classes.length) % classes.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % classes.length);
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <div className="mb-16 text-center pt-8">
        <h1 className="text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight">
          Ragnarok Build Hub
        </h1>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"></div>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Explore powerful builds and strategies for every class. Master the art of combat and discover your ultimate warrior.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-12 flex justify-center">
        <div className="inline-flex bg-slate-800/50 border border-slate-700 rounded-lg p-1 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab("featured")}
            className={`px-6 md:px-8 py-3 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${
              activeTab === "featured"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 md:px-8 py-3 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${
              activeTab === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white"
            }`}
          >
            All Classes
          </button>
        </div>
      </div>

      {/* Featured Tab Content */}
      {activeTab === "featured" && (
      <div className="mb-20 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-700 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-6 md:p-12 lg:p-16 min-h-[500px] lg:min-h-[600px]">
          {/* Left Content */}
          <div className="flex-1 space-y-6 order-2 lg:order-1">
            <div>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`}>
                {currentClass.name}
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r rounded-full" style={{backgroundImage: `linear-gradient(to right, currentColor)`}}></div>
            </div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {description}
            </p>
            <button 
              onClick={() => nav(`/class/${currentClass.id}`)}
              className={`inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r ${gradientClass} hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 rounded-xl font-bold transition-all duration-300 text-white transform text-sm md:text-base`}
            >
              Explore Builds →
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-30 -z-10"></div>
              <img 
                src={`/classes/${currentClass.name.replace(/\s+/g, '%20')}.png`}
                alt={currentClass.name} 
                className="w-full h-auto drop-shadow-2xl rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-12 lg:px-16 pb-8">
          <button 
            onClick={goToPrevious}
            className="px-4 md:px-6 py-2 md:py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-semibold text-sm md:text-base"
          >
            ← Previous
          </button>

          {/* Dots */}
          <div className="flex gap-2 flex-wrap justify-center">
            {classes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all ${
                  index === currentIndex ? 'bg-blue-500 w-8 h-3 rounded-full' : 'bg-slate-600 hover:bg-slate-500 w-3 h-3 rounded-full'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={goToNext}
            className="px-4 md:px-6 py-2 md:py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-semibold text-sm md:text-base"
          >
            Next →
          </button>
        </div>
      </div>
      )}

      {/* All Classes Tab Content */}
      {activeTab === "all" && (
      <div className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">All Classes</h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Choose your path and master your class</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {classes.map((c) => (
            <Card 
              key={c.id} 
              onClick={() => nav(`/class/${c.id}`)}
              className="hover:scale-110 hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-slate-700/50 to-slate-800/50 hover:from-blue-600/30 hover:to-purple-600/30"
            >
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">{c.name}</h3>
            </Card>
          ))}
        </div>
      </div>
      )}
    </PageContainer>
  );
}