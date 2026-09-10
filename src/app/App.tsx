import { useState } from "react";
import { StudyTimer } from "./components/StudyTimer";
import { TaskList } from "./components/TaskList";
import { Stats } from "./components/Stats";
import { Toaster } from "./components/ui/sonner";
import { BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Clock, ListTodo, BarChart3 } from "lucide-react";

export default function App() {
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const handleSessionComplete = () => {
    setSessionsCompleted((prev) => prev + 1);
  };

  const handleTaskComplete = () => {
    setTasksCompleted((prev) => prev + 1);
  };

  return (
    <div className="w-[1080px] h-[1920px] bg-background flex flex-col mx-auto">
      {/* Header */}
      <div className="px-8 pt-16 pb-6 bg-gradient-to-b from-primary/10 to-background">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-5xl font-bold tracking-tight">Study Planner</h1>
            <p className="text-muted-foreground text-xl mt-1">Stay focused, stay productive</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="timer" className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <TabsContent value="timer" className="p-8 pt-6 space-y-6 m-0">
            <StudyTimer onSessionComplete={handleSessionComplete} />
            <TaskList onTaskComplete={handleTaskComplete} compact />
          </TabsContent>

          <TabsContent value="tasks" className="p-8 pt-6 m-0">
            <TaskList onTaskComplete={handleTaskComplete} />
          </TabsContent>

          <TabsContent value="stats" className="p-8 pt-6 m-0">
            <Stats sessionsCompleted={sessionsCompleted} tasksCompleted={tasksCompleted} />
          </TabsContent>
        </div>

        {/* Bottom Navigation */}
        <TabsList className="w-full h-24 rounded-none bg-card border-t grid grid-cols-3 p-0">
          <TabsTrigger value="timer" className="flex-col gap-2 h-full text-lg data-[state=active]:bg-primary/10">
            <Clock className="h-7 w-7" />
            <span>Timer</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex-col gap-2 h-full text-lg data-[state=active]:bg-primary/10">
            <ListTodo className="h-7 w-7" />
            <span>Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex-col gap-2 h-full text-lg data-[state=active]:bg-primary/10">
            <BarChart3 className="h-7 w-7" />
            <span>Stats</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Toaster />
    </div>
  );
}
