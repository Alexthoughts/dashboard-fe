import { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dayjs from "dayjs";
import { holidayObjectType } from "./types/types";

type HolidayProps = {
  onChange: (isOpen: boolean) => void;
  holidayList: [];
  isOpenHolidayList: boolean;
};

export const Holiday: FC<HolidayProps> = ({
  onChange,
  holidayList,
  isOpenHolidayList,
}) => {
  const [nextHolidayDay, setNextHolidayDay] = useState<string>();

  // GET THE NEAREST HOLIDAY
  useEffect(() => {
    if (holidayList.length === 0) return;
    const holidayDays = () => {
      const currentDate = dayjs().format("YYYY-MM-DD");

      const nearestHoliday = holidayList
        .map((holiday: holidayObjectType) => ({
          ...holiday,
          daysBefore: dayjs(holiday.date).diff(currentDate, "days"), //calculate days for a holiday
        }))
        .filter((holiday) => holiday.daysBefore > 0) //filter future holidays
        .sort((b, a) => b.daysBefore - a.daysBefore) //sort from the nearest
        .shift(); //first element of an array

      let nextHoliday: string;
      //nearestHoliday = undefined, means that no more holidays this year
      if (!nearestHoliday) {
        nextHoliday = `New Year's Day, 01 January`;
      } else {
        nextHoliday = `${nearestHoliday.name}, ${dayjs(nearestHoliday.date).format(
          "DD MMMM"
        )}`;
      }
      setNextHolidayDay(nextHoliday);
    };
    holidayDays();
  }, [holidayList]);

  const clickAction = () => {
    onChange(!isOpenHolidayList);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
      <Typography>Next public holiday: {nextHolidayDay}</Typography>
      <KeyboardArrowUpIcon
        className="pointer"
        onClick={clickAction}
        style={{
          transition: "transform 0.3s",
          transform: isOpenHolidayList ? "rotate(0)" : "rotate(180deg)",
        }}
      />
    </Box>
  );
};
