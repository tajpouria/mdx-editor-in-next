// @ts-nocheck
import { Card, CardContent } from "@/app/ui";
import { CheckCircle2, XCircle } from "lucide-react";

export const Gauge = ({ value, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressValue = Math.min(Math.max(value, 0), 10);
  const progress = (progressValue / 10) * circumference;

  const getColor = (value: number) => {
    if (value >= 9) return "#22c55e";
    if (value >= 7) return "#3b82f6";
    if (value >= 5) return "#eab308";
    if (value >= 3) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{value.toFixed(1)}</span>
        <span className="text-xs text-gray-500">/ 10</span>
      </div>
    </div>
  );
};

export const ScoreSummaryCard = ({ title, score, metrics = [] }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          <Gauge value={score} />
          <div className="flex-1">
            <h3 className="font-medium mb-2">{title}</h3>
            <div className="space-y-2">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-2">
                  {metric.score >= 7 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-600">{metric.name}</span>
                  <span className="text-sm font-medium ml-auto">
                    {metric.score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
