import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { CircleNames } from "../types/types";

type CirclesType = {
  onClick: (circleName: CircleNames) => void;
  recipeImage: string;
  weather: any;
};

export const Circles: FC<CirclesType> = ({ onClick, recipeImage, weather }) => {
  const [weatherImage, setWeatherImage] = useState<string | undefined>();

  const handleCircleClick = (circleName: CircleNames) => {
    onClick(circleName);
  };

  const getRandomInt = (max = 3) => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    if (weather) {
      const image = getWeatherBg();
      setWeatherImage(image);
    }
  }, [weather]);

  const getWeatherBg = () => {
    if (!weather) return;

    const conditionText = weather.current.condition.text.toLowerCase();
    const isDay = weather.current.is_day; //0 or 1

    if (!isDay) {
      if (conditionText.includes("clear")) {
        return `/images/weather/clear-night-${getRandomInt()}.webp`;
      }
      if (conditionText.includes("cloudy") || conditionText.includes("overcast")) {
        return `/images/weather/cloudy-night-${getRandomInt()}.webp`;
      }
      if (conditionText.includes("rain") || conditionText.includes("drizzle")) {
        return `/images/weather/rain-night-${getRandomInt()}.webp`;
      }

      return "/images/weather/clear-night-1.jpg";
    }

    if (isDay) {
      if (conditionText.includes("clear")) {
        return `/images/weather/clear-day-${getRandomInt()}.webp`;
      }
      if (conditionText.includes("sunny")) {
        return `/images/weather/sunny-day-${getRandomInt()}.webp`;
      }
      if (conditionText.includes("cloudy") || conditionText.includes("overcast")) {
        return `/images/weather/cloudy-day-${getRandomInt()}.webp`;
      }
      if (conditionText.includes("rain") || conditionText.includes("drizzle")) {
        return `/images/weather/rain-day-${getRandomInt()}.webp`;
      }

      return "/images/weather/sunny-day-2.webp";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: { xl: 15, lg: 10, md: 15, sm: 5, xs: 5 },
      }}
    >
      {/* NOTES */}
      <div className="black-circle">
        <div
          className="circle-icon notes-icon"
          onClick={() => handleCircleClick("notes")}
        />
      </div>
      {/* RECEIPT */}
      <div className="black-circle">
        <div
          className="circle-icon receipe-icon"
          style={{ backgroundImage: `url(${recipeImage})` }}
          onClick={() => handleCircleClick("receipe")}
        />
      </div>
      {/* WEATHER */}
      {weather && weatherImage && (
        <div
          className="circle-weather"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.0)), url(${weatherImage})`,
          }}
          onClick={() => handleCircleClick("weather")}
        >
          <Box sx={{ display: "flex", gap: 1, maxWidth: "13rem" }}>
            <Typography
              sx={{
                height: "2rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {weather ? weather.location.name : ""}
            </Typography>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {`${weather.current.temp_c}°` || ""}
            </Typography>
          </Box>
          {weather.hasOwnProperty("aqi") && (
            <Typography>{`AQI: ${weather.aqi.overall_aqi}`}</Typography>
          )}
        </div>
      )}
    </Box>
  );
};
