import { TodoItem } from './TodoItem'

export function TaskList({ todos, onToggle, onEdit, onDelete }) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={() => onToggle(todo.id)}
          onEdit={(title, description) => onEdit(todo.id, { title, description })}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No tasks for this day
        </p>
      )}
    </div>
  )
}

