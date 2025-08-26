import type { Lecturer, Subject } from "content-collections";

export type LecturerWithRelations = Lecturer & {
  subjects: {
    subject: Subject;
    isTheory: boolean;
    isPractice: boolean;
  }[];
};
