import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import ExchangeContextProvider from './components/Exchanges/ExchangeContext.tsx';
import WeatherContextProvider from './components/Weather/WeatherContext.tsx';
import HolidaysContextProvider from './components/Holidays/HolidaysContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ExchangeContextProvider>
            <WeatherContextProvider>
                <HolidaysContextProvider>
                    <App />
                </HolidaysContextProvider>
            </WeatherContextProvider>
        </ExchangeContextProvider>
    </React.StrictMode>,
);
