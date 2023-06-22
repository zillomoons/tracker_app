import { type QueryObserverResult } from "@tanstack/react-query";
import cn from "~/utils/cn";
import { type Dayjs } from "dayjs";
import { FireIcon } from "@heroicons/react/20/solid";
import { type Habit } from "@prisma/client";
import { api } from "~/utils/api";
import { type ModalType } from "~/components/sidebar/types";
import MyPopover from "~/components/sidebar/MyPopOver";

const HabitItem = ({
  habit,
  selectedDate,
}: // refetchHabits,
{
  habit: Habit;
  selectedDate: Dayjs;
  refetchHabits: () => Promise<QueryObserverResult<Habit[]>>;
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

  // const updateHabit = api.habit.update.useMutation({
  //   onSuccess: () => {
  //     void refetchHabits();
  //   },
  // });

  const options: { name: string; action: ModalType }[] = [
    {
      name: "Edit Habit",
      action: "EDIT",
    },
    {
      name: "Archive Habit",
      action: "ARCHIVE",
    },
    {
      name: "Delete Habit",
      action: "DELETE",
    },
  ];

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
        <div className="flex items-center justify-evenly ">
          <span>{checkins?.length || null}</span>
          {Boolean(checkins?.length) && (
            <FireIcon className="h-4 w-4 text-red-500" />
          )}
          <MyPopover options={options} />
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

export default HabitItem;
