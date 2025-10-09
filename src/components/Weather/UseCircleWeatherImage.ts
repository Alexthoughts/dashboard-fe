const UseCircleWeatherImage = () => {
    const getWeatherBg = (weather: any) => {
        const weatherIconText = weather.current.icon.toLowerCase();
        const isDay = weather.current.isDay;

        if (isDay) {
            if (weatherIconText.includes('116') || weatherIconText.includes('119')) {
                return `/images/weather/sun-and-clouds-day-116.webp`;
            }
            if (weatherIconText.includes('176')) {
                return `/images/weather/sun-and-rain-day-176.webp`;
            }
            if (weatherIconText.includes('113')) {
                return `/images/weather/sun-day-113.webp`;
            }
            if (weatherIconText.includes('122')) {
                return `/images/weather/clouds-day-122.webp`;
            }
            if (weatherIconText.includes('143')) {
                return `/images/weather/fog-day-143.webp`;
            }
            if (weatherIconText.includes('326')) {
                return `/images/weather/light-snowfall-day-326.webp`;
            }
            if (weatherIconText.includes('266')) {
                return `/images/weather/rain-day-266.webp`;
            }
            if (weatherIconText.includes('296')) {
                return `/images/weather/light-rain-day-296.webp`;
            }
            if (weatherIconText.includes('338')) {
                return `/images/weather/snowfall-day-338.webp`;
            }
        }

        if (!isDay) {
            if (weatherIconText.includes('116') || weatherIconText.includes('119')) {
                return `/images/weather/clear-and-clouds-night-116.webp`;
            }
            if (weatherIconText.includes('176')) {
                return `/images/weather/clear-and-rain-night-176.webp`;
            }
            if (weatherIconText.includes('113')) {
                return `/images/weather/clear-night-113.webp`;
            }
            if (weatherIconText.includes('122')) {
                return `/images/weather/clouds-night-122.webp`;
            }
            if (weatherIconText.includes('143')) {
                return `/images/weather/fog-night-143.webp`;
            }
            if (weatherIconText.includes('326')) {
                return `/images/weather/light-snowfall-night-326.webp`;
            }
            if (weatherIconText.includes('266')) {
                return `/images/weather/rain-night-266.webp`;
            }
            if (weatherIconText.includes('296')) {
                return `/images/weather/light-rain-night-296.webp`;
            }
            if (weatherIconText.includes('338')) {
                return `/images/weather/snowfall-night-338.webp`;
            }
        }
    };

    return { getWeatherBg };
};

export default UseCircleWeatherImage;
