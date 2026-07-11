"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="chart-state error">
      <p>Failed to load dashboard: {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
