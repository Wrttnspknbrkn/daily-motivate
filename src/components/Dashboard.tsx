import { Card } from "@/components/ui/card";
import { useHabits } from "@/contexts/HabitContext";
import { Plus, Trophy, Calendar, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HabitForm } from "./HabitForm";
import { HabitList } from "./HabitList";
import { CircularProgress } from "./CircularProgress";

const MOTIVATIONAL_QUOTES = [
  "Small steps lead to big changes.",
  "Consistency is the key to success.",
  "Every day is a fresh start.",
  "Progress over perfection.",
];

export function Dashboard() {
  const { habits } = useHabits();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  const totalCompletions = habits.reduce(
    (acc, habit) => acc + habit.completedDates.length,
    0
  );

  const averageCompletion =
    habits.length > 0
      ? Math.round(
          (habits.reduce(
            (acc, habit) => acc + habit.completedDates.length,
            0
          ) /
            (habits.length * 30)) *
            100
        )
      : 0;

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Habitify</h1>
          <p className="text-muted-foreground">{randomQuote}</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="gap-2 hover:scale-105 transition-transform"
        >
          <Plus size={20} />
          Add Habit
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Active Habits</h2>
              <p className="text-3xl font-bold text-primary">{habits.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-full">
              <Flame className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Total Streaks</h2>
              <p className="text-3xl font-bold text-secondary">
                {habits.reduce((acc, habit) => acc + habit.streak, 0)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <CircularProgress value={averageCompletion} size="sm" />
            <div>
              <h2 className="text-xl font-semibold mb-1">Completion Rate</h2>
              <p className="text-3xl font-bold text-primary">
                {averageCompletion}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      <HabitList />
      <HabitForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}