import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { type Habit } from "@prisma/client";
import dayjs, { type Dayjs } from "dayjs";
import { WEEKDAYS } from "~/utils/calendar";
import cn from "~/utils/cn";

const Sidebar = () => {
  const { data: sessionData } = useSession();
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [habitName, setHabitName] = useState("");
  const [habitType, setHabitType] = useState<"toDo" | "notToDo">("toDo");
  const [habitColor, setHabitColor] = useState("goldenPoppy");
  const { data: habits, refetch: refetchHabits } = api.habit.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedHabit(selectedHabit ?? data[0] ?? null);
      },
    }
  );
  const now = dayjs();
  const [selectDate, setSelectDate] = useState(now.format("ddd, MMMM D"));
  const habitColors = [
    "tomato",
    "carrotOrange",
    "goldenPoppy",
    "malachite",
    "royalBlue",
    "turquoise",
    "slateBlue",
    "razzleRose",
  ];
  const createHabit = api.habit.create.useMutation({
    onSuccess: () => {
      void refetchHabits();
    },
  });
  return (
    <>
      <div className="flex justify-between py-3">
        <span>{selectDate}</span>
        <>
          <span className="grid h-6 w-6 cursor-pointer place-content-center rounded-full border border-gray-400">
            &lt;
          </span>
          <span className="grid h-6 w-6 cursor-pointer place-content-center rounded-full border border-gray-400">
            &gt;
          </span>
        </>
      </div>
      <ul className="flex flex-col gap-3 rounded border-2 border-gray-200 py-2 px-3">
        {habits?.map((habit) => (
          <HabitItem key={habit.id} habit={habit} now={now} />
        ))}
      </ul>
      <form
        onSubmit={() =>
          createHabit.mutate({ name: habitName, habitType, habitColor })
        }
      >
        <fieldset className="pb-4">
          <h2 className="pb-3 text-lg font-semibold">1. Name this habit</h2>
          <input
            type="text"
            placeholder="New Habit"
            className="w-full rounded border border-gray-500 p-1 outline-none"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </fieldset>
        <fieldset className="pb-4">
          <h2 className="pb-3 text-lg font-semibold">2. Habit Type</h2>
          <div className="flex gap-8">
            <label htmlFor="to-do" className="flex gap-2">
              <input
                type="radio"
                id="to-do"
                value="toDo"
                onChange={() => setHabitType("toDo")}
                checked={habitType === "toDo"}
              />
              <span>To-Do</span>
            </label>
            <label htmlFor="not-to-do" className="flex gap-2">
              <input
                type="radio"
                id="not-to-do"
                value="notToDo"
                onChange={() => setHabitType("notToDo")}
                checked={habitType === "notToDo"}
              />
              <span>Not-To-Do</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="pb-4">
          <h2 className="pb-3 text-lg font-semibold">3. Weekly frequency</h2>
          <ul className="flex gap-1">
            {WEEKDAYS.map((day, i) => (
              <li key={i} className="border border-gray-400 p-2">
                {day}
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset className="pb-4">
          <h2 className="pb-3 text-lg font-semibold">4. Choose color</h2>
          <div className="flex gap-2">
            {habitColors.map((color, i) => (
              <div
                key={i}
                tabIndex={i}
                onClick={() => setHabitColor(color)}
                className={`bg-${color} h-6 w-6 cursor-pointer rounded-full focus:ring-2 focus:ring-${color}`}
              ></div>
            ))}
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={habitName === ""}
          className="rounded-2xl bg-blue-400 py-2 px-8 text-sm text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Add Habit
        </button>
      </form>
    </>
  );
};

export default Sidebar;

export const HabitItem = ({ habit, now }: { habit: Habit; now: Dayjs }) => {
  const { data: checkins, refetch: refetchCheckins } =
    api.checkin.getAll.useQuery({ habitId: habit.id });
  const checkin = checkins?.filter(
    (checkin) =>
      checkin.createdAt.toDateString() === now.toDate().toDateString()
  )[0];
  const completeCheckin = api.checkin.create.useMutation({
    onSuccess: () => void refetchCheckins(),
  });
  const incompleteCheckin = api.checkin.delete.useMutation({
    onSuccess: () => void refetchCheckins(),
  });

  const bgColor = checkin
    ? habit.color
      ? `bg-${habit.color} text-white`
      : "bg-gray-400 text-white"
    : "";
  return (
    <li
      className={cn(
        "flex flex-col gap-2 rounded-md border-l-4 px-4 py-2",
        bgColor
      )}
    >
      <div className="flex justify-between">
        <span>{habit.name}</span>
        <span>{checkins?.length}</span>
      </div>
      {checkin ? (
        <div className="flex justify-between">
          <span className="text-sm">Completed</span>
          <button
            className="text-sm"
            onClick={() => incompleteCheckin.mutate({ id: checkin.id })}
          >
            Undo
          </button>
        </div>
      ) : (
        <button
          onClick={() => completeCheckin.mutate({ habitId: habit.id })}
          className="w-full rounded border-2 border-gray-200 py-1 text-sm text-blue-500"
        >
          Mark Complete
        </button>
      )}
    </li>
  );
};
