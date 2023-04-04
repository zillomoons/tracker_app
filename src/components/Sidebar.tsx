import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { type Habit } from "@prisma/client";
import dayjs, { type Dayjs } from "dayjs";
import cn from "~/utils/cn";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/20/solid";

const Sidebar = () => {
  const { data: sessionData } = useSession();
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const { data: habits } = api.habit.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      setSelectedHabit(selectedHabit ?? data[0] ?? null);
    },
  });
  const currenDate = dayjs();
  const [selectDate, setSelectDate] = useState(currenDate);
  return (
    <>
      <div className="flex justify-between py-3">
        <span>{selectDate.format("ddd, MMMM D")}</span>
        <div className="flex w-14 justify-between">
          <button
            onClick={() => setSelectDate(selectDate.day(selectDate.day() - 1))}
            className="grid h-6 w-6 cursor-pointer place-content-center rounded-full border border-gray-400"
          >
            <ChevronLeftIcon className="h-3 w-3" />
          </button>
          <button
            disabled={
              selectDate.toDate().toDateString() ===
              currenDate.toDate().toDateString()
            }
            onClick={() => setSelectDate(selectDate.day(selectDate.day() + 1))}
            className="grid h-6 w-6 cursor-pointer place-content-center rounded-full border border-gray-400 disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-400"
          >
            <ChevronRightIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
      <ul className="flex h-5/6 flex-col gap-5 rounded border-2 border-gray-200 py-2 px-3">
        {habits?.map((habit) => (
          <HabitItem key={habit.id} habit={habit} selectedDate={selectDate} />
        ))}
      </ul>
    </>
  );
};

export default Sidebar;

export const HabitItem = ({
  habit,
  selectedDate,
}: {
  habit: Habit;
  selectedDate: Dayjs;
}) => {
  const { data: checkins, refetch: refetchCheckins } =
    api.checkin.getAll.useQuery({ habitId: habit.id });
  const checkin = checkins?.filter(
    (checkin) =>
      checkin.createdAt.toDateString() === selectedDate.toDate().toDateString()
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
        <div className="flex items-center justify-evenly">
          <span>{checkins?.length || null}</span>
          {checkins?.length ? (
            <FireIcon className="h-4 w-4 text-red-500" />
          ) : null}
          <button>
            <EllipsisVerticalIcon className="h-5 font-semibold" />
          </button>
        </div>
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
          onClick={() =>
            completeCheckin.mutate({
              habitId: habit.id,
              date: selectedDate.toDate(),
            })
          }
          className="w-full rounded border-2 border-gray-200 py-1 text-sm text-blue-500"
        >
          Mark Complete
        </button>
      )}
    </li>
  );
};
