"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/Calendar";
import { TaskList } from "@/components/TaskList";
import { useTodoStore } from "@/store/todo-store";
import AddTaskButton from "@/components/AddTaskButton";

export default function TodoPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodoStore();

  const todaysTodos = todos.filter(
    (todo) => todo.date === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="min-h-screen bg-[#EEF0F3] p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center font-montserrat">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {format(selectedDate, "yyyy-MM-dd") ===
              format(new Date(), "yyyy-MM-dd")
                ? "Today"
                : format(selectedDate, "MMMM d, yyyy")}
            </h2>
            <button
              onClick={() => setIsAddingTodo(true)}
              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <AddTaskButton
            isOpen={isAddingTodo}
            onClose={() => setIsAddingTodo(false)}
            addTodo={addTodo}
            selectedDate={format(selectedDate, "yyyy-MM-dd")}
          />

          <TaskList
            todos={todaysTodos}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}
