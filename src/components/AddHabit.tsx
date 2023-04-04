import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { WEEKDAYS } from "~/utils/calendar";

const AddHabit = () => {
  const { data: sessionData } = useSession();
  const [habitName, setHabitName] = useState("");
  const [habitType, setHabitType] = useState<"toDo" | "notToDo">("toDo");
  const [habitColor, setHabitColor] = useState("goldenPoppy");
  const { refetch: refetchHabits } = api.habit.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const createHabit = api.habit.create.useMutation({
    onSuccess: () => {
      void refetchHabits();
    },
  });
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
  return (
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
  );
};

export default AddHabit;
