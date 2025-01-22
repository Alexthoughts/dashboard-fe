import dayjs from "dayjs";
import { holidayObjectType } from "../../types/types";

export const getWorkingDay = (workingDayNumber: number) => {
  switch (workingDayNumber) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
};

export const getNearestHoliday = (holidayList: holidayObjectType[]) => {
  const currentDate = dayjs().format("YYYY-MM-DD");

  return holidayList
    .map((holiday: holidayObjectType) => ({
      ...holiday,
      daysBefore: dayjs(holiday.date).diff(currentDate, "days"), //calculate days for a holiday
    }))
    .filter((holiday) => holiday.daysBefore > 0) //filter future holidays
    .sort((b, a) => b.daysBefore - a.daysBefore) //sort from the nearest
    .shift(); //first element of an array
};
