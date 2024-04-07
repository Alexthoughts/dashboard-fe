import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Rate } from "./types/types";

const selectStyle = {
  color: "rgba(955, 555, 9, 0.8)",
  "&::before": {
    borderColor: "rgba(955, 555, 9, 0.8)",
  },
  "&::after": {
    borderColor: "rgba(255, 214, 0, 0.8)",
  },
  "&.Mui-focused": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
  },
  "&:not(.Mui-disabled):hover::before": {
    borderColor: "rgba(955, 555, 9, 0.8)",
  },
  ".MuiSvgIcon-root ": {
    fill: "rgba(255, 255, 255, 0.8) !important",
  },
};

const inputLabelStyle = {
  color: "rgba(255, 255, 255, 0.8)",
  "&.Mui-focused": {
    color: "rgba(255, 255, 255, 0.8)",
  },
};

type ExchangesDetailType = {
  isOpen: boolean;
  onChange: (exhangesRatesList: Rate[]) => void;
};

type currencyType = {
  symbol: string;
  name: string;
};

export const ExchangesDetail: FC<ExchangesDetailType> = ({ isOpen, onChange }) => {
  const localStorageKey = "Exchange rates";
  const localStorageKeyCurrencies = "List of currencies";
  const [currency1, setCurrency1] = useState<string>("");
  const [currency2, setCurrency2] = useState<string>("");
  const [rates, setRates] = useState<Rate[]>([]);
  const [currenciesList, setCurrenciesList] = useState<currencyType[]>([]);

  useEffect(() => {
    if (isOpen) {
      apiCallGetCurrenciesList()
        .then((currenciesList) => {
          setCurrenciesList(currenciesList);
          localStorage.setItem(localStorageKeyCurrencies, JSON.stringify(currenciesList));
        })
        .catch(() => {
          const currenciesListFromLocalStorage = localStorage.getItem(
            localStorageKeyCurrencies
          );
          if (currenciesListFromLocalStorage) {
            setCurrenciesList(JSON.parse(currenciesListFromLocalStorage));
          }
        });
    }
  }, [isOpen === true]);

  useEffect(() => {
    onChange(rates);
  }, [JSON.stringify(rates)]);

  //get data from local storage and update exchange rates
  const getAndSaveNewRates = async (ratesFromLocalStorage: Rate[]) => {
    try {
      let rates: Rate[] = [];
      for (const rate of ratesFromLocalStorage) {
        const newRates = await getExchangeRate(rate.from, rate.to);
        if (newRates) {
          rates = [...rates, ...newRates];
          saveRates(rates);
        }
      }
    } catch {
      if (ratesFromLocalStorage && ratesFromLocalStorage.length > 0) {
        saveRates(ratesFromLocalStorage);
      }
    }
  };

  useEffect(() => {
    const arrayOfRates = localStorage.getItem(localStorageKey);
    if (arrayOfRates) {
      const ratesFromLocalStorage = JSON.parse(arrayOfRates);
      getAndSaveNewRates(ratesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (currency1 && currency2) {
      getExchangeRate(currency1, currency2).then((rates) => {
        if (rates) {
          saveRates(rates);
        }
      });
      setCurrency1("");
      setCurrency2("");
    }
  }, [currency1, currency2]);

  const apiCallGetExchanges = async (cur1: string, cur2: string) => {
    const response = await axios.request({
      method: "GET",
      url: "https://currency-converter18.p.rapidapi.com/api/v1/convert",
      params: {
        from: cur1,
        to: cur2,
        amount: "1",
      },
      headers: {
        "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
        "X-RapidAPI-Host": "currency-converter18.p.rapidapi.com",
      },
    });
    return response.data;
  };

  const apiCallGetCurrenciesList = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies",
        headers: {
          "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
          "X-RapidAPI-Host": "currency-converter18.p.rapidapi.com",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  };

  const getExchangeRate = async (cur1: string, cur2: string) => {
    if (!rates) return;
    const rateId = `${cur1}/${cur2}`;
    const isRateExist = rates.some((rate: Rate) => rate.id === rateId);
    if (isRateExist) return [];

    try {
      const response = await apiCallGetExchanges(cur1, cur2);
      let ratesArray: Rate[];
      if (rates.length === 4) {
        const slicedArray = rates.slice(0, -1);
        ratesArray = [...slicedArray, { ...response.result, id: rateId }];
      } else {
        ratesArray = [...rates, { ...response.result, id: rateId }];
      }

      return ratesArray;
    } catch (error) {
      console.error("Failed to fetch exchanges: " + error);
      throw new Error();
    }
  };

  const handleCurrencyOneChange = (event: SelectChangeEvent) => {
    setCurrency1(event.target.value.toUpperCase());
  };

  const handleCurrencyTwoChange = (event: SelectChangeEvent) => {
    setCurrency2(event.target.value.toUpperCase());
  };

  const handleDeleteRate = (rateId: string) => {
    const filteredArray = rates.filter((rate: Rate) => rate.id !== rateId);
    setRates(filteredArray);
    saveToLocalStorage(filteredArray);
  };

  const saveToLocalStorage = (array: Rate[]) => {
    if (!array || array.length === 0) return;
    const savedArray = [...array];
    console.log(...savedArray);
    localStorage.setItem(localStorageKey, JSON.stringify(savedArray));
  };

  const saveRates = (ratesArray: Rate[]) => {
    setRates(ratesArray);
    saveToLocalStorage(ratesArray);
  };

  const renderExchangeRate = rates?.map((rate: Rate) => {
    if (rate) {
      const amount = rate.convertedAmount.toFixed(2);
      return (
        <Box sx={{ display: "flex", alignContent: "center" }} key={rate.id}>
          <Typography>{`${rate.from}/${rate.to} = ${amount}`}</Typography>
          <ClearIcon
            className="exchanges-clear-icon pointer"
            sx={{ width: "1rem", position: "absolute", right: "2px" }}
            onClick={() => handleDeleteRate(rate.id)}
          />
        </Box>
      );
    }
  });

  const renderCurrenciesList = currenciesList?.map((currency, index) => {
    return (
      <MenuItem key={`${currency.symbol}${index}`} value={currency.symbol}>
        {currency.name}
      </MenuItem>
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
        right: {
          xl: "calc(-100% + 1rem)",
          lg: "calc(-100% + 1rem)",
          md: "1rem",
          sm: "1rem",
          xs: "1rem",
        },
        maxWidth: "30rem",
        pl: 3,
        pr: 3,
        pb: 2,
        zIndex: 99,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 2,
        }}
      >
        {/* CURRENCY 1 */}
        <Box>
          <FormControl
            variant="standard"
            sx={{
              m: 1,
              minWidth: 120,
            }}
          >
            <InputLabel id="select-currency-1-label" sx={inputLabelStyle}>
              Currency
            </InputLabel>
            <Select
              labelId="select-currency-1-label"
              id="select-currency-1"
              value={currency1}
              onChange={handleCurrencyOneChange}
              label="Currency 1"
              sx={selectStyle}
            >
              {renderCurrenciesList}
            </Select>
          </FormControl>
        </Box>
        {/* CURRENCY 2 */}
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-currency-2-label" sx={inputLabelStyle}>
              Currency
            </InputLabel>
            <Select
              labelId="select-currency-2-label"
              id="select-currency-2"
              value={currency2}
              onChange={handleCurrencyTwoChange}
              label="Currency 2"
              sx={selectStyle}
            >
              {renderCurrenciesList}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* LIST */}
      <Box sx={{ display: "flex", gap: 5 }}>
        {/* LEFT SIDE */}
        <Box sx={{ position: "relative", pr: 4 }}>
          {rates && renderExchangeRate?.[0]}
          {rates && renderExchangeRate?.[1]}
        </Box>
        {/* RIGHT SIDE */}
        <Box sx={{ position: "relative", pr: 4 }}>
          {rates && renderExchangeRate?.[2]}
          {rates && renderExchangeRate?.[3]}
        </Box>
      </Box>
    </Box>
  );
};
