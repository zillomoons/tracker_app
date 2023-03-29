import dayjs from "dayjs";
import { useState } from "react";
import { generateDate, months } from "~/utils/calendar";
import cn from "~/utils/cn";

const Calendar = ({ habitName }: { habitName: string }) => {
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <div className="mx-auto flex h-screen gap-10 divide-x-2">
      <div className="mx-10 h-96 w-96">
        <h1 className="pb-3 text-2xl">{habitName.toUpperCase()}</h1>
        <section className="flex justify-between font-semibold">
          <h1 className="">
            {months[today.month()]}, {today.year()}
          </h1>
          <section className="flex w-28 items-center justify-between">
            <span
              className="cursor-pointer"
              onClick={() => setToday(today.month(today.month() - 1))}
            >
              &lt;
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setToday(currentDate)}
            >
              Today
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setToday(today.month(today.month() + 1))}
            >
              &gt;
            </span>
          </section>
        </section>
        <ol className="grid grid-cols-7 pb-1 pt-3 text-sm text-gray-500">
          {WEEKDAYS.map((day) => (
            <li key={day} className="grid h-14 place-content-center text-sm">
              {day}
            </li>
          ))}
        </ol>
        <ol className="grid h-full grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, isToday }, idx) => (
              <li
                key={idx}
                className="grid h-14 place-content-center border-t border-gray-500 text-sm"
              >
                <span
                  onClick={() => setSelectDate(date)}
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "border border-gray-500"
                      : "",
                    isToday ? "bg-red-600 text-white" : "",
                    "grid h-10 w-10 cursor-pointer place-content-center rounded-full hover:bg-white hover:text-black"
                  )}
                >
                  {date.date()}
                </span>
              </li>
            )
          )}
        </ol>
      </div>
      <div className="h-96 w-96 px-5">
        <h1 className="font-semibold">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <p className="text-sm text-gray-400">No meeting for today</p>
      </div>
    </div>
  );
};

export default Calendar;
