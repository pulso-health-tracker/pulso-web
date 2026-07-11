"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type DateRangeSelectorProps = {
  startDate: string;
  endDate: string;
};

export default function DateRangeSelector({
  startDate,
  endDate,
}: DateRangeSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigate(nextStart: string, nextEnd: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("start", nextStart);
    params.set("end", nextEnd);
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="date-range">
      <label>From</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => navigate(e.target.value, endDate)}
      />
      <span className="date-range-separator">&mdash;</span>
      <label>To</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => navigate(startDate, e.target.value)}
      />
    </div>
  );
}
