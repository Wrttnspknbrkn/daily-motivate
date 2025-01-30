import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHabits } from "@/contexts/HabitContext";
import { Frequency } from "@/types/habit";
import { useState } from "react";

interface HabitFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HabitForm({ open, onOpenChange }: HabitFormProps) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const { addHabit } = useHabits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addHabit({
        name: name.trim(),
        frequency,
      });
      setName("");
      setFrequency("daily");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Habit Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter habit name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="frequency" className="text-sm font-medium">
              Frequency
            </label>
            <Select
              value={frequency}
              onValueChange={(value) => setFrequency(value as Frequency)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Create Habit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}