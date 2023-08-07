import dayjs from "dayjs";
import updateLocale from 'dayjs/plugin/updateLocale';
import { DayOfWeek } from "../features/habits/habitsSlice";

export const WEEKDAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DAYS_IN_CALENDAR = 42;

dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });

export const currentDate = dayjs();

export const currDateString = currentDate.toDate().toDateString();

export function generateWeekdays(firstDayOfWeek = currentDate.startOf('week')) {
  const weekdays = [];

  //generate week days dates
  for (let i = 0; i <= 6; i++){
    weekdays.push({
      date: firstDayOfWeek.add(i, 'day').toDate().toDateString()
    })
  }

  return weekdays;
}

export function generateDaysOfMonth(month = currentDate.month(), year = currentDate.year()) {
  const firstDateOfMonth = currentDate.year(year).month(month).startOf('month');
  const lastDateOfMonth = currentDate.year(year).month(month).endOf('month');

  const arrayOfDays = [];

  //generate prefix days (previous month)
  for (let i = 0; i < firstDateOfMonth.day(); i++){
    arrayOfDays.push({
      currentMonth: false,
      date: firstDateOfMonth.day(i),
      isToday: firstDateOfMonth.date(i).toDate().toDateString() === currDateString
    })
  }

  //generate current month days
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++){
    arrayOfDays.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      isToday: firstDateOfMonth.date(i).toDate().toDateString() === currDateString
    })
  }

  //generate suffix day (next month)
  const remainingDays = DAYS_IN_CALENDAR - arrayOfDays.length;
  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remainingDays; i++){
    arrayOfDays.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
      isToday: firstDateOfMonth.date(i).toDate().toDateString() === currDateString
    })
  }

  return arrayOfDays;
}

export function isFutureDate(date: string) {
  const currenDate = new Date().getTime();
  const comparedDate = new Date(date).getTime();

  return comparedDate > currenDate;
}

export function isDateOutOfRange(startDate: string, target: string) {
  return new Date(startDate).getTime() > new Date(target).getTime();
}

export const defineTimeOfDay = (hour: number) =>
  hour < 7
    ? "night"
    : hour > 17
    ? "evening"
    : hour > 11
    ? "afternoon"
    : "morning";