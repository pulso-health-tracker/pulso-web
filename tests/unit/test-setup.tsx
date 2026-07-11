import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Line: (props: Record<string, unknown>) => (
    <canvas data-testid="chart" data-props={JSON.stringify(props)} />
  ),
}));
