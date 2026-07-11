import Dashboard from "@/components/Dashboard";
import {
  fetchEnergyVsGoal,
  fetchWorkoutVolume,
  fetchTopRecordTypes,
} from "@/lib/api";

function defaultRange(): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 90);
  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ start?: string; end?: string }>;
}) {
  const params = await searchParams;
  const fallback = defaultRange();
  const startDate = params.start ?? fallback.startDate;
  const endDate = params.end ?? fallback.endDate;

  const [energy, workouts, topRecordTypes] = await Promise.all([
    fetchEnergyVsGoal(params.start, params.end),
    fetchWorkoutVolume(params.start, params.end),
    fetchTopRecordTypes(params.start, params.end),
  ]);

  return (
    <Dashboard
      startDate={startDate}
      endDate={endDate}
      energy={energy}
      workouts={workouts}
      topRecordTypes={topRecordTypes}
    />
  );
}
