import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Trash2, Plus } from "lucide-react";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TaskListProps {
  onTaskComplete?: () => void;
  compact?: boolean;
}

export function TaskList({ onTaskComplete, compact = false }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Review calculus chapter 5", completed: false, createdAt: Date.now() },
    { id: "2", text: "Complete biology lab report", completed: false, createdAt: Date.now() },
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          if (updatedTask.completed) {
            onTaskComplete?.();
          }
          return updatedTask;
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Quick Tasks</h2>
          <span className="text-lg text-muted-foreground">
            {completedCount}/{totalCount}
          </span>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Add a task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-14 text-lg"
          />
          <Button onClick={addTask} size="icon" className="h-14 w-14 shrink-0">
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {tasks.slice(0, 3).map((task) => (
            <Card key={task.id} className="hover:bg-accent/50 transition-colors">
              <CardContent className="flex items-center gap-4 p-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="h-6 w-6"
                />
                <span className={`flex-1 text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.text}
                </span>
              </CardContent>
            </Card>
          ))}
          {tasks.length > 3 && (
            <p className="text-center text-muted-foreground text-lg py-2">
              +{tasks.length - 3} more in Tasks tab
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Study Tasks</h2>
        <p className="text-muted-foreground text-lg mt-1">
          {completedCount} of {totalCount} completed
        </p>
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Add a new study task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="h-16 text-xl"
        />
        <Button onClick={addTask} size="icon" className="h-16 w-16 shrink-0">
          <Plus className="h-7 w-7" />
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <Card className="p-16">
            <div className="text-center text-muted-foreground text-xl">
              No tasks yet. Add one to get started!
            </div>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="hover:bg-accent/50 transition-colors">
              <CardContent className="flex items-center gap-5 p-6">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="h-7 w-7"
                />
                <span className={`flex-1 text-xl ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="h-14 w-14"
                >
                  <Trash2 className="h-6 w-6" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
