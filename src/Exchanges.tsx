import { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowDown";
import { Rate } from "./types/types";

type ExchangesType = {
  onChangeExchange: any;
  isOpenExchangesDetail: boolean;
  exchangesRates: Rate[];
};

export const Exchanges: FC<ExchangesType> = ({
  onChangeExchange,
  isOpenExchangesDetail,
  exchangesRates,
}) => {
  const [exchangeRates, setExchangeRates] = useState<Rate[]>([]);

  useEffect(() => {
    if (exchangesRates?.length === 4) {
      const slicedArray = exchangesRates.slice(0, -1);
      setExchangeRates(slicedArray);
    } else {
      setExchangeRates(exchangesRates);
    }
  }, [JSON.stringify(exchangesRates)]);

  const handleClickAction = () => {
    onChangeExchange();
  };

  const renderedExchangeRates = exchangeRates?.map((rate) => {
    return (
      <Typography key={rate.id}>{`${rate.from}/${
        rate.to
      } = ${rate.convertedAmount.toFixed(2)}`}</Typography>
    );
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
      {renderedExchangeRates?.length > 0 ? renderedExchangeRates : <p>Exchanges</p>}
      <KeyboardArrowUpIcon
        className="pointer"
        onClick={handleClickAction}
        style={{
          transition: "transform 0.3s",
          transform: isOpenExchangesDetail ? "rotate(-180deg)" : "rotate(0)",
        }}
      />
    </Box>
  );
};
