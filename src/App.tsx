import { Box } from "@mui/material";
import { Header } from "./components/Header";
import { DateTime } from "./components/DateTime";
import { Circles } from "./components/Circles";
import { Detail } from "./components/Detail";
import { useState } from "react";
import { CircleNames, Rate } from "./types/types";
import MainBackground from "./components/Background";
import { HolidayList } from "./components/Holidays/HolidayList";
import { ExchangesDetail } from "./components/Exchanges/ExchangesDetail";

function App() {
  const [isOpenHolidayList, setIsOpenHolidayList] = useState<boolean>(false);
  const [isOpenExchangesDetail, setIsOpenExchangesDetail] = useState<boolean>(false);
  const [holidayList, setHolidayList] = useState<[]>([]);
  const [exchangesRates, setExchangesRates] = useState<Rate[]>([]);
  const [circleName, setCircleName] = useState<CircleNames | null>(null);
  const [recipeImage, setRecipeImage] = useState<string>("");
  const [weather, setWeather] = useState<[]>();

  const setHolidays = (holidays: []) => {
    setHolidayList(holidays);
  };

  const getExchangesRates = (exchangesList: Rate[]) => {
    setExchangesRates(exchangesList);
  };

  const handleHolidayList = () => {
    setIsOpenHolidayList(!isOpenHolidayList);
  };

  const handleExchangeDetail = () => {
    setIsOpenExchangesDetail(!isOpenExchangesDetail);
  };

  const onCircleClick = (circleName: CircleNames) => {
    setCircleName(circleName);
  };

  const onChangeRecipeImage = (image: string) => {
    setRecipeImage(image);
  };

  const onChangeWeather = (weather: []) => {
    setWeather(weather);
  };

  return (
    <MainBackground>
      <Header
        holidayList={holidayList}
        exchangesRates={exchangesRates}
        onChange={handleHolidayList}
        onChangeExchange={handleExchangeDetail}
        isOpenExchangesDetail={isOpenExchangesDetail}
        isOpenHolidayList={isOpenHolidayList}
      />
      {/* BODY */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          },
        }}
        className={"light-grey"}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            position: "relative",
            width: { xl: "50%", lg: "50%", md: "100%", sm: "100%", xs: "100%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: {
              xl: "baseline",
              lg: "baseline",
              md: "center",
              sm: "center",
              xs: "center",
            },
            px: 2,
          }}
        >
          <HolidayList
            setHolidays={setHolidays}
            isOpen={isOpenHolidayList}
            holidayList={holidayList}
          />
          <ExchangesDetail isOpen={isOpenExchangesDetail} onChange={getExchangesRates} />
          <DateTime holidayList={holidayList} />
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            width: { xl: "50%", lg: "50%", md: "100%", sm: "100%", xs: "100%" },
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* CIRCLES & DETAIL */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "90%",
              marginTop: "10%",
            }}
          >
            <Circles
              onClick={onCircleClick}
              recipeImage={recipeImage}
              weather={weather}
            />
            <Detail
              detailName={circleName}
              onClose={() => setCircleName(null)}
              onChangeRecipeImage={onChangeRecipeImage}
              isOpenExchangesDetail={isOpenExchangesDetail}
              isOpenHolidayList={isOpenHolidayList}
              onChangeWeather={onChangeWeather}
            />
          </Box>
        </Box>
      </Box>
    </MainBackground>
  );
}

export default App;
