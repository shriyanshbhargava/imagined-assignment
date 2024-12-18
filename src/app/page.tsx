"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/Calendar";
import { TaskList } from "@/components/TaskList";
import { useTodoStore } from "@/store/todo-store";
import AddTaskButton from "@/components/AddTaskButton";

export default function TodoPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddingTodo, setIsAddingTodo] = useState<boolean>(false);

  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodoStore();

  const todaysTodos = todos.filter(
    (todo) =>
      todo.date &&
      format(todo.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="min-h-screen bg-[#EEF0F3] p-4 md:pt-6 relative">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Calendar for selecting dates */}
        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center font-inter">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {format(selectedDate, "yyyy-MM-dd") ===
              format(new Date(), "yyyy-MM-dd")
                ? "Today"
                : format(selectedDate, "EEEE")}
            </h2>
          </div>

          {/* Add Task Modal */}
          <AddTaskButton
            isOpen={isAddingTodo}
            onClose={() => setIsAddingTodo(false)}
            addTodo={addTodo}
            selectedDate={new Date(format(selectedDate, "yyyy-MM-dd"))}
          />

          {/* Task List showing today's todos */}
          <TaskList
            todos={todaysTodos}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>

      {/* Bottom Button for Adding Todos */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => setIsAddingTodo(true)}
          className="p-4 bg-white text-black rounded-full outline-none ring-1 ring-gray-200 hover:shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
