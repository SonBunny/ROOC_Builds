import type { Class, Category, Event, BuildType, Build, Season, ClassSkillData } from '../types/builds';

export async function loadClasses(): Promise<Class[]> {
  const response = await fetch('/data/classes.json');
  const data = await response.json();
  return data.classes;
}

export async function loadCategories(): Promise<Category[]> {
  const response = await fetch('/data/categories.json');
  const data = await response.json();
  return data.categories;
}

export async function loadEvents(): Promise<Event[]> {
  const response = await fetch('/data/events.json');
  const data = await response.json();
  return data.events;
}

export async function loadBuildTypes(): Promise<BuildType[]> {
  const response = await fetch('/data/build-types.json');
  const data = await response.json();
  return data.buildTypes;
}

export async function loadBuildsByClass(classId: string): Promise<Build[]> {
  const response = await fetch(`/data/builds/${classId}.json`);
  const data = await response.json();
  return data.builds || [];
}

export async function loadBuilds(): Promise<Build[]> {
  // This function is deprecated - use loadBuildsByClass instead
  // Kept for backward compatibility
  const response = await fetch('/data/builds.json');
  const data = await response.json();
  return data.builds;
}

export async function loadSeasons(): Promise<Season[]> {
  const response = await fetch('/data/seasons.json');
  const data = await response.json();
  return data.seasons;
}

export async function getLatestSeason(): Promise<Season | null> {
  const seasons = await loadSeasons();
  return seasons.find(s => s.isLatest) || null;
}

export async function loadClassSkills(classId: string): Promise<ClassSkillData | null> {
  try {
    const response = await fetch(`/data/skills/${classId}-skills.json`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
