import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { type Habit } from "@prisma/client";
import Calendar from "~/components/Calendar";

const Content: React.FC = () => {
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

  return (
    <div className="mx-5 mt-5 flex gap-2">
      <Calendar habitName={selectedHabit?.name ?? ""} />
    </div>
  );
};

export default Content;
