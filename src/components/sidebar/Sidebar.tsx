import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { type Habit } from "@prisma/client";
import dayjs from "dayjs";
import ArrowButtons from "~/components/shared/ArrowButtons";
import HabitItem from "./HabitItem";

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
