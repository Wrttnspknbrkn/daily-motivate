import { Card } from "@/components/ui/card";
import { useHabits } from "@/contexts/HabitContext";
import { BarChart, Calendar, Trophy } from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Progress() {
  const { habits } = useHabits();

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const completionData = last7Days.map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    completed: habits.reduce((acc, habit) => 
      acc + (habit.completedDates.includes(date) ? 1 : 0), 0
    ),
  }));

  const totalCompletions = habits.reduce(
    (acc, habit) => acc + habit.completedDates.length,
    0
  );

  const longestStreak = Math.max(
    ...habits.map(habit => habit.streak)
  );

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Progress</h1>
        <p className="text-muted-foreground">Track your habit-building journey</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Total Completions</h2>
              <p className="text-3xl font-bold text-primary">{totalCompletions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-full">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Active Habits</h2>
              <p className="text-3xl font-bold text-secondary">{habits.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Longest Streak</h2>
              <p className="text-3xl font-bold text-primary">{longestStreak} days</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Last 7 Days Activity</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={completionData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="completed"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}