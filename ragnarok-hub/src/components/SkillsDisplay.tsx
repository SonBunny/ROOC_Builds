import { useState, useEffect } from 'react';
import type { ClassSkillData, BuildSkill } from '../types/builds';
import { loadClassSkills } from '../utils/dataLoader';
import SkillTree from './SkillTree';

interface SkillsDisplayProps {
  classId: string;
  buildSkills?: BuildSkill[];
}

export default function SkillsDisplay({ classId, buildSkills }: SkillsDisplayProps) {
  const [skillData, setSkillData] = useState<ClassSkillData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClassSkills(classId)
      .then(data => {
        setSkillData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load skill data');
        setLoading(false);
      });
  }, [classId]);

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold mb-4 text-white">Skills</h3>
        <div className="text-gray-400">Loading skills...</div>
      </div>
    );
  }

  if (error || !skillData) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold mb-4 text-white">Skills</h3>
        <div className="text-gray-400">{error || 'No skill data available'}</div>
      </div>
    );
  }

  return <SkillTree skillTrees={skillData.skillTrees} buildSkills={buildSkills} />;
}
