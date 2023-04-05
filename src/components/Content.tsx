import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { type Habit } from "@prisma/client";
import SlideOut from "~/components/shared/SlideOut";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import cn from "~/utils/cn";
import ArrowButtons from "~/components/shared/ArrowButtons";
import dayjs from "dayjs";
import { generateWeekDays, WEEKDAYS } from "~/utils/calendar";

const Content: React.FC = () => {
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const categories = ["Week", "Month", "Year", "All Time"];
  const { data: habits, refetch: refetchHabits } = api.habit.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedHabit(selectedHabit ?? data[0] ?? null);
      },
    }
  );
  const currenDate = dayjs();
  const [selectDate, setSelectDate] = useState(currenDate);
  const checkins = ["", "", "", "", "", "", ""];
  return (
    <>
      <h1 className="text-2xl font-semibold">
        Good morning,{" "}
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
          <Tab.Panel>
            <div className="flex">
              <ArrowButtons
                currenDate={currenDate}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
              />
              {selectDate.startOf("week").toDate().toDateString()}
              {" - "}
              {selectDate.endOf("week").toDate().toDateString()}
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    {WEEKDAYS.map((day) => (
                      <th key={day} scope="col" className="px-6 py-3">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {habits?.map((habit) => (
                    <tr key={habit.id} className="border-b bg-white">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                      >
                        {habit.name}
                      </th>
                      {checkins.map((checkin, idx) => (
                        <td key={idx} className=" bg-tomato">
                          {checkin}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
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
