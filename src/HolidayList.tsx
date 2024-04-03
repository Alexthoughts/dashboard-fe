import { Box } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { holidayObjectType } from "./types/types";

type HolidayListProps = {
  onChange: (holidayList: []) => void;
  isOpen: boolean;
  holidayList: [];
};

export const HolidayList: FC<HolidayListProps> = ({ onChange, isOpen, holidayList }) => {
  const localStorageKey = "Holiday list";
  //GET HOLIDAY LIST
  useEffect(() => {
    getCountryCode()
      .then((countryCode) => getHolidayList(countryCode))
      .then((holidayList) => {
        onChange(holidayList);
        localStorage.setItem(localStorageKey, JSON.stringify(holidayList));
      })
      .catch((error) => {
        console.error("Fetch holiday list error: ", error);
        const listFromLocalStorage = localStorage.getItem(localStorageKey);
        if (listFromLocalStorage) {
          onChange(JSON.parse(listFromLocalStorage));
        }
      });
  }, []);

  const getCountryCode = async () => {
    const response = await axios.get("https://ipapi.co/json");

    return response.data.country_code;
  };

  const getHolidayList = async (countryCode: string) => {
    const currentYear = dayjs().year();
    const response = await axios.get(
      `https://public-holiday.p.rapidapi.com/${currentYear}/${countryCode}`,
      {
        headers: {
          "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
          "X-RapidAPI-Host": "public-holiday.p.rapidapi.com",
        },
      }
    );
    return response.data;
  };

  const renderHolidayList = () =>
    holidayList.map((holiday: holidayObjectType) => {
      return (
        <div key={holiday.name}>{`${dayjs(holiday.date).format("MMM DD")} - ${
          holiday.name
        }`}</div>
      );
    });

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
