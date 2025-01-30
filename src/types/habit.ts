export type Frequency = "daily" | "weekly" | "monthly";

export interface Habit {
  id: string;
  name: string;
  frequency: Frequency;
  streak: number;
  completedDates: string[];
  createdAt: string;
  reminderTime?: string;
}

export interface HabitProgress {
  completed: number;
  total: number;
  percentage: number;
}