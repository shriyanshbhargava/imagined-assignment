"use client";

import React, { useState } from "react";
import { format, addDays, startOfWeek, isBefore } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [direction, setDirection] = useState<number>(0);

  const startDate = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const goToPreviousWeek = () => {
    setDirection(-1);
    onDateSelect(addDays(selectedDate, -7));
  };

  const goToNextWeek = () => {
    setDirection(1);
    onDateSelect(addDays(selectedDate, 7));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousWeek}
          className="p-2 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-2xl font-bold">
          {format(selectedDate, "MMMM yyyy")}
        </div>
        <button
          onClick={goToNextWeek}
          className="p-2 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={startDate.toISOString()}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.2 }}
        >
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((date) => {
              const dayNumber = format(date, "d");
              const isPast = isBefore(date, new Date());
              const isSelected =
                format(date, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => onDateSelect(date)}
                  className={`aspect-square rounded-md flex flex-col items-center justify-center
                transition-transform transform duration-300 ${
                  isSelected
                    ? "bg-black text-white py-2 hover:bg-black scale-105"
                    : isPast
                    ? "text-black py-2 hover:bg-gray-200 scale-100"
                    : "text-gray-500 py-2 hover:bg-gray-200 scale-100"
                } focus:outline-none`}
                >
                  <span
                    className={`text-xs font-semibold transition-colors ${
                      isSelected ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {format(date, "EEEE")[0]}
                  </span>
                  <span className="text-lg font-semibold">{dayNumber}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
