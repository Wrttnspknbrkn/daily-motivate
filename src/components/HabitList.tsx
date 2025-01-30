import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useHabits } from "@/contexts/HabitContext";
import { CheckCircle, Circle, Trash2, Flame } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HabitList() {
  const { habits, toggleHabit, deleteHabit } = useHabits();

  const isCompletedToday = (completedDates: string[]) => {
    const today = new Date().toISOString().split("T")[0];
    return completedDates.includes(today);
  };

  const calculateProgress = (completedDates: string[]) => {
    const last30Days = 30;
    return (completedDates.length / last30Days) * 100;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Habits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            className="p-6 flex items-center justify-between group hover:shadow-lg transition-all duration-300 animate-fade-in backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-gray-200/50"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleHabit(habit.id)}
                className={cn(
                  "transition-transform hover:scale-110",
                  isCompletedToday(habit.completedDates) ? "text-primary" : ""
                )}
              >
                {isCompletedToday(habit.completedDates) ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </Button>
              <div>
                <h3 className="font-semibold">{habit.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{habit.frequency}</span>
                  {habit.streak > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1 text-orange-500">
                            <Flame className="h-4 w-4" />
                            <span>{habit.streak}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Current streak: {habit.streak} days</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CircularProgress
                value={calculateProgress(habit.completedDates)}
                size="sm"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteHabit(habit.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
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