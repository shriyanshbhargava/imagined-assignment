import { format, addDays, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Calendar({ selectedDate, onDateSelect }) {
  const startDate = startOfWeek(selectedDate)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

  const goToPreviousWeek = () => {
    onDateSelect(addDays(selectedDate, -7))
  }

  const goToNextWeek = () => {
    onDateSelect(addDays(selectedDate, 7))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousWeek}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-2xl font-bold">
          {format(selectedDate, 'MMMM yyyy')}
        </div>
        <button
          onClick={goToNextWeek}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => {
          const dayNumber = format(date, 'd')
          const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center
                ${isSelected ? 'bg-black text-white' : 'hover:bg-gray-100'}
                focus:outline-none focus:ring-2 focus:ring-black
              `}
            >
              <span className="text-xs">{format(date, 'EEE')}</span>
              <span className="text-lg font-semibold">{dayNumber}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

