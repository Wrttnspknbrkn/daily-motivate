import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  color?: string;
}

export function CircularProgress({
  value,
  size = "md",
  showValue = true,
  color,
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);

  const radius = size === "sm" ? 35 : size === "md" ? 40 : 45;
  const strokeWidth = size === "sm" ? 6 : size === "md" ? 8 : 10;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - animatedValue) / 100) * circumference;

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  };

  return (
    <div className={cn("relative", sizeClasses[size])}>
      <motion.svg
        className="w-full h-full transform -rotate-90"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <circle
          className="text-muted/20 stroke-current"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
        <motion.circle
          className={cn(
            "stroke-current transition-all duration-300 ease-in-out",
            color ? color : "text-primary"
          )}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
      </motion.svg>
      {showValue && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-sm font-semibold">
            {Math.round(animatedValue)}%
          </span>
        </motion.div>
      )}
    </div>
  );
}