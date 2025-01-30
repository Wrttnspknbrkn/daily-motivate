import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useHabits } from "@/contexts/HabitContext";
import { CheckCircle, Circle, Trash2 } from "lucide-react";

export function HabitList() {
  const { habits, toggleHabit, deleteHabit } = useHabits();

  const isCompletedToday = (completedDates: string[]) => {
    const today = new Date().toISOString().split("T")[0];
    return completedDates.includes(today);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Habits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            className="p-6 flex items-center justify-between group animate-fade-in"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleHabit(habit.id)}
                className={isCompletedToday(habit.completedDates) ? "text-primary" : ""}
              >
                {isCompletedToday(habit.completedDates) ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </Button>
              <div>
                <h3 className="font-semibold">{habit.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {habit.frequency} · {habit.streak} day streak
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteHabit(habit.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
        {habits.length === 0 && (
          <Card className="p-6 text-center text-muted-foreground col-span-full">
            No habits yet. Create your first habit to get started!
          </Card>
        )}
      </div>
    </div>
  );
}