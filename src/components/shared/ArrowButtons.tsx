import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { type Dayjs } from "dayjs";
import type { Dispatch, SetStateAction } from "react";

const ArrowButtons = ({
  selectDate,
  currenDate,
  setSelectDate,
}: {
  selectDate: Dayjs;
  currenDate: Dayjs;
  setSelectDate: Dispatch<SetStateAction<Dayjs>>;
}) => {
  return (
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
  );
};

export default ArrowButtons;
