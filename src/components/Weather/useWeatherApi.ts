import useLocation from '../../hooks/useLocation';
import axiosInstance from '../../api/axios';
import { useContext } from 'react';
import { WeatherContext } from './WeatherContext';

const useWeatherApi = () => {
    const { fetchLocation } = useLocation();
    const { setIsPendingWeather } = useContext(WeatherContext);

    const getWeatherApiCall = async () => {
        try {
            setIsPendingWeather(true);
            const { latitude, longitude } = await fetchLocation();
            const response = await axiosInstance.get('weather/get-weather', {
                params: {
                    lat: latitude,
                    lon: longitude,
                },
            });
            return response.data.data;
        } catch (error) {
            throw new Error('Failed to fetch weather data: ' + error);
        } finally {
            setIsPendingWeather(false);
        }
    };

    return { getWeatherApiCall };
};

export default useWeatherApi;
