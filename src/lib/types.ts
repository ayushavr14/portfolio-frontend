import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type LoginT = {
  email: string;
  password: string;
};

export type ProjectT = {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  sourceCodeLink?: string;
  image: string[];
  tag?: string;
  status?: string;
};

export type FileTypeT = {
  url?: string;
  originFileObj?: File;
};

export type NormFileEventT = {
  fileList: any[];
};

export type SkillsT = {
  _id: string;
  name: string[];
};

export type ExperienceT = {
  _id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type UserT = {
  _id?: string;
  user?: string;
  about?: string;
  cvLink?: string[];
  githubLink?: string;
  linkedinLink?: string;
};
