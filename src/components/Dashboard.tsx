import { Card } from "@/components/ui/card";
import { useHabits } from "@/contexts/HabitContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HabitForm } from "./HabitForm";
import { HabitList } from "./HabitList";

export function Dashboard() {
  const { habits } = useHabits();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Habitify</h1>
          <p className="text-muted-foreground">Track your daily habits</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus size={20} />
          Add Habit
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Active Habits</h2>
          <p className="text-3xl font-bold text-primary">{habits.length}</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Total Streaks</h2>
          <p className="text-3xl font-bold text-secondary">
            {habits.reduce((acc, habit) => acc + habit.streak, 0)}
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Completion Rate</h2>
          <p className="text-3xl font-bold text-primary">
            {habits.length > 0
              ? Math.round(
                  (habits.reduce(
                    (acc, habit) => acc + habit.completedDates.length,
                    0
                  ) /
                    (habits.length * 30)) *
                    100
                )
              : 0}
            %
          </p>
        </Card>
      </div>

      <HabitList />
      <HabitForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}