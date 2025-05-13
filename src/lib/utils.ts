export const getSemester = (code: string): number => {
    return parseInt(code.match(/\d+/)!.shift()![0]);
}
export const calcSpeed = (idx: number, max: number = 4): number => {
    return 1 + ((idx % max) / 10);
}