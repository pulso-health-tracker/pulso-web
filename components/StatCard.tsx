export type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
};

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  );
}
