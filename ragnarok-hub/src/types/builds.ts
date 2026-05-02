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

export interface Stats {
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
}

export interface EquipmentItem {
  name: string;
  refine: number;
  cards: string[];
}

export interface Equipment {
  head?: EquipmentItem;
  armor?: EquipmentItem;
  weapon?: EquipmentItem;
  shield?: EquipmentItem;
  garment?: EquipmentItem;
  shoes?: EquipmentItem;
  accessory1?: EquipmentItem;
  accessory2?: EquipmentItem;
}

export interface DivineArmament {
  set: string;
  seasonalStats?: Record<string, Partial<Stats>>;
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
  lastUpdated: string;
  stats: Stats;
  equipment: Equipment;
  skills: string[];
  feather?: { name: string; level: number };
  pet?: { name: string; level: number };
  medals: string[];
  divineArmament: DivineArmament;
  cards: string[];
  enchants: string[];
  guildSkills: string[];
  consumableBuffs: string[];
  images: string[];
  tags: string[];
}

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isLatest: boolean;
}
