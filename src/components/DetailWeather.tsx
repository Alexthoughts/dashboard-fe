import { Box, Typography } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";

type DetailWeatherProps = {
  className: string;
  onChangeWeather: (wheather: any) => void;
};

export const DetailWeather: FC<DetailWeatherProps> = ({ className, onChangeWeather }) => {
  const [weather, setWeather] = useState<any>();
  const { location } = useLocation();
  const localStorageKey = "Weather";

  useEffect(() => {
    getWeatherFromLocalStorage();
    const fetchWheather = async () => {
      if (!location) return;
      try {
        const { lat, lon } = location;
        const weather = await getWeatherApiCall(lat, lon);
        const aqi = await getAQIApiCall(lat, lon);
        if ((weather && aqi) || weather) {
          const aqiAndWeather = aqi ? { ...weather, aqi } : { ...weather };
          onChangeWeather(aqiAndWeather);
          setWeather(aqiAndWeather);
          localStorage.setItem(localStorageKey, JSON.stringify(aqiAndWeather));
        }
      } catch (error) {
        console.error(error);
        getWeatherFromLocalStorage();
      }
    };
    fetchWheather();
  }, [location]);

  const getWeatherFromLocalStorage = () => {
    const weatherFromLocalStorage = localStorage.getItem(localStorageKey);
    if (weatherFromLocalStorage) {
      setWeather(JSON.parse(weatherFromLocalStorage));
      onChangeWeather(JSON.parse(weatherFromLocalStorage));
    }
  };

  const getWeatherApiCall = async (latitude: number, longitude: number) => {
    const response = await axios.request({
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: {
        q: `${latitude},${longitude}`,
        days: "2",
      },
      headers: {
        "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    });
    return response.data;
  };

  const getAQIApiCall = async (latitude: number, longitude: number) => {
    const response = await axios.request({
      method: "GET",
      url: "https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality",
      params: { lat: latitude, lon: longitude },
      headers: {
        "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
        "X-RapidAPI-Host": "air-quality-by-api-ninjas.p.rapidapi.com",
      },
    });
    return response.data;
  };
  if (!weather) {
    return <></>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        overflowY: "auto",
      }}
      className={className}
    >
      <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
        <Typography
          variant="h4"
          sx={{
            maxWidth: "65%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "7.2rem",
            lineHeight: "2.4rem",
          }}
        >
          {weather.location.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={weather.current.condition.icon} alt="current-weather-icon" />
          <Typography variant="h4">{`${weather.current.temp_c}°`}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: { md: "5rem", sm: "2rem" },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography>{`Feels like: ${weather.current.feelslike_c}°`}</Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography>{`Max: ${weather.forecast.forecastday[0].day.maxtemp_c}°`}</Typography>
            <Typography>{`Min: ${weather.forecast.forecastday[0].day.mintemp_c}°`}</Typography>
          </Box>
          <Typography>{`Wind: ${weather.current.wind_kph} kph - ${weather.current.wind_dir}`}</Typography>
          <Typography>
            {`Chance of rain: ${
              weather.forecast.forecastday[0].day.daily_chance_of_rain ||
              weather.forecast.forecastday[0].day.daily_chance_of_snow
            }%, ${
              weather.forecast.forecastday[0].day.totalprecip_mm ||
              weather.forecast.forecastday[0].day.totalsnow_cm
            }`}
          </Typography>
          <Typography>
            {`Day length: ${weather.forecast.forecastday[0].astro.sunrise} - ${weather.forecast.forecastday[0].astro.sunset}`}
          </Typography>
          {weather.hasOwnProperty("aqi") && (
            <Typography>{`Air quality: ${weather.aqi.overall_aqi}`}</Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Tomorrow</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={weather.forecast.forecastday[1].day.condition.icon}
              alt="current-weather-icon"
            />
            <Typography variant="h5">{`${Math.round(
              weather.forecast.forecastday[1].day.mintemp_c
            )}°/${Math.round(
              weather.forecast.forecastday[1].day.maxtemp_c
            )}°`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
