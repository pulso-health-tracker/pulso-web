export type Dataset = {
  label: string;
  data: (number | null)[];
};

export type MetricsResponse = {
  labels: string[];
  datasets: Dataset[];
  meta: {
    unit: string;
    window: string;
    last_updated: string | null;
  };
};

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

async function fetchMetrics(
  path: string,
  start?: string,
  end?: string
): Promise<MetricsResponse> {
  const params = new URLSearchParams();
  if (start) params.set("start", start);
  if (end) params.set("end", end);
  const query = params.toString();
  const url = `${API_BASE_URL}${path}${query ? `?${query}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${path}`);
  }
  return res.json();
}

export function fetchEnergyVsGoal(start?: string, end?: string) {
  return fetchMetrics("/api/metrics/energy-vs-goal", start, end);
}

export function fetchWorkoutVolume(start?: string, end?: string) {
  return fetchMetrics("/api/metrics/workout-volume", start, end);
}

export function fetchTopRecordTypes(start?: string, end?: string) {
  return fetchMetrics("/api/metrics/top-record-types", start, end);
}
