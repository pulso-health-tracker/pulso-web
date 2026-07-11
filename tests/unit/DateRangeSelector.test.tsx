import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(),
}));

import DateRangeSelector from "@/components/DateRangeSelector";

describe("DateRangeSelector", () => {
  it("renders with provided dates", () => {
    render(<DateRangeSelector startDate="2026-01-01" endDate="2026-03-31" />);
    expect(screen.getByDisplayValue("2026-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2026-03-31")).toBeInTheDocument();
  });

  it("navigates with updated startDate", () => {
    render(<DateRangeSelector startDate="2026-01-01" endDate="2026-03-31" />);
    fireEvent.change(screen.getByDisplayValue("2026-01-01"), {
      target: { value: "2026-02-01" },
    });
    expect(push).toHaveBeenCalledWith("/?start=2026-02-01&end=2026-03-31");
  });

  it("navigates with updated endDate", () => {
    render(<DateRangeSelector startDate="2026-01-01" endDate="2026-03-31" />);
    fireEvent.change(screen.getByDisplayValue("2026-03-31"), {
      target: { value: "2026-04-30" },
    });
    expect(push).toHaveBeenCalledWith("/?start=2026-01-01&end=2026-04-30");
  });
});
