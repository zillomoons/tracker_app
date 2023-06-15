import { useSession } from "next-auth/react";

import { useState } from "react";
import SlideOut from "~/components/shared/SlideOut";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import cn from "~/utils/cn";
import { currentDate, defineTimeOfDay } from "~/utils/calendar";
import { WeekPanel } from "~/components/content/weekPanel/WeekPanel";

export const Content: React.FC = () => {
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  const categories = ["Week", "Month", "Year", "All Time"];

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
          <WeekPanel />
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <SlideOut open={open} setOpen={setOpen} />
    </>
  );
};
