/**
 * Formats a Date object into a specified format.
 * @param date The Date object to format.
 * @param format The format string (e.g., 'YYYY-MM-DD', 'MMM DD, YYYY', etc.).
 * @returns The formatted date string.
 */
export function formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minute = `${date.getMinutes()}`.padStart(2, '0');
    const second = `${date.getSeconds()}`.padStart(2, '0');

    return format
        .replace('YYYY', year.toString())
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second);
}

/**
 * Parses a date string into a Date object.
 * @param dateString The date string to parse.
 * @returns The parsed Date object.
 */
export function parseDate(dateString: string): Date {
    const parts = dateString.split('-').map(part => parseInt(part, 10));
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

/**
 * Adds a specified number of days to a Date object.
 * @param date The Date object.
 * @param days The number of days to add.
 * @returns The new Date object with days added.
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Checks if a Date object represents today's date.
 * @param date The Date object to check.
 * @returns True if the date is today, otherwise false.
 */
export function isToday(date: Date): boolean {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

/**
 * Gets the day of the year for a given Date object.
 * @param date The Date object.
 * @returns The day of the year (1-365/366).
 */
export function getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

/**
 * Gets the ISO week number for a given Date object.
 * @param date The Date object.
 * @returns The ISO week number (1-53).
 */
export function getWeekNumber(date: Date): number {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const daysInYear = getDayOfYear(date);
    return Math.ceil((daysInYear + oneJan.getDay() + 1) / 7);
}

/**
 * Gets the number of days in a given month and year.
 * @param month The month (1-12).
 * @param year The year.
 * @returns The number of days in the specified month and year.
 */
export function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

/**
 * Converts a date into a human-readable format like '2 hours ago', 'Yesterday', or '1 day ago'.
 * @param date The Date object to convert.
 * @returns The human-readable time ago string.
 */
export function timeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " years ago";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " months ago";
    interval = Math.floor(seconds / 86400);
    if (interval === 1) return "Yesterday";
    if (interval > 1) return interval + " days ago";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hours ago";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}