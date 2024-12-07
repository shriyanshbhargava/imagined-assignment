import { useState } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'

export function TodoItem({
  id,
  title,
  description,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedDescription, setEditedDescription] = useState(description)

  const handleSave = () => {
    onEdit(editedTitle, editedDescription)
    setIsEditing(false)
  }

  return (
    <div className="group flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <button
        onClick={onToggle}
        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          completed ? "bg-black border-black" : "border-gray-300"
        }`}
      >
        {completed && <Check className="w-3 h-3 text-white" />}
      </button>
      
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="text-sm px-2 py-1 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm px-2 py-1 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className={`font-medium ${completed && "line-through text-gray-500"}`}>
              {title}
            </h3>
            <p className={`text-sm text-gray-600 ${completed && "line-through text-gray-400"}`}>
              {description}
            </p>
          </>
        )}
      </div>
      
      {!isEditing && (
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

