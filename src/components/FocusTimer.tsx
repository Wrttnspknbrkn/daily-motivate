import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer, Pause, Play, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        toast({
          title: "Focus session completed!",
          description: "Time for a 5-minute break.",
        });
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
      } else {
        toast({
          title: "Break completed!",
          description: "Ready for another focus session?",
        });
        setTimeLeft(25 * 60);
        setIsBreak(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, toast]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Timer className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Focus Timer</h2>
        </div>
        
        <motion.div
          className="text-4xl font-bold"
          animate={{
            scale: isRunning ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: isRunning ? Infinity : 0,
            repeatType: "reverse",
          }}
        >
          {formatTime(timeLeft)}
        </motion.div>
        
        <p className="text-sm text-muted-foreground">
          {isBreak ? "Break Time" : "Focus Session"}
        </p>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsRunning(!isRunning)}
            className="hover:scale-105 transition-transform"
          >
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={resetTimer}
            className="hover:scale-105 transition-transform"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}