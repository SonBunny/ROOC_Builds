import type { Skill, BuildSkill } from '../types/builds';

interface SkillNodeProps {
  skill: Skill;
  buildSkill?: BuildSkill;
  isLearned?: boolean;
}

export default function SkillNode({ skill, buildSkill, isLearned = false }: SkillNodeProps) {
  const currentLevel = buildSkill?.level || 0;
  const hasPrerequisites = skill.prerequisites.length > 0;
  const isPassive = skill.type === 'passive';

  // Split skill name into words - 1 line unless more than 2 words
  const words = skill.name.split(' ');
  const nameLines: string[] = [];
  if (words.length <= 2) {
    nameLines.push(skill.name);
  } else {
    for (let i = 0; i < words.length; i += 2) {
      nameLines.push(words.slice(i, i + 2).join(' '));
    }
  }

  return (
    <div
      className={`
        relative bg-slate-700 p-4 transition-all
        ${isLearned ? 'ring-2 ring-blue-500' : 'opacity-70'}
        ${isPassive ? 'rounded-xl' : 'rounded-full'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 bg-slate-800 flex items-center justify-center flex-shrink-0 ${isPassive ? 'rounded-lg' : 'rounded-full'}`}>
          {skill.icon ? (
            <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
          ) : (
            <span className="text-2xl">⚡</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-slate-600 rounded-lg px-2 py-1 mb-1">
            {nameLines.map((line, index) => (
              <div key={index} className="font-bold text-white text-sm">
                {line}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Level: {currentLevel}/{skill.maxLevel}
          </div>
          {hasPrerequisites && (
            <div className="text-xs text-purple-400 mt-1">
              Requires: {skill.prerequisites.map(p => p.skillId).join(', ')}
            </div>
          )}
        </div>
      </div>
      {skill.description && (
        <div className="mt-2 text-xs text-gray-300 line-clamp-2">
          {skill.description}
        </div>
      )}
    </div>
  );
}
