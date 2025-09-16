import { createContext, ReactNode, useState } from 'react';

type WeatherContextType = {
    weather: any;
    setWeather: (weather: []) => void;
};

export const WeatherContext = createContext<WeatherContextType>({
    weather: [],
    setWeather: () => {},
});

const WeatherContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [weather, setWeather] = useState<any>(undefined);

    return (
        <WeatherContext.Provider
            value={{
                weather,
                setWeather,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherContextProvider;
