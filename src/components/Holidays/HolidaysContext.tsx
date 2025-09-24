import { createContext, ReactNode, useState } from 'react';
import { holidayObjectType } from '../../types/types';

type HolidaysContextType = {
    isOpenHolidayList: boolean;
    setIsOpenHolidayList: (isOpen: boolean) => void;
    holidayList: holidayObjectType[];
    setHolidayList: (holidayObjectType: []) => void;
    isPendingHolidays: boolean;
    setIsPendingHolidays: (isPending: boolean) => void;
};

export const HolidaysContext = createContext<HolidaysContextType>({
    isOpenHolidayList: false,
    setIsOpenHolidayList: () => {},
    holidayList: [],
    setHolidayList: () => {},
    isPendingHolidays: true,
    setIsPendingHolidays: () => {},
});

const HolidaysContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpenHolidayList, setIsOpenHolidayList] = useState<boolean>(false);
    const [holidayList, setHolidayList] = useState<holidayObjectType[]>([]);
    const [isPendingHolidays, setIsPendingHolidays] = useState<boolean>(true);

    return (
        <HolidaysContext.Provider
            value={{
                isOpenHolidayList,
                setIsOpenHolidayList,
                holidayList,
                setHolidayList,
                isPendingHolidays,
                setIsPendingHolidays,
            }}
        >
            {children}
        </HolidaysContext.Provider>
    );
};

export default HolidaysContextProvider;
