import React, { createContext, useContext, useEffect, useState } from "react";
import { Habit } from "@/types/habit";
import { useToast } from "@/hooks/use-toast";

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, "id" | "createdAt" | "streak" | "completedDates">) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  updateHabit: (habit: Habit) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (newHabit: Omit<Habit, "id" | "createdAt" | "streak" | "completedDates">) => {
    const habit: Habit = {
      ...newHabit,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      streak: 0,
      completedDates: [],
    };
    setHabits((prev) => [...prev, habit]);
    toast({
      title: "Habit Created",
      description: `${habit.name} has been added to your habits.`,
    });
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const today = new Date().toISOString().split("T")[0];
          const isCompleted = habit.completedDates.includes(today);
          const completedDates = isCompleted
            ? habit.completedDates.filter((date) => date !== today)
            : [...habit.completedDates, today];
          
          // Calculate streak
          let streak = habit.streak;
          if (!isCompleted) {
            streak += 1;
          } else {
            streak = Math.max(0, streak - 1);
          }

          return {
            ...habit,
            completedDates,
            streak,
          };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    toast({
      title: "Habit Deleted",
      description: "The habit has been removed.",
    });
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit))
    );
    toast({
      title: "Habit Updated",
      description: `${updatedHabit.name} has been updated.`,
    });
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        toggleHabit,
        deleteHabit,
        updateHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};