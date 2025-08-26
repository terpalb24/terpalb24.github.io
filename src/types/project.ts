import type { Lecturer, Member, Project } from "content-collections";

export type ProjectWithRelation = Omit<Project, "manpro" | "teams"> & {
  manpro: Lecturer;
  teams: Member[];
};
