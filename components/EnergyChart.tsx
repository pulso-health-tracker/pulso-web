"use client";

import { Line } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import type { MetricsResponse } from "@/lib/api";
import "@/lib/chartSetup";

export default function EnergyChart({ data }: { data: MetricsResponse }) {
  const empty = data.datasets.every((ds) => ds.data.length === 0);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.datasets[0]?.label || "Active Energy Burned",
        data: data.datasets[0]?.data || [],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.08)",
        fill: true,
        tension: 0.3,
        pointRadius: 1,
      },
      {
        label: data.datasets[1]?.label || "Goal",
        data: data.datasets[1]?.data || [],
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75, 192, 192, 0.08)",
        borderDash: [5, 5],
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: data.meta.unit || "kcal" },
      },
    },
  };

  const meta = data.meta.unit ? `Unit: ${data.meta.unit}` : undefined;

  return (
    <ChartCard title="Daily Active Energy vs Goal" meta={meta} empty={empty}>
      <div style={{ height: 300 }}>
        <Line data={chartData} options={options} />
      </div>
    </ChartCard>
  );
}
