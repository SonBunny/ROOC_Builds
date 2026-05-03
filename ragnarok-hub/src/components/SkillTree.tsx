import { useState } from 'react';
import type { SkillTree, BuildSkill } from '../types/builds';
import SkillNode from './SkillNode';
import SkillTreeModal from './SkillTreeModal';

interface SkillTreeProps {
  skillTrees: SkillTree[];
  buildSkills?: BuildSkill[];
}

export default function SkillTree({ skillTrees, buildSkills = [] }: SkillTreeProps) {
  const [selectedTreeId, setSelectedTreeId] = useState(skillTrees[0]?.id || '');
  const [showModal, setShowModal] = useState(false);

  const selectedTree = skillTrees.find(tree => tree.id === selectedTreeId);

  const getBuildSkill = (skillId: string) => {
    return buildSkills.find(bs => bs.skillId === skillId);
  };

  const isLearned = (skillId: string) => {
    const buildSkill = getBuildSkill(skillId);
    return buildSkill && buildSkill.level > 0;
  };

  return (
    <>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold mb-4 text-white">Skills</h3>

        {/* Tree Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {skillTrees.map(tree => (
            <button
              key={tree.id}
              onClick={() => setSelectedTreeId(tree.id)}
              className={`
                px-4 py-2 rounded-lg font-semibold transition
                ${selectedTreeId === tree.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }
              `}
            >
              {tree.name}
            </button>
          ))}
        </div>

        {/* View Full Tree Button */}
        {selectedTree && (
          <button
            onClick={() => setShowModal(true)}
            className="mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-sm font-semibold transition"
          >
            View Full Tree
          </button>
        )}

        {/* Skill Tree Display */}
        {selectedTree && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {selectedTree.skills.map(skill => {
              const buildSkill = getBuildSkill(skill.id);
              const learned = isLearned(skill.id);
              const isPassive = skill.type === 'passive';

              return (
                <div
                  key={skill.id}
                  className={`
                    relative bg-slate-700 p-4 transition-all flex flex-col items-center
                    ${learned ? 'ring-2 ring-blue-500' : 'opacity-70'}
                    ${isPassive ? 'rounded-xl' : 'rounded-full'}
                  `}
                >
                  <div className={`w-16 h-16 bg-slate-800 flex items-center justify-center flex-shrink-0 ${isPassive ? 'rounded-lg' : 'rounded-full'}`}>
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="w-14 h-14" />
                    ) : (
                      <span className="text-3xl">⚡</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="font-bold text-white text-sm">{skill.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {buildSkill?.level || 0}/{skill.maxLevel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Skill Tree Modal */}
      {showModal && (
        <SkillTreeModal
          skillTrees={skillTrees}
          buildSkills={buildSkills}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
