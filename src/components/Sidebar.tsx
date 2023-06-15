import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { type Habit } from "@prisma/client";
import dayjs, { type Dayjs } from "dayjs";
import cn from "~/utils/cn";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/20/solid";
import { Dialog, Popover } from "@headlessui/react";
import ArrowButtons from "~/components/shared/ArrowButtons";
import { type QueryObserverResult } from "@tanstack/react-query";

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
  const currenDate = dayjs();
  const [selectDate, setSelectDate] = useState(currenDate);
  return (
    <>
      <div className="flex justify-between py-3">
        <span>{selectDate.format("ddd, MMMM D")}</span>
        <ArrowButtons
          currenDate={currenDate}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          step={1}
        />
      </div>
      <ul className="flex flex-col gap-5">
        {habits?.map((habit) => (
          <HabitItem
            key={habit.id}
            refetchHabits={refetchHabits}
            habit={habit}
            selectedDate={selectDate}
          />
        ))}
      </ul>
    </>
  );
};

export default Sidebar;

export const HabitItem = ({
  habit,
  selectedDate,
  refetchHabits,
}: {
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

  const updateHabit = api.habit.update.useMutation({
    onSuccess: () => {
      void refetchHabits();
    },
  });

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

type ModalType = "EDIT" | "ARCHIVE" | "DELETE";

const MyPopover = ({
  options,
}: {
  options: { name: string; action: ModalType }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("EDIT");
  function openModal(modalType: ModalType) {
    setIsOpen(true);
    setModalType(modalType);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Popover className="relative">
        <Popover.Button className="outline-none">
          <EllipsisVerticalIcon className="h-5 font-semibold" />
        </Popover.Button>

        <Popover.Panel className="absolute top-6 right-1 z-10">
          <div className="w-[150px] rounded-md border-4 border-r-4 bg-white p-2 text-slateBlue">
            {options.map((opt) => (
              <a
                key={opt.name}
                onClick={() => openModal(opt.action)}
                className="block cursor-pointer rounded p-2 hover:bg-purple-200"
              >
                {opt.name}
              </a>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
      <MyDialog isOpen={isOpen} closeModal={closeModal} modalType={modalType} />
    </>
  );
};

const MyDialog = ({
  isOpen,
  closeModal,
  modalType,
}: {
  isOpen: boolean;
  closeModal: () => void;
  modalType: ModalType;
}) => {
  return (
    <Dialog open={isOpen} className="relative z-20" onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-gray-200">
          <Dialog.Title>
            {" "}
            {modalType === "EDIT"
              ? "Edit Habit"
              : modalType === "ARCHIVE"
              ? "Archive Habit"
              : "Delete Habit"}
          </Dialog.Title>
          <Dialog.Description>This will edit your habit</Dialog.Description>

          {/* <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p> */}

          <button onClick={closeModal}>Deactivate</button>
          <button onClick={closeModal}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
