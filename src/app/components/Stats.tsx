import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, Target, TrendingUp } from "lucide-react";

interface StatsProps {
  sessionsCompleted: number;
  tasksCompleted: number;
}

export function Stats({ sessionsCompleted, tasksCompleted }: StatsProps) {
  const totalFocusMinutes = sessionsCompleted * 25;
  const hours = Math.floor(totalFocusMinutes / 60);
  const minutes = totalFocusMinutes % 60;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Your Progress</h2>
        <p className="text-muted-foreground text-lg mt-1">Track your productivity</p>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl font-medium">Focus Sessions</CardTitle>
            <Target className="h-10 w-10 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold">{sessionsCompleted}</div>
            <p className="text-xl text-muted-foreground mt-2">Completed today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl font-medium">Total Focus Time</CardTitle>
            <Clock className="h-10 w-10 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold">
              {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
            </div>
            <p className="text-xl text-muted-foreground mt-2">Time focused</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl font-medium">Tasks Completed</CardTitle>
            <TrendingUp className="h-10 w-10 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold">{tasksCompleted}</div>
            <p className="text-xl text-muted-foreground mt-2">Tasks finished</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
