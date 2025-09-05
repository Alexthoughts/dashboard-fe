import { Box } from "@mui/material";
import { FC } from "react";
import { Rate } from "../types/types";
import { Holiday } from "./Holidays/Holiday";
import { Exchanges } from "./Exchanges/Exchanges";

type HeaderProps = {
  onChange: () => void;
  onChangeExchange: () => void;
  holidayList: [];
  exchangesRates: Rate[];
  isOpenHolidayList: boolean;
  isOpenExchangesDetail: boolean;
};

export const Header: FC<HeaderProps> = ({
  holidayList,
  exchangesRates,
  onChange,
  onChangeExchange,
  isOpenExchangesDetail,
  isOpenHolidayList,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 1), rgba(61, 60, 60, 0.26))",
        color: "rgba(255, 255, 255, 0.8)",
        p: 1,
        px: 3,
      }}
    >
      <Holiday
        holidayList={holidayList}
        onChange={onChange}
        isOpenHolidayList={isOpenHolidayList}
      />
      <Exchanges
        onChangeExchange={onChangeExchange}
        isOpenExchangesDetail={isOpenExchangesDetail}
        exchangesRates={exchangesRates}
      />
    </Box>
  );
};
