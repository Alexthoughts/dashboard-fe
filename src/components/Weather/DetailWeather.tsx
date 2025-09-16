import { Box, Stack, Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import useWeatherApi from './useWeatherApi';
import { WeatherContext } from './WeatherContext';

type DetailWeatherProps = {
    className: string;
};

export const DetailWeather: FC<DetailWeatherProps> = ({ className }) => {
    const { getWeatherApiCall } = useWeatherApi();
    const { weather, setWeather } = useContext(WeatherContext);

    useEffect(() => {
        fetchWheather();
    }, []);

    const fetchWheather = async () => {
        const weather = await getWeatherApiCall();
        if (weather) {
            setWeather(weather);
        }
    };

    if (!weather) {
        return <></>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: '100%',
                overflowY: 'auto',
            }}
            className={className}
        >
            <Stack direction="row" spacing={5} alignItems="center">
                <Typography
                    variant="h4"
                    sx={{
                        maxWidth: '65%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxHeight: '7.2rem',
                        lineHeight: '2.4rem',
                    }}
                >
                    {weather.region}
                </Typography>
                <Stack spacing={1} direction="row" alignItems="center">
                    <img src={weather.current.icon} alt="current-weather-icon" />
                    <Typography variant="h5">{`${Math.round(
                        weather.current.minTemperature,
                    )}°/${Math.round(weather.current.maxTemperature)}°`}</Typography>
                </Stack>
            </Stack>

            {/* MAIN PART WITH DETAIL DIVIDED ON LEFT AND RIGHT SIDE */}
            <Stack
                justifyContent="space-between"
                direction="row"
                sx={{
                    mr: { md: '5rem', sm: '2rem' },
                }}
            >
                {/* LEFT SIDE */}
                <Stack spacing={8}>
                    {/* CURRENT WEATHER INFO */}
                    <Stack spacing={2}>
                        <Typography>{`Feels like: ${Math.round(weather.current.feelsLike)}°`}</Typography>
                        <Typography>{`Wind: ${weather.current.windKph}kph, ${weather.current.windDirection}`}</Typography>
                    </Stack>

                    {/* TOMORROW WEATHER INFO */}
                    <Stack spacing={2}>
                        <Stack>
                            <Typography variant="h5">Tomorrow</Typography>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <img src={weather.forecast[0].icon} alt="tomorrow-weather-icon" />
                                <Typography variant="h5">{`${Math.round(
                                    weather.forecast[0].minTemperature,
                                )}°/${Math.round(weather.forecast[0].maxTemperature)}°`}</Typography>
                            </Stack>
                        </Stack>
                        <Typography>
                            {`Chance of rain: ${
                                weather.forecast[0].dailyChanceOfRain
                            }%, ${weather.forecast[0].totalPrecipitationMm}mm`}
                        </Typography>
                        {weather.forecast[0].dailyChanceOfSnow > 0 && (
                            <Typography>
                                {`Chance of snow: ${
                                    weather.forecast[0].dailyChanceOfSnow
                                }%, ${weather.forecast[0].totalSnowCm}cm`}
                            </Typography>
                        )}
                    </Stack>
                </Stack>

                {/* RIGHT SIDE */}
                <Stack spacing={8}>
                    {/* CURRENT WEATHER INFO */}
                    <Stack spacing={2}>
                        {weather.current.dailyChanceOfSnow > 0 ? (
                            <Typography>
                                {`Chance of snow: ${
                                    weather.current.dailyChanceOfSnow
                                }%, ${weather.current.totalSnowCm}cm`}
                            </Typography>
                        ) : (
                            <Typography>
                                {`Chance of rain: ${
                                    weather.current.dailyChanceOfRain
                                }%, ${weather.current.totalPrecipitationMm}mm`}
                            </Typography>
                        )}

                        <Typography>{`Pressure: ${weather.current.pressureMb}mb`}</Typography>
                    </Stack>

                    {/* DAY AFTER WEATHER INFO */}
                    <Stack spacing={2}>
                        <Stack>
                            <Typography variant="h5">Day after</Typography>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <img src={weather.forecast[1].icon} alt="day-after-weather-icon" />
                                <Typography variant="h5">{`${Math.round(
                                    weather.forecast[1].minTemperature,
                                )}°/${Math.round(weather.forecast[1].maxTemperature)}°`}</Typography>
                            </Stack>
                        </Stack>
                        <Typography>
                            {`Chance of rain: ${
                                weather.forecast[1].dailyChanceOfRain
                            }%, ${weather.forecast[1].totalPrecipitationMm}mm`}
                        </Typography>
                        {weather.forecast[1].dailyChanceOfSnow > 0 && (
                            <Typography>
                                {`Chance of snow: ${
                                    weather.forecast[1].dailyChanceOfSnow
                                }%, ${weather.forecast[1].totalSnowCm}cm`}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
};
