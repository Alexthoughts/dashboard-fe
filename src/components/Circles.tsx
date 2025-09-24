import { Box, CircularProgress, Typography } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { CircleNames } from '../types/types';
import UseCircleWeatherImage from '../components/Weather/UseCircleWeatherImage';
import { WeatherContext } from './Weather/WeatherContext';

type CirclesType = {
    onClick: (circleName: CircleNames) => void;
    recipeImage: string;
};

export const Circles: FC<CirclesType> = ({ onClick, recipeImage }) => {
    const [weatherImage, setWeatherImage] = useState<string>();
    const { getWeatherBg } = UseCircleWeatherImage();
    const { weather, isPendingWeather } = useContext(WeatherContext);

    const handleCircleClick = (circleName: CircleNames) => {
        onClick(circleName);
    };

    useEffect(() => {
        if (weather) {
            const image = getWeatherBg(weather);
            setWeatherImage(image);
        }
    }, [weather]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xl: 15, lg: 10, md: 15, sm: 5, xs: 5 },
            }}
        >
            {/* NOTES */}
            <div className="black-circle">
                <div className="circle-icon notes-icon" onClick={() => handleCircleClick('notes')} />
            </div>

            {/* RECEIPT */}
            <div className="black-circle">
                <div
                    className="circle-icon receipe-icon"
                    style={{ backgroundImage: `url(${recipeImage})` }}
                    onClick={() => handleCircleClick('receipe')}
                />
            </div>

            {/* WEATHER */}
            {isPendingWeather && (
                <div
                    className="circle-weather"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.78),rgba(0, 0, 0, 0.0))`,
                    }}
                    onClick={() => handleCircleClick('weather')}
                >
                    <CircularProgress color="inherit" size="2rem" />
                    <Typography>Loading weather...</Typography>
                </div>
            )}

            {weather && !isPendingWeather && (
                <div
                    className="circle-weather"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.78),rgba(0, 0, 0, 0.0)), url(${weatherImage})`,
                    }}
                    onClick={() => handleCircleClick('weather')}
                >
                    <Box sx={{ display: 'flex', gap: 1, maxWidth: '13rem' }}>
                        <Typography
                            sx={{
                                height: '2rem',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            {weather.city}
                        </Typography>
                        <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {`${Math.round(weather.current.temperature)}°` || ''}
                        </Typography>
                    </Box>
                    {weather.current.aqi && <Typography>{`AQI: ${weather.current.aqi}`}</Typography>}
                </div>
            )}
        </Box>
    );
};
