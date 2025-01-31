import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useHabits } from "@/contexts/HabitContext";
import { CheckCircle, Circle, Trash2, Flame, Search } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "react-confetti";

export function HabitList() {
  const { habits, toggleHabit, deleteHabit } = useHabits();
  const [search, setSearch] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const isCompletedToday = (completedDates: string[]) => {
    const today = new Date().toISOString().split("T")[0];
    return completedDates.includes(today);
  };

  const calculateProgress = (completedDates: string[]) => {
    const last30Days = 30;
    return (completedDates.length / last30Days) * 100;
  };

  const handleToggleHabit = (id: string, isCompleted: boolean) => {
    if (!isCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    toggleHabit(id);
  };

  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-20">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        </div>
      )}

      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg p-4 -mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHabits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              layout
            >
              <Card
                className="p-6 flex items-center justify-between group hover:shadow-lg transition-all duration-300 animate-fade-in backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 hover:bg-gradient-to-br from-primary/5 to-secondary/5"
              >
                <div className="flex items-center gap-4">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleToggleHabit(
                          habit.id,
                          isCompletedToday(habit.completedDates)
                        )
                      }
                      className={cn(
                        "transition-transform hover:scale-110",
                        isCompletedToday(habit.completedDates)
                          ? "text-primary"
                          : ""
                      )}
                    >
                      {isCompletedToday(habit.completedDates) ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </Button>
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">{habit.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{habit.frequency}</span>
                      {habit.streak > 0 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <motion.div
                                className="flex items-center gap-1 text-orange-500"
                                animate={{
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                }}
                              >
                                <Flame className="h-4 w-4" />
                                <span>{habit.streak}</span>
                              </motion.div>
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
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteHabit(habit.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
          {filteredHabits.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full"
            >
              <Card className="p-6 text-center text-muted-foreground">
                {search
                  ? "No habits found matching your search"
                  : "No habits yet. Create your first habit to get started!"}
              </Card>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}