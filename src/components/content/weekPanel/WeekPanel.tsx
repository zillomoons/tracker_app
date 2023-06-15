import { Tab } from "@headlessui/react";
import { type Habit } from "@prisma/client";
import dayjs, { type Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ArrowButtons from "~/components/shared/ArrowButtons";
import { api } from "~/utils/api";
import { currentDate, generateWeekDays, WEEKDAYS } from "~/utils/calendar";
import cn from "~/utils/cn";
import isBetween from "dayjs/plugin/isBetween";

export const WeekPanel = () => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const { data: sessionData } = useSession();
  const { data: habits } = api.habit.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      setSelectedHabit(selectedHabit ?? data[0] ?? null);
    },
  });
  const [selectDate, setSelectDate] = useState(currentDate);

  const weekdays = generateWeekDays(selectDate.startOf("week"));

  return (
    <Tab.Panel>
      <div className="flex gap-5">
        <ArrowButtons
          currenDate={currentDate}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          step={7}
        />
        <span>
          {selectDate.startOf("w").format("ddd, MMM D")}
          {" - "}
          {selectDate.endOf("w").format("ddd, MMM D")}
        </span>
      </div>

      <div>
        <div className="week__gridRow">
          <div className="week__gridRow_heading"></div>
          <div className="week__gridRow__main">
            {WEEKDAYS.map((day, idx) => (
              <div key={idx} className="week__gridRowItem">
                {day}
              </div>
            ))}
          </div>
          <div className="week__gridRow_end"></div>
        </div>
        {habits?.map((habit) => (
          <div className="week__gridRow" key={habit.id}>
            <div className="week__gridRow_heading">
              <span className="week__gridRow__name">{habit.name}</span>
            </div>
            <div className="week__gridRow__main">
              {weekdays.map(({ date }, idx) => (
                <CheckinCell
                  key={idx}
                  date={date}
                  habit={habit}
                  selectDate={selectDate}
                />
              ))}
            </div>
            <div className="week__gridRow_end"></div>
          </div>
        ))}
      </div>
    </Tab.Panel>
  );
};

export const CheckinCell = ({
  date,
  habit,
  selectDate,
}: {
  date: Dayjs;
  habit: Habit;
  selectDate: Dayjs;
}) => {
  dayjs.extend(isBetween);
  const { data: checkins } = api.checkin.getAll.useQuery({ habitId: habit.id });
  const habitCreatedDate = habit.createdAt;
  // const firstCheckinDate = checkins ? checkins[0]?.createdAt : null;
  const filteredCheckins = checkins
    ?.filter((checkin) =>
      dayjs(checkin.createdAt).isBetween(
        selectDate.startOf("w"),
        selectDate.endOf("w")
      )
    )
    .map(({ createdAt }) => createdAt.toDateString());
  return habitCreatedDate.toDateString() <
    selectDate.toDate().toDateString() ? (
    <button
      data-date={date.toDate().toDateString()}
      className={cn(
        "week__gridRowItem",
        filteredCheckins?.includes(date.toDate().toDateString())
          ? "bg-red-500"
          : "bg-slate-200"
      )}
    ></button>
  ) : (
    <div className="week__gridRowItem"></div>
  );
};

//  <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
//    <table className="weekly-calendar table">
//      <thead className="table-header-group">
//        <tr className="table-row h-[15px]">
//          <td className="table-cell w-[29px]"></td>
//          {WEEKDAYS.map((day) => (
//            <td
//              key={day}
//              className="table-cell w-7 text-center text-xs font-semibold text-[#3d4146]"
//            >
//              {day}
//            </td>
//          ))}
//        </tr>
//      </thead>
//      <tbody className="table-row-group">
//        {habits?.map((habit) => (
//          <CheckinsRow
//            habit={habit}
//            key={habit.id}
//            selectDate={selectDate}
//          />
//        ))}
//      </tbody>
//    </table>
//  </div>;
