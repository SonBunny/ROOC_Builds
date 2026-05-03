export interface Class {
  id: string;
  name: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  categoryId: string;
  name: string;
  hasSeasons?: boolean;
}

export interface BuildType {
  id: string;
  eventId: string;
  name: string;
}

export interface AllocatedStats {
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
}

export interface BonusStats {
  str?: number;
  agi?: number;
  vit?: number;
  int?: number;
  dex?: number;
  luk?: number;
  maxhp?: number;
  maxsp?: number;
}

export interface Stats {
  allocated: AllocatedStats;
  bonus: BonusStats;
}

export interface EquipmentItem {
  name: string;
  refine: number;
  cards: string[];
}

export interface Equipment {
  headwear?: EquipmentItem;
  facewear?: EquipmentItem;
  mouthewear?: EquipmentItem;
  weapon?: EquipmentItem;
  armor?: EquipmentItem;
  cloak?: EquipmentItem;
  shoes?: EquipmentItem;
  accessory1?: EquipmentItem;
  accessory2?: EquipmentItem;
  backwear?: EquipmentItem;
  costume?: EquipmentItem;
}

export interface RefineEffect {
  level: number;
  effects: string[];
}

export interface SetEffects {
  base: string[];
  refine?: RefineEffect[];
  set_effects?: Array<{
    pieces: number;
    effects: string[];
  }>;
}

export interface DivineArmamentSet {
  set: string;
  effects?: SetEffects;
  set_effects?: Array<{
    pieces: number;
    effects: string[];
  }>;
}

export interface SeasonalStat {
  Level?: number;
  "Permanent Stats"?: {
    pdef?: number;
    mdef?: number;
    maxhp?: number;
    pvpdmgreduction?: number;
  };
  "Seasonal Stats"?: {
    [key: string]: number;
  };
}

export interface DivineArmament {
  seasonalStats?: Record<string, SeasonalStat>;
  weapon?: DivineArmamentSet;
  shield?: DivineArmamentSet;
  armor?: DivineArmamentSet;
}

export interface Medals {
  [medalName: string]: {
    Level: number;
  };
}

export interface Enchants {
  [slot: string]: string[];
}

export interface Feather {
  [featherName: string]: {
    feather1: string;
    feather2: string;
    feather3: string;
    feather4: string;
    feather5: string;
  };
}

export interface Build {
  id: string;
  classId: string;
  categoryId: string;
  eventId: string;
  buildTypeId: string;
  name: string;
  description: string;
  author: string;
  lastUpdated?: string;
  stats: Stats;
  equipment: Equipment;
  skills?: BuildSkill[];
  feather?: Feather;
  pet?: { name: string; level: number };
  medals?: Medals;
  divineArmament?: DivineArmament;
  cards?: string[];
  enchants?: Enchants;
  guildSkills?: string[];
  consumableBuffs?: string[];
  images?: string[];
  tags?: string[];
}

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isLatest: boolean;
}

export interface SkillPrerequisite {
  skillId: string;
  level: number;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  maxLevel: number;
  description: string;
  type: 'active' | 'passive';
  prerequisites: SkillPrerequisite[];
}

export interface SkillTree {
  id: string;
  name: string;
  skills: Skill[];
}

export interface ClassSkillData {
  classId: string;
  className: string;
  skillTrees: SkillTree[];
}

export interface BuildSkill {
  skillId: string;
  level: number;
}
