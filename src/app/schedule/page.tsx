import { listSchedules } from "@/lib/collection";
import ScheduleList from "./_components/schedule-list";

export default function Schedule() {
  const schedules = listSchedules();
  return <ScheduleList schedules={schedules} />;
}
