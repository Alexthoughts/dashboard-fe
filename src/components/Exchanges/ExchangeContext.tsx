import { createContext, ReactNode, useState } from 'react';
import { Rate } from '../../types/types';

type ExchangeContextType = {
    exhangesRatesList: Rate[];
    setExhangesRatesList: (rates: Rate[]) => void;
    isUpdated?: boolean;
    setIsUpdated: (isUpdated?: boolean) => void;
    isOpenExchangesDetail: boolean;
    setIsOpenExchangesDetail: (isOpen: boolean) => void;
    isGetSavedRatesPending: boolean;
    setIsGetSavedRatesPending: (isPending: boolean) => void;
    isGetCurrenciesListPending: boolean;
    setIsGetCurrenciesListPending: (isPending: boolean) => void;
};

export const ExchangeContext = createContext<ExchangeContextType>({
    exhangesRatesList: [],
    setExhangesRatesList: () => {},
    isUpdated: undefined,
    setIsUpdated: () => {},
    isOpenExchangesDetail: false,
    setIsOpenExchangesDetail: () => {},
    isGetSavedRatesPending: true,
    setIsGetSavedRatesPending: () => {},
    isGetCurrenciesListPending: true,
    setIsGetCurrenciesListPending: () => {},
});

const ExchangeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [exhangesRatesList, setExhangesRatesList] = useState<Rate[]>([]);
    const [isUpdated, setIsUpdated] = useState<boolean | undefined>(undefined);
    const [isOpenExchangesDetail, setIsOpenExchangesDetail] = useState<boolean>(false);
    const [isGetSavedRatesPending, setIsGetSavedRatesPending] = useState<boolean>(true);
    const [isGetCurrenciesListPending, setIsGetCurrenciesListPending] = useState<boolean>(true);

    return (
        <ExchangeContext.Provider
            value={{
                exhangesRatesList,
                setExhangesRatesList,
                isUpdated,
                setIsUpdated,
                isOpenExchangesDetail,
                setIsOpenExchangesDetail,
                isGetSavedRatesPending,
                setIsGetSavedRatesPending,
                isGetCurrenciesListPending,
                setIsGetCurrenciesListPending,
            }}
        >
            {children}
        </ExchangeContext.Provider>
    );
};

export default ExchangeProvider;
