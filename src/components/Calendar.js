import { format, addDays, startOfWeek, isBefore, isToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Calendar({ selectedDate, onDateSelect }) {
  const startDate = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const goToPreviousWeek = () => {
    onDateSelect(addDays(selectedDate, -7));
  };

  const goToNextWeek = () => {
    onDateSelect(addDays(selectedDate, 7));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousWeek}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-2xl font-bold">
          {format(selectedDate, "MMMM yyyy")}
        </div>
        <button
          onClick={goToNextWeek}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => {
          const dayNumber = format(date, "d");
          const isPast = isBefore(date, new Date()); // Determine if it's a past date
          const isTodayDate = isToday(date); // Determine if it's today
          const isSelected =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`
                aspect-square rounded-md flex flex-col items-center justify-center
                ${
                  isSelected
                    ? "bg-black text-white py-2"
                    : isPast
                    ? "text-black py-2"
                    : "text-gray-500 py-2"
                }
              `}
            >
              <span className="text-xs">{format(date, "EEEE")[0]}</span>
              <span className="text-lg font-semibold">{dayNumber}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
