import { describe, it, expect } from "vitest";
import dayjs from "dayjs";
import {
  formatDate,
  formatDateISO,
  formatDateDot,
  formatDateTime,
  timeAgo,
  diffDays,
  isToday,
  isPast,
} from "../date";

describe("date utilities", () => {
  const testDate = "2025-02-06T14:30:00";

  describe("formatDate", () => {
    it("한국어 포맷으로 변환한다", () => {
      expect(formatDate(testDate)).toBe("2025년 2월 6일");
    });

    it("Date 객체를 받을 수 있다", () => {
      expect(formatDate(new Date(testDate))).toBe("2025년 2월 6일");
    });

    it("dayjs 객체를 받을 수 있다", () => {
      expect(formatDate(dayjs(testDate))).toBe("2025년 2월 6일");
    });
  });

  describe("formatDateISO", () => {
    it("ISO 포맷으로 변환한다", () => {
      expect(formatDateISO(testDate)).toBe("2025-02-06");
    });
  });

  describe("formatDateDot", () => {
    it("점 구분 포맷으로 변환한다", () => {
      expect(formatDateDot(testDate)).toBe("2025.02.06");
    });
  });

  describe("formatDateTime", () => {
    it("날짜+시간 포맷으로 변환한다", () => {
      expect(formatDateTime(testDate)).toBe("2025-02-06 14:30");
    });
  });

  describe("timeAgo", () => {
    it("상대 시간을 반환한다", () => {
      const threeDaysAgo = dayjs().subtract(3, "day");
      expect(timeAgo(threeDaysAgo)).toBe("3일 전");
    });
  });

  describe("diffDays", () => {
    it("양수 차이를 계산한다", () => {
      expect(diffDays("2025-02-01", "2025-02-06")).toBe(5);
    });

    it("음수 차이를 계산한다", () => {
      expect(diffDays("2025-02-06", "2025-02-01")).toBe(-5);
    });

    it("같은 날짜는 0을 반환한다", () => {
      expect(diffDays("2025-02-06", "2025-02-06")).toBe(0);
    });
  });

  describe("isToday", () => {
    it("오늘이면 true", () => {
      expect(isToday(dayjs())).toBe(true);
    });

    it("어제는 false", () => {
      expect(isToday(dayjs().subtract(1, "day"))).toBe(false);
    });
  });

  describe("isPast", () => {
    it("과거 날짜는 true", () => {
      expect(isPast(dayjs().subtract(1, "day"))).toBe(true);
    });

    it("미래 날짜는 false", () => {
      expect(isPast(dayjs().add(1, "day"))).toBe(false);
    });
  });
});
