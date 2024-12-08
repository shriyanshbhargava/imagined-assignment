import { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface TodoItemProps {
  id: string | number; // Adjust type based on your ID system
  title: string;
  description: string;
  completed: boolean;
  onToggle: () => void;
  onEdit: (title: string, description: string) => void;
  onDelete: () => void;
}

export function TodoItem({
  id,
  title,
  description,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedDescription, setEditedDescription] =
    useState<string>(description);

  const handleSave = () => {
    onEdit(editedTitle, editedDescription);
    console.log("Saved changes:", editedTitle, editedDescription);
  };

  return (
    <div className="group flex items-start space-x-3 p-4 bg-gray-50 rounded-lg transition-colors font-playfair shadow hover:cursor-pointer">
      <button
        onClick={onToggle}
        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          completed
            ? "bg-black border-black animate-fill"
            : "border-black animate-unfill"
        }`}
      >
        {completed && <Check className="w-3 h-3 text-white" />}
      </button>

      <div className="flex-1">
        <h3
          className={`font-extrabold text-lg ${
            completed ? "line-through text-gray-500" : ""
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${
            completed ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity p-2">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-gray-700">
              <Pencil className="w-5 h-5" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update the title and description.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-2 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <Input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Description"
                className="w-full px-2 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <DialogFooter>
              <DialogClose
                asChild
                className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <button onClick={handleSave}>Save</button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <button onClick={onDelete} className="text-red-600">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
