import { createContext, ReactNode, useState } from 'react';

type WeatherContextType = {
    weather: any;
    setWeather: (weather: []) => void;
    isPendingWeather: boolean;
    setIsPendingWeather: (isPending: boolean) => void;
};

export const WeatherContext = createContext<WeatherContextType>({
    weather: [],
    setWeather: () => {},
    isPendingWeather: false,
    setIsPendingWeather: () => {},
});

const WeatherContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [weather, setWeather] = useState<any>(undefined);
    const [isPendingWeather, setIsPendingWeather] = useState<boolean>(false);

    return (
        <WeatherContext.Provider
            value={{
                weather,
                setWeather,
                isPendingWeather,
                setIsPendingWeather,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherContextProvider;
