import { listSchedules } from "@/lib/collection";
import { STATIC_CONFIG } from "@/config";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { getAdjustedTimeRange } from "@/lib/schedule";
import ScheduleList from "./_components/schedule-list";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Schedule() {
  const schedules = listSchedules();

  const now = dayjs.tz(new Date(), "Asia/Jakarta");
  const isRamadhan =
    (now.isAfter(dayjs.tz(STATIC_CONFIG.RAMADHAN_START, "Asia/Jakarta")) ||
      now.isSame(dayjs.tz(STATIC_CONFIG.RAMADHAN_START, "Asia/Jakarta"))) &&
    (now.isBefore(dayjs.tz(STATIC_CONFIG.RAMADHAN_END, "Asia/Jakarta")) ||
      now.isSame(dayjs.tz(STATIC_CONFIG.RAMADHAN_END, "Asia/Jakarta")));

  const adjustedSchedules = schedules.map((day) => ({
    ...day,
    items: day.items.map((item) => {
      const time = getAdjustedTimeRange(
        item.startAt,
        item.endAt,
        day.parsedDay,
        isRamadhan,
      );

      return {
        ...item,
        startAt: time.startAt,
        endAt: time.endAt,
      };
    }),
  }));

  return <ScheduleList schedules={adjustedSchedules} />;
}
