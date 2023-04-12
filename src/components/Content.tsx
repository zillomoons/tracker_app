import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { type Habit } from "@prisma/client";
import SlideOut from "~/components/shared/SlideOut";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import cn from "~/utils/cn";
import ArrowButtons from "~/components/shared/ArrowButtons";
import dayjs, { type Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { generateWeekDays, WEEKDAYS } from "~/utils/calendar";
import { defineTimeOfDay } from "~/utils/calendar";

const Content: React.FC = () => {
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  const categories = ["Week", "Month", "Year", "All Time"];

  const currentDate = dayjs();
  const currentHour = parseInt(currentDate.format("H"));
  const timeOfDay = defineTimeOfDay(currentHour);
  return (
    <>
      <h1 className="text-2xl font-semibold">
        Good {timeOfDay},{" "}
        <span className="self-center whitespace-nowrap text-xl font-semibold text-purple-500">
          {sessionData?.user.name}
        </span>
      </h1>

      <Tab.Group>
        <div className="flex justify-between">
          <Tab.List className="flex w-2/3 items-center justify-evenly gap-4 rounded-3xl bg-gray-200 py-1.5 px-2">
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  cn(
                    "w-full rounded-3xl py-2.5 text-sm font-medium leading-5 ",
                    "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white text-black shadow"
                      : "text-gray-500 hover:bg-white/[0.12]"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <button
            className="flex items-center justify-center rounded-3xl border border-gray-300 bg-white py-2 px-8 text-sm text-blue-400 hover:bg-gray-100 focus:outline-none active:ring-4 active:ring-gray-200"
            onClick={() => setOpen(true)}
          >
            <PlusSmallIcon className="h-6 w-6 font-semibold" />
            Add Habit
          </button>
        </div>

        <Tab.Panels>
          <WeekPanel currentDate={currentDate} />
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <SlideOut open={open} setOpen={setOpen} />
    </>
  );
};

export default Content;

export const CheckinsRow = ({
  habit,
  selectDate,
}: {
  habit: Habit;
  selectDate: Dayjs;
}) => {
  dayjs.extend(isBetween);
  const { data: checkins } = api.checkin.getAll.useQuery({ habitId: habit.id });
  const weekdays = generateWeekDays(selectDate.startOf("week"));
  const filteredCheckins = checkins
    ?.filter((checkin) =>
      dayjs(checkin.createdAt).isBetween(
        selectDate.startOf("w").add(1, "day"),
        selectDate.endOf("w").add(1, "day")
      )
    )
    .map(({ createdAt }) => createdAt.toDateString());
  console.log(habit.name, filteredCheckins);
  return (
    <tr className="table-row h-7">
      <td className="habitCalendar-label">{habit.name}</td>
      {weekdays.map(({ date }, idx) => (
        <td
          key={idx}
          data-date={date.toDate().toDateString()}
          className={cn(
            "habitCalendar-day ",
            filteredCheckins?.includes(date.toDate().toDateString())
              ? "bg-red-500"
              : "bg-slate-200"
          )}
        ></td>
      ))}
    </tr>
  );
};

export const WeekPanel = ({ currentDate }: { currentDate: Dayjs }) => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const { data: sessionData } = useSession();
  const { data: habits } = api.habit.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      setSelectedHabit(selectedHabit ?? data[0] ?? null);
    },
  });

  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <Tab.Panel>
      <div className="flex gap-5">
        <ArrowButtons
          currenDate={currentDate}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          step={7}
        />
        <span>
          {selectDate.startOf("week").add(1, "day").format("ddd, MMM D")}
          {" - "}
          {selectDate.endOf("week").add(1, "day").format("ddd, MMM D")}
        </span>
      </div>

      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="weekly-calendar table">
          <thead className="table-header-group">
            <tr className="table-row h-[15px]">
              <td className="table-cell w-[29px]"></td>
              {WEEKDAYS.map((day) => (
                <td
                  key={day}
                  className="table-cell w-7 text-center text-xs font-semibold text-[#3d4146]"
                >
                  {day}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="table-row-group">
            {habits?.map((habit) => (
              <CheckinsRow
                habit={habit}
                key={habit.id}
                selectDate={selectDate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Tab.Panel>
  );
};
