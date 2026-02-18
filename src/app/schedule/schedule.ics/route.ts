import dayjs, { type Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ical, {
  ICalCalendarMethod,
  ICalEventRepeatingFreq,
} from "ical-generator";
import { STATIC_CONFIG } from "@/config";
import { listSchedules } from "@/lib/collection";
import { getAdjustedTimeRange } from "@/lib/schedule";

dayjs.extend(utc);
dayjs.extend(timezone);

export const dynamic = "force-static";

const TIMEZONE = "Asia/Jakarta";

const getFirstWeekdayOnOrAfter = (date: Dayjs, weekday: number): Dayjs => {
  const start = date.startOf("day");
  const diff = (weekday - start.day() + 7) % 7;
  return start.add(diff, "day");
};

const getLastWeekdayOnOrBefore = (date: Dayjs, weekday: number): Dayjs => {
  const end = date.startOf("day");
  const diff = (end.day() - weekday + 7) % 7;
  return end.subtract(diff, "day");
};

const isOnOrAfter = (left: Dayjs, right: Dayjs) =>
  left.isAfter(right) || left.isSame(right);

const isOnOrBefore = (left: Dayjs, right: Dayjs) =>
  left.isBefore(right) || left.isSame(right);

const createExclusionDates = (
  weekday: number,
  startHour: number,
  startMinute: number,
  periodStart: Dayjs,
  periodEnd: Dayjs,
): Dayjs[] => {
  const excludeDates: Dayjs[] = [];

  STATIC_CONFIG.BLOCKING_TIME.forEach((block) => {
    const blockStart = dayjs.tz(block.start, TIMEZONE);
    const blockEnd = dayjs.tz(block.end, TIMEZONE);

    const rangeStart = isOnOrAfter(blockStart, periodStart)
      ? blockStart
      : periodStart;
    const rangeEnd = isOnOrBefore(blockEnd, periodEnd) ? blockEnd : periodEnd;
    if (rangeStart.isAfter(rangeEnd)) return;

    let date = rangeStart.startOf("day");
    const limit = rangeEnd.startOf("day");
    while (isOnOrBefore(date, limit)) {
      if (date.day() === weekday) {
        excludeDates.push(
          date.set("hour", startHour).set("minute", startMinute).utc(),
        );
      }

      date = date.add(1, "day");
    }
  });

  return excludeDates;
};

export async function GET() {
  const schedules = listSchedules();
  const semesterStart = dayjs.tz(STATIC_CONFIG.START_SEMESTER, TIMEZONE);
  const semesterEnd = dayjs.tz(STATIC_CONFIG.END_SEMESTER, TIMEZONE);
  const ramadhanStart = dayjs.tz(STATIC_CONFIG.RAMADHAN_START, TIMEZONE);
  const ramadhanEnd = dayjs.tz(STATIC_CONFIG.RAMADHAN_END, TIMEZONE);

  const calendar = ical({
    name: "Terpal B24 Schedule",
    timezone: TIMEZONE,
    method: ICalCalendarMethod.REQUEST,
  });

  schedules.forEach((day) => {
    const periods: { start: Dayjs; end: Dayjs; isRamadhan: boolean }[] = [];

    const beforeRamadhanEnd = ramadhanStart.subtract(1, "second");
    if (isOnOrBefore(semesterStart, beforeRamadhanEnd)) {
      periods.push({
        start: semesterStart,
        end: beforeRamadhanEnd,
        isRamadhan: false,
      });
    }

    const ramadhanPeriodStart = isOnOrAfter(semesterStart, ramadhanStart)
      ? semesterStart
      : ramadhanStart;
    const ramadhanPeriodEnd = isOnOrBefore(semesterEnd, ramadhanEnd)
      ? semesterEnd
      : ramadhanEnd;
    if (isOnOrBefore(ramadhanPeriodStart, ramadhanPeriodEnd)) {
      periods.push({
        start: ramadhanPeriodStart,
        end: ramadhanPeriodEnd,
        isRamadhan: true,
      });
    }

    const afterRamadhanStart = ramadhanEnd.add(1, "second");
    if (isOnOrAfter(semesterEnd, afterRamadhanStart)) {
      periods.push({
        start: afterRamadhanStart,
        end: semesterEnd,
        isRamadhan: false,
      });
    }

    day.items.forEach((course) => {
      periods.forEach((period) => {
        const adjusted = getAdjustedTimeRange(
          course.startAt,
          course.endAt,
          day.parsedDay,
          period.isRamadhan,
        );

        const [startHour, startMinute] = adjusted.startAt
          .split(":")
          .map(Number);
        const [endHour, endMinute] = adjusted.endAt.split(":").map(Number);

        const firstDay = getFirstWeekdayOnOrAfter(period.start, day.parsedDay);
        const lastDay = getLastWeekdayOnOrBefore(period.end, day.parsedDay);
        if (firstDay.isAfter(lastDay)) return;

        const currentStart = firstDay
          .set("hour", startHour)
          .set("minute", startMinute)
          .set("second", 0);
        const currentEnd = firstDay
          .set("hour", endHour)
          .set("minute", endMinute)
          .set("second", 0);

        const event = calendar.createEvent({
          start: currentStart.utc(),
          end: currentEnd.utc(),
          summary: `${course.subject.code} - ${course.subject.title} (${course.type === "practice" ? "Praktikum" : "Teori"})`,
          description: `Dosen: ${course.lecturer.name}`,
          location: course.room,
          url: course.link,
        });

        const excludeDates = createExclusionDates(
          day.parsedDay,
          startHour,
          startMinute,
          firstDay,
          lastDay,
        );

        const repeatEnd = lastDay
          .set("hour", endHour)
          .set("minute", endMinute)
          .set("second", 0);

        event.repeating({
          freq: ICalEventRepeatingFreq.WEEKLY,
          until: repeatEnd.utc(),
          interval: 1,
          exclude: excludeDates,
        });
      });
    });
  });

  return new Response(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
}
