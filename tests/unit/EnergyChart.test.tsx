import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EnergyChart from "@/components/EnergyChart";
import type { MetricsResponse } from "@/lib/api";

const mockData: MetricsResponse = {
  labels: ["2026-01-01", "2026-01-02"],
  datasets: [
    { label: "Active Energy Burned", data: [300, 400] },
    { label: "Goal", data: [500, 500] },
  ],
  meta: { unit: "kcal", window: "90d", last_updated: "2026-01-02" },
};

describe("EnergyChart", () => {
  it("renders chart with correct data transformation", () => {
    render(<EnergyChart data={mockData} />);
    const chart = screen.getByTestId("chart");
    const props = JSON.parse(chart.getAttribute("data-props")!);
    expect(props.data.labels).toEqual(["2026-01-01", "2026-01-02"]);
    expect(props.data.datasets[0].borderColor).toBe("#ff6384");
    expect(props.data.datasets[0].fill).toBe(true);
    expect(props.data.datasets[1].borderColor).toBe("#4bc0c0");
    expect(props.data.datasets[1].borderDash).toEqual([5, 5]);
  });

  it("shows empty state when all datasets are empty", () => {
    const empty: MetricsResponse = {
      labels: [],
      datasets: [
        { label: "Active Energy Burned", data: [] },
        { label: "Goal", data: [] },
      ],
      meta: { unit: "kcal", window: "90d", last_updated: null },
    };
    render(<EnergyChart data={empty} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("displays the unit in chart meta", () => {
    render(<EnergyChart data={mockData} />);
    expect(screen.getByText("Unit: kcal")).toBeInTheDocument();
  });
});
