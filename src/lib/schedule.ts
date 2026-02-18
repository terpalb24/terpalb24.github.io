import { STATIC_CONFIG } from "@/config";

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
