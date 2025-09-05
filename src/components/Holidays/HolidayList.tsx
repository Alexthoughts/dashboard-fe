import { Box } from "@mui/material";
import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { holidayObjectType } from "../../types/types";
import { getNearestHoliday, getWorkingDay } from "./reusableFunctions";
import useLocation from "../../hooks/useLocation";
import axios from "../../api/axios";

type HolidayListProps = {
  setHolidays: (holidayList: []) => void;
  isOpen: boolean;
  holidayList: holidayObjectType[];
};

export const HolidayList: FC<HolidayListProps> = ({
  setHolidays,
  isOpen,
  holidayList,
}) => {
  const localStorageKey = "Holiday list";
  const { location } = useLocation();

  useEffect(() => {
    if (location) {
      getHolidayList(location.country_code2)
        .then((holidayList) => {
          setHolidays(holidayList);
          localStorage.setItem(localStorageKey, JSON.stringify(holidayList));
        })
        .catch((err) => {
          console.error("Fetch holiday list error: ", err);
          const listFromLocalStorage = localStorage.getItem(localStorageKey);
          if (listFromLocalStorage) {
            setHolidays(JSON.parse(listFromLocalStorage));
          }
        });
    }
  }, [location]);

  const getHolidayList = async (countryCode: string) => {
    const response = await axios.get(`holiday/get-holiday-list/${countryCode}/tttt`);
    return response.data;
  };

  const renderHolidayList = () => {
    const nearestHoliday = getNearestHoliday(holidayList);

    return holidayList.map((holiday: holidayObjectType) => {
      const workingDay = getWorkingDay(dayjs(holiday.date).day());
      const isNearestHoliday = holiday.date === nearestHoliday?.date;
      return (
        <Box
          key={holiday.name}
          sx={isNearestHoliday ? { fontWeight: "bold" } : {}}
        >{`${dayjs(holiday.date).format("MMM DD")} ${workingDay} - ${holiday.name}`}</Box>
      );
    });
  };

  return (
    <Box
      className={`visible-header-detail ${isOpen || "hidden-header-detail"}`}
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.7)",
        borderRadius: "20px",
        position: "absolute",
        top: "0px",
        left: "1rem",
        maxWidth: "30rem",
        zIndex: 99,
      }}
    >
      <div className="typography">{renderHolidayList()}</div>
    </Box>
  );
};
