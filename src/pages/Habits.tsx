import { HabitList } from "@/components/HabitList";

export default function Habits() {
  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary">My Habits</h1>
        <p className="text-muted-foreground">Track and manage your daily habits</p>
      </header>
      <HabitList />
    </div>
  );
}