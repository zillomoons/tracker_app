import dayjs from "dayjs";

const DAYS_IN_CALENDAR = 42;

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');
  
  const arrayOfDays = [];

  //generate prefix days(previous month)
  for (let i = 0; i < firstDateOfMonth.day(); i++){
    arrayOfDays.push({
      currentMonth: false,
      date: firstDateOfMonth.day(i),
      isToday: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString()
    });
  }

  //generate current month days
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++){
    arrayOfDays.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      isToday: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString()
    });
  }

  //generate suffix days(next month)
  const remainingDays = DAYS_IN_CALENDAR - arrayOfDays.length;
  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remainingDays; i++){
    arrayOfDays.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
      isToday: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString()
    });
  }


  return arrayOfDays;
}

export const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];
export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
