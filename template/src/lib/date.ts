import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale("ko");

export { dayjs };

/** "2025년 2월 6일" */
export function formatDate(date: string | Date | dayjs.Dayjs) {
  return dayjs(date).format("YYYY년 M월 D일");
}

/** "2025-02-06" */
export function formatDateISO(date: string | Date | dayjs.Dayjs) {
  return dayjs(date).format("YYYY-MM-DD");
}

/** "2025.02.06" */
export function formatDateDot(date: string | Date | dayjs.Dayjs) {
  return dayjs(date).format("YYYY.MM.DD");
}

/** "2025-02-06 14:30" */
export function formatDateTime(date: string | Date | dayjs.Dayjs) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
}

/** "3일 전", "방금 전" */
export function timeAgo(date: string | Date | dayjs.Dayjs) {
  return dayjs(date).fromNow();
}

/** 두 날짜 사이 일수 차이 */
export function diffDays(from: string | Date | dayjs.Dayjs, to: string | Date | dayjs.Dayjs) {
  return dayjs(to).diff(dayjs(from), "day");
}

/** 오늘인지 확인 */
export function isToday(date: string | Date | dayjs.Dayjs) {
  return dayjs(date).isSame(dayjs(), "day");
}

/** 과거인지 확인 */
export function isPast(date: string | Date | dayjs.Dayjs) {
  return dayjs(date).isBefore(dayjs());
}
