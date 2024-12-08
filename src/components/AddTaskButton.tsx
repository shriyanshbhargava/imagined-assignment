import React, { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogTitle } from "@components/ui/dialog";

interface AddTaskButtonProps {
  isOpen: boolean;
  onClose: () => void;
  addTodo: (todo: {
    title: string;
    description: string;
    completed: boolean;
    date: Date;
  }) => void;
  selectedDate: Date;
}

export default function AddTaskButton({
  isOpen,
  onClose,
  addTodo,
  selectedDate,
}: AddTaskButtonProps) {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addTodo({
        title: newTitle,
        description: newDescription,
        completed: false,
        date: selectedDate,
      });
      setNewTitle("");
      setNewDescription("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Add New Task</DialogTitle>
        <form onSubmit={handleAddTodo} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 "
              placeholder="Enter task title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-1focus:ring-gray-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
