import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type LoginT = {
  email: string;
  password: string;
};

export type ProjectT = {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  sourceCodeLink: string;
  image: string[];
  tag: string;
  status: string;
};

export type FileTypeT = {
  url?: string;
  originFileObj?: File;
};

export type NormFileEventT = {
  fileList: any[];
};

export type SkillsT = {
  name: string;
};

export type ExperienceT = {
  _id: string;
  title: string;
  company: string;
  description: string;
  startDate: Date | number;
  endDate: Date;
};
