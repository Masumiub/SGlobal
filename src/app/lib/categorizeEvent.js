import { toZonedTime } from "date-fns-tz";

export function categorizeEvent(event, userTimeZone) {
  const now = new Date();
  const userNow = toZonedTime(now, userTimeZone);

  const eventStart = toZonedTime(new Date(event.startTime), userTimeZone);
  const eventEnd = toZonedTime(new Date(event.endTime), userTimeZone);

  if (userNow < eventStart) return "upcoming";
  if (userNow >= eventStart && userNow <= eventEnd) return "ongoing";
  return "past";
}
