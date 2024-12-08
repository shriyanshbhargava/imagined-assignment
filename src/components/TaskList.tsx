import { TodoItem } from "./TodoItem";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: string | number; 
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string | number) => void;
  onEdit: (id: string | number, updatedFields: { title: string; description: string }) => void;
  onDelete: (id: string | number) => void;
}

export function TaskList({ todos, onToggle, onEdit, onDelete }: TaskListProps) {
  const sortedTodos = [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {sortedTodos.map((todo) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              layout: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2 },
            }}
          >
            <TodoItem
              {...todo}
              onToggle={() => onToggle(todo.id)}
              onEdit={(title, description) =>
                onEdit(todo.id, { title, description })
              }
              onDelete={() => onDelete(todo.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {todos.length === 0 && (
        <p className="text-center text-gray-500 py-8">No tasks for this day</p>
      )}
    </div>
  );
}
