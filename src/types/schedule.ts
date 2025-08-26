import type { Lecturer, Schedule, Subject } from "content-collections";

export type ScheduleWithRelation = Omit<Schedule, "items"> & {
  parsedDay: number;
  items: (Schedule["items"][number] & {
    subject: Subject;
    lecturer: Lecturer;
  })[];
};
