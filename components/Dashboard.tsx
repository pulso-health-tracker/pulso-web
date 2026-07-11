import DateRangeSelector from "./DateRangeSelector";
import StatCard from "./StatCard";
import EnergyChart from "./EnergyChart";
import WorkoutVolumeChart from "./WorkoutVolumeChart";
import TopRecordTypesChart from "./TopRecordTypesChart";
import type { MetricsResponse } from "@/lib/api";

export type DashboardProps = {
  startDate: string;
  endDate: string;
  energy: MetricsResponse;
  workouts: MetricsResponse;
  topRecordTypes: MetricsResponse;
};

function latestEnergyStat(energy: MetricsResponse): string {
  const vals = (energy.datasets[0]?.data ?? []).filter(
    (v): v is number => v != null
  );
  const latest = vals.length > 0 ? vals[vals.length - 1] : null;
  return latest != null ? `${Math.round(latest)} kcal` : "--";
}

function latestWorkoutsStat(workouts: MetricsResponse): string {
  const counts = workouts.datasets[0]?.data ?? [];
  const latest = counts.length > 0 ? counts[counts.length - 1] : null;
  return latest != null ? String(latest) : "--";
}

function topRecordTypeStat(topRecordTypes: MetricsResponse): string {
  const label = topRecordTypes.datasets[0]?.label;
  return label ? label.replace("HKQuantityTypeIdentifier", "") : "--";
}

export default function Dashboard({
  startDate,
  endDate,
  energy,
  workouts,
  topRecordTypes,
}: DashboardProps) {
  return (
    <>
      <div className="main-header">
        <h1 className="main-title">Dashboard</h1>
        <DateRangeSelector startDate={startDate} endDate={endDate} />
      </div>

      <div className="stat-cards">
        <StatCard
          label="Latest Active Energy"
          value={latestEnergyStat(energy)}
          sub="Most recent day"
        />
        <StatCard
          label="Workouts This Week"
          value={latestWorkoutsStat(workouts)}
          sub="Latest week"
        />
        <StatCard
          label="Top Record Type"
          value={topRecordTypeStat(topRecordTypes)}
          sub="By volume"
        />
      </div>

      <div className="charts-grid">
        <EnergyChart data={energy} />
        <WorkoutVolumeChart data={workouts} />
        <TopRecordTypesChart data={topRecordTypes} />
      </div>
    </>
  );
}
