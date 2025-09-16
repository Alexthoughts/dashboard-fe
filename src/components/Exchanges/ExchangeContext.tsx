import { createContext, ReactNode, useState } from 'react';
import { Rate } from '../../types/types';

type ExchangeContextType = {
    exhangesRatesList: Rate[];
    setExhangesRatesList: (rates: Rate[]) => void;
    isUpdated?: boolean;
    setIsUpdated: (isUpdated?: boolean) => void;
    isOpenExchangesDetail: boolean;
    setIsOpenExchangesDetail: (isOpen: boolean) => void;
};

export const ExchangeContext = createContext<ExchangeContextType>({
    exhangesRatesList: [],
    setExhangesRatesList: () => {},
    isUpdated: undefined,
    setIsUpdated: () => {},
    isOpenExchangesDetail: false,
    setIsOpenExchangesDetail: () => {},
});

const ExchangeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [exhangesRatesList, setExhangesRatesList] = useState<Rate[]>([]);
    const [isUpdated, setIsUpdated] = useState<boolean | undefined>(undefined);
    const [isOpenExchangesDetail, setIsOpenExchangesDetail] = useState<boolean>(false);

    return (
        <ExchangeContext.Provider
            value={{
                exhangesRatesList,
                setExhangesRatesList,
                isUpdated,
                setIsUpdated,
                isOpenExchangesDetail,
                setIsOpenExchangesDetail,
            }}
        >
            {children}
        </ExchangeContext.Provider>
    );
};

export default ExchangeProvider;
