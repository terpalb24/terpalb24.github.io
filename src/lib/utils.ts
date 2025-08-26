export const getSemester = (code: string): number => {
  // biome-ignore lint/style/noNonNullAssertion: throw error when doens't match
  return parseInt(code.match(/\d+/)!.shift()![0], 10);
};
export const parseDayFromFile = (name: string): number => {
  const number = name.substring(0, 2);
  return parseInt(number, 10);
};
export const getCurrentDay = (dayList: number[], defaultValue: number) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  return dayList.includes(dayOfWeek) ? dayOfWeek : defaultValue;
};
