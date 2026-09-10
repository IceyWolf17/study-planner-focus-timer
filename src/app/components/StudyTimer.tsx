import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface StudyTimerProps {
  onSessionComplete?: () => void;
}

export function StudyTimer({ onSessionComplete }: StudyTimerProps) {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const totalSeconds = isBreak ? breakMinutes * 60 : focusMinutes * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        setSessionsCompleted((prev) => prev + 1);
        toast.success("Focus session complete! Time for a break.");
        onSessionComplete?.();
        setIsBreak(true);
        setTimeLeft(breakMinutes * 60);
      } else {
        toast.success("Break complete! Ready for another session?");
        setIsBreak(false);
        setTimeLeft(focusMinutes * 60);
      }
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, isBreak, focusMinutes, breakMinutes, onSessionComplete]);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakMinutes * 60 : focusMinutes * 60);
  }, [isBreak, focusMinutes, breakMinutes]);

  const switchMode = useCallback(() => {
    setIsRunning(false);
    setIsBreak((prev) => !prev);
    setTimeLeft((prev) => (isBreak ? focusMinutes * 60 : breakMinutes * 60));
  }, [isBreak, focusMinutes, breakMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSettingsSave = (newFocus: number, newBreak: number) => {
    setFocusMinutes(newFocus);
    setBreakMinutes(newBreak);
    if (!isRunning) {
      setTimeLeft(isBreak ? newBreak * 60 : newFocus * 60);
    }
    toast.success("Timer settings updated!");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{isBreak ? "Break Time" : "Focus Time"}</h2>
          <p className="text-muted-foreground text-lg mt-1">
            {isBreak ? "Take a rest, you've earned it" : "Stay focused on your studies"}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="h-14 w-14">
              <Settings className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[900px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Timer Settings</DialogTitle>
            </DialogHeader>
            <TimerSettings
              focusMinutes={focusMinutes}
              breakMinutes={breakMinutes}
              onSave={handleSettingsSave}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-12 pb-10 space-y-10">
          <div className="flex flex-col items-center gap-8">
            <div className="text-[10rem] font-mono tabular-nums leading-none tracking-tighter">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <Progress value={progress} className="w-full h-4" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4 w-full">
              <Button onClick={toggleTimer} size="lg" className="h-20 flex-1 text-2xl">
                {isRunning ? <Pause className="h-8 w-8 mr-3" /> : <Play className="h-8 w-8 mr-3" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button onClick={resetTimer} variant="outline" size="lg" className="h-20 px-10 text-2xl">
                <RotateCcw className="h-8 w-8" />
              </Button>
            </div>

            <Button onClick={switchMode} variant="ghost" className="text-xl h-14">
              Switch to {isBreak ? "Focus" : "Break"} Mode
            </Button>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold">{sessionsCompleted}</div>
            <p className="text-muted-foreground text-lg mt-1">Sessions completed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface TimerSettingsProps {
  focusMinutes: number;
  breakMinutes: number;
  onSave: (focus: number, breakTime: number) => void;
}

function TimerSettings({ focusMinutes, breakMinutes, onSave }: TimerSettingsProps) {
  const [focus, setFocus] = useState(focusMinutes);
  const [breakTime, setBreakTime] = useState(breakMinutes);

  const handleSave = () => {
    onSave(focus, breakTime);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-3">
        <Label htmlFor="focus" className="text-xl">Focus Duration (minutes)</Label>
        <Input
          id="focus"
          type="number"
          min="1"
          max="120"
          value={focus}
          onChange={(e) => setFocus(Number(e.target.value))}
          className="h-16 text-2xl"
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="break" className="text-xl">Break Duration (minutes)</Label>
        <Input
          id="break"
          type="number"
          min="1"
          max="60"
          value={breakTime}
          onChange={(e) => setBreakTime(Number(e.target.value))}
          className="h-16 text-2xl"
        />
      </div>
      <Button onClick={handleSave} className="w-full h-16 text-xl">
        Save Settings
      </Button>
    </div>
  );
}
