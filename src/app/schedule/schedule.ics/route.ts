import dayjs, { type Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ical, {
  ICalCalendarMethod,
  ICalEventRepeatingFreq,
} from "ical-generator";
import { STATIC_CONFIG } from "@/config";
import { listSchedules } from "@/lib/collection";

dayjs.extend(utc);
dayjs.extend(timezone);

export const dynamic = "force-static";
export async function GET() {
  const schedules = listSchedules();

  const calendar = ical({
    name: "Terpal B24 Schedule",
    timezone: "Asia/Jakarta",
    method: ICalCalendarMethod.REQUEST,
  });

  schedules.forEach((day) => {
    const startDay = dayjs
      .tz(STATIC_CONFIG.START_SEMESTER, "Asia/Jakarta")
      .set("day", day.parsedDay);

    day.items.forEach((course) => {
      const [startHour, startMinute] = course.startAt.split(":").map(Number);
      const [endHour, endMinute] = course.endAt.split(":").map(Number);

      const currentStart = startDay
        .set("hour", startHour)
        .set("minute", startMinute);

      const currentEnd = startDay.set("hour", endHour).set("minute", endMinute);

      const event = calendar.createEvent({
        start: currentStart.utc(),
        end: currentEnd.utc(),
        summary: `${course.subject.code} - ${course.subject.title} (${course.type === "practice" ? "Praktikum" : "Teori"})`,
        description: `Dosen: ${course.lecturer.name}`,
        location: course.room,
      });

      const excludeDates: Dayjs[] = [];
      STATIC_CONFIG.BLOCKING_TIME.forEach((block) => {
        const blockStart = dayjs.tz(block.start, "Asia/Jakarta");
        const blockEnd = dayjs.tz(block.end, "Asia/Jakarta");
        let date = blockStart;
        while (date <= blockEnd) {
          if (date.day() === currentStart.day()) {
            excludeDates.push(
              date.set("hour", startHour).set("minute", startMinute).utc(),
            );
          }
          date = date.add(1, "day");
        }
      });

      const repeatEnd = dayjs
        .tz(STATIC_CONFIG.END_SEMESTER, "Asia/Jakarta")
        .subtract(6, "day")
        .set("day", day.parsedDay)
        .set("hour", endHour)
        .set("minute", endMinute);

      event.repeating({
        freq: ICalEventRepeatingFreq.WEEKLY,
        until: repeatEnd.utc(),
        interval: 1,
        exclude: excludeDates,
      });
    });
  });

  return new Response(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
}
