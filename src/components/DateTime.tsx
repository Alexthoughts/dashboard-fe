import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { holidayObjectType } from "../types/types";

type dateTimeProps = {
  holidayList: holidayObjectType[];
};

const getTime = () => {
  return dayjs().format("HH:mm");
};

const getDate = () => {
  return dayjs().format("DD.MM.YYYY");
};

export const DateTime: FC<dateTimeProps> = ({ holidayList }) => {
  const [time, setTime] = useState<string>(getTime());
  const [date, setDate] = useState<string>(getDate());
  const [todaysHoliday, setTodaysHoliday] = useState<string>("");

  // CHECK IF THE HOLIDAY TODAY
  useEffect(() => {
    if (holidayList) {
      const currentDay = dayjs().format("YYYY-MM-DD");
      holidayList.forEach((holiday: holidayObjectType) => {
        if (holiday.date === currentDay) {
          setTodaysHoliday(holiday.name);
        }
      });
    }
  }, [holidayList]);

  setInterval(() => {
    setTime(getTime);
    setDate(getDate);
  }, 1000);

  return (
    <Box
      sx={{
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: { sm: "center", lg: "left" },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: { sm: "center", lg: "left" },
        }}
      >
        {date}
      </Typography>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          maxWidth: "70%",
          textAlign: { sm: "end", lg: "left" },
        }}
      >
        {todaysHoliday}
      </Typography>
      <Typography sx={{ fontSize: "9.375rem", fontWeight: "bold" }}>{time}</Typography>
    </Box>
  );
};
