import {
  type Album,
  allAlbums,
  allLecturers,
  allMembers,
  allProjects,
  allSchedules,
  allSubjects,
  type Lecturer,
  type Member,
} from "content-collections";
import type { LecturerWithRelations } from "@/types/lecturer";
import type { ProjectWithRelation } from "@/types/project";
import type { ScheduleWithRelation } from "@/types/schedule";
import { parseDayFromFile } from "./utils";

export const getSingleAlbum = (slug: string): Album => {
  const album = allAlbums.find((album) => album._meta.directory === slug);
  // biome-ignore lint/style/noNonNullAssertion: Need to throw error
  return album!;
};

export const getSingleLecturer = (slug: string): Lecturer => {
  const lecturer = allLecturers.find(
    (lecturer) => lecturer._meta.directory === slug,
  );
  // biome-ignore lint/style/noNonNullAssertion: Need to throw error
  return lecturer!;
};

export const getSingleMember = (slug: string): Member => {
  const member = allMembers.find((member) => member._meta.directory === slug);
  // biome-ignore lint/style/noNonNullAssertion: Need to throw error
  return member!;
};

export const listProjects = (): ProjectWithRelation[] => {
  const projects = allProjects;
  projects.sort((a, b) => a._meta.directory.localeCompare(b._meta.directory));
  projects.reverse();
  return projects.map((item) => ({
    ...item,
    manpro: getSingleLecturer(item.manpro),
    teams: item.teams.map(getSingleMember),
  }));
};

export const listSchedules = (): ScheduleWithRelation[] => {
  const schedules = allSchedules;
  schedules.sort((a, b) => {
    return a._meta.fileName.localeCompare(b._meta.fileName);
  });

  return schedules.map((item) => {
    return {
      ...item,
      parsedDay: parseDayFromFile(item._meta.fileName),
      items: item.items.map((child) => {
        const subject = allSubjects.find(
          (subject) => subject._meta.path === child.subjectCode,
        );
        if (!subject)
          throw new Error(`Subject not found: ${child.subjectCode}`);

        let lecturer: Lecturer | undefined;
        if (child.type === "practice" && subject.practice) {
          lecturer = allLecturers.find(
            (lecturer) => lecturer._meta.directory === subject.practice,
          );
        } else {
          lecturer = allLecturers.find(
            (lecturer) => lecturer._meta.directory === subject.theory,
          );
        }
        if (!lecturer)
          throw new Error(`Lecturer not found: ${child.subjectCode}`);
        return {
          ...child,
          subject,
          lecturer,
        };
      }),
    };
  });
};

export const listLecturers = (): LecturerWithRelations[] => {
  const lecturers = allLecturers;

  lecturers.sort((a, b) =>
    a.isGuardianLecturer === b.isGuardianLecturer
      ? 0
      : a.isGuardianLecturer
        ? -1
        : 1,
  );
  return lecturers.map((lecturer) => {
    const currentSubjects = allSubjects.filter(
      (item) =>
        item.theory === lecturer._meta.path ||
        item.practice === lecturer._meta.path,
    );

    return {
      ...lecturer,
      subjects: currentSubjects.map((subject) => ({
        subject,
        isTheory: subject.theory === lecturer._meta.path,
        isPractice: subject.practice === lecturer._meta.path,
      })),
    };
  });
};
