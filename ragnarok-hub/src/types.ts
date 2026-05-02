// types.ts
export type Class = { id: string; name: string };

export type Subclass = {
  id: string;
  classId: string;
  name: string;
};

export type Category = {
  id: "pvp" | "pve";
  name: string;
};

export type Mode = {
  id: string;
  categoryId: string;
  name: string;
};

export type Build = {
  id: string;
  subclassId: string;
  categoryId: string;
  modeId: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
};