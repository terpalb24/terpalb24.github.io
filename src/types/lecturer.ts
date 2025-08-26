import type { Lecturer, Project, Subject } from "content-collections";

export type LecturerWithRelations = Lecturer & {
  subjects: {
    subject: Subject;
    isTheory: boolean;
    isPractice: boolean;
  }[];
  projects: Project[];
};
