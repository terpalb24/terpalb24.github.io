import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { listSchedules } from "@/lib/collection";
import { getAdjustedTimeRange, getRamadhanPeriod } from "@/lib/schedule";
import ScheduleList from "./_components/schedule-list";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Schedule() {
  const schedules = listSchedules();

  const now = dayjs.tz(new Date(), "Asia/Jakarta");
  const ramadhan = getRamadhanPeriod();
  const isRamadhan =
    !!ramadhan &&
    (now.isAfter(ramadhan.start) || now.isSame(ramadhan.start)) &&
    (now.isBefore(ramadhan.end) || now.isSame(ramadhan.end));

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
