import { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TodoItem({
  id,
  title,
  description,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleSave = () => {
    onEdit(editedTitle, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className="group flex items-start space-x-3 p-4 bg-gray-50 rounded-lg transition-colors font-playfair shadow">
      <button
        onClick={onToggle}
        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          completed ? "bg-black border-black" : "border-black "
        }`}
      >
        {completed && <Check className="w-3 h-3 text-white" />}
      </button>

      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2 font-poppins">
            <Input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-2 py-2 border rounded focus:outline-none ffocus:ring-1 focus:ring-gray-500"
            />
            <Input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-2 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <div className="flex space-x-2 py-2 ">
              <button
                onClick={handleSave}
                className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm px-4 py-2 font-poppins border rounded hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3
              className={` font-extrabold text-lg  ${
                completed && "line-through text-gray-500"
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-sm text-black font- ${
                completed && "line-through text-gray-400"
              }`}
            >
              {description}
            </p>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity p-2">
          <button onClick={() => setIsEditing(true)} className="text-gray-700">
            <Pencil className="w-5 h-5" />
          </button>
          <button onClick={onDelete} className="text-red-600">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
