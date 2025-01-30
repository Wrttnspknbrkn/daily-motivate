import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function CircularProgress({
  value,
  size = "md",
  showValue = true,
}: CircularProgressProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - value) / 100) * circumference;

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  };

  return (
    <div className={cn("relative", sizeClasses[size])}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-muted stroke-current"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
        <circle
          className="text-primary stroke-current transition-all duration-300 ease-in-out"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{Math.round(value)}%</span>
        </div>
      )}
    </div>
  );
}