"use client";

import { Line } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import type { MetricsResponse } from "@/lib/api";
import "@/lib/chartSetup";

const PALETTE = ["#36a2eb", "#ff6384", "#ff9f40", "#4bc0c0", "#9966ff"];

export default function TopRecordTypesChart({ data }: { data: MetricsResponse }) {
  const empty = data.datasets.length === 0;

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((ds, i) => ({
      label: ds.label.replace("HKQuantityTypeIdentifier", ""),
      data: ds.data,
      borderColor: PALETTE[i % PALETTE.length],
      backgroundColor: "transparent",
      tension: 0.3,
      pointRadius: 3,
    })),
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
        title: { display: true, text: "count" },
      },
    },
  };

  return (
    <ChartCard title="Top Record Types Over Time" meta="Weekly, top 5" empty={empty}>
      <div style={{ height: 280 }}>
        <Line data={chartData} options={options} />
      </div>
    </ChartCard>
  );
}
