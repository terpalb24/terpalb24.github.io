import dayjs, { type Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { STATIC_CONFIG } from "@/config";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getRamadhanPeriod = (): { start: Dayjs; end: Dayjs } | null => {
  if (!STATIC_CONFIG.RAMADHAN_START || !STATIC_CONFIG.RAMADHAN_END) return null;
  return {
    start: dayjs.tz(STATIC_CONFIG.RAMADHAN_START, "Asia/Jakarta"),
    end: dayjs.tz(STATIC_CONFIG.RAMADHAN_END, "Asia/Jakarta"),
  };
};

export const getAdjustedTime = (
  time: string,
  parsedDay: number,
  isRamadhan: boolean,
): string => {
  if (!isRamadhan) return time;

  const mapping =
    parsedDay === 5
      ? STATIC_CONFIG.RAMADHAN_TIME_MAPPING.FRIDAY
      : STATIC_CONFIG.RAMADHAN_TIME_MAPPING.MONDAY_TO_THURSDAY;

  return mapping[time as keyof typeof mapping] ?? time;
};

export const getAdjustedTimeRange = (
  startAt: string,
  endAt: string,
  parsedDay: number,
  isRamadhan: boolean,
): { startAt: string; endAt: string } => {
  return {
    startAt: getAdjustedTime(startAt, parsedDay, isRamadhan),
    endAt: getAdjustedTime(endAt, parsedDay, isRamadhan),
  };
};
