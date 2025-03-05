export const renderDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}