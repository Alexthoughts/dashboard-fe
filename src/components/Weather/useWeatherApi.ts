import useLocation from '../../hooks/useLocation';
import axiosInstance from '../../api/axios';

const useWeatherApi = () => {
    const { fetchLocation } = useLocation();

    const getWeatherApiCall = async () => {
        try {
            const { latitude, longitude } = await fetchLocation();
            const response = await axiosInstance.get('weather/get-weather/ttt', {
                params: {
                    lat: latitude,
                    lon: longitude,
                },
            });
            return response.data.data;
        } catch (error) {
            throw new Error('Failed to fetch weather data: ' + error);
        }
    };

    return { getWeatherApiCall };
};

export default useWeatherApi;
