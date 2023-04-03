import Link from "next/link";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { type Habit } from "@prisma/client";

const Sidebar = () => {
  const { data: sessionData } = useSession();
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const { data: habits, refetch: refetchHabits } = api.habit.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedHabit(selectedHabit ?? data[0] ?? null);
      },
    }
  );
  const createHabit = api.habit.create.useMutation({
    onSuccess: () => {
      void refetchHabits();
    },
  });
  return (
    <div className="h-screen w-[240px] px-2">
      <ul className="h-1/3 rounded-md bg-gray-700 p-2 text-white">
        {habits?.map((habit) => (
          <li key={habit.id}>
            <Link
              href={`/habits/${habit.id}`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedHabit(habit);
              }}
            >
              {habit.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="my-5 h-[2px] w-full rounded bg-gray-500"></div>
      <input
        type="text"
        placeholder="New Habit"
        className="w-full rounded border border-gray-500 bg-gray-700 p-1 outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createHabit.mutate({ name: e.currentTarget.value });
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default Sidebar;