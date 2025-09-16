import { createContext, ReactNode, useState } from 'react';
import { holidayObjectType } from '../../types/types';

type HolidaysContextType = {
    isOpenHolidayList: boolean;
    setIsOpenHolidayList: (isOpen: boolean) => void;
    holidayList: holidayObjectType[];
    setHolidayList: (holidayObjectType: []) => void;
};

export const HolidaysContext = createContext<HolidaysContextType>({
    isOpenHolidayList: false,
    setIsOpenHolidayList: () => {},
    holidayList: [],
    setHolidayList: () => {},
});

const HolidaysContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpenHolidayList, setIsOpenHolidayList] = useState<boolean>(false);
    const [holidayList, setHolidayList] = useState<holidayObjectType[]>([]);

    return (
        <HolidaysContext.Provider
            value={{
                isOpenHolidayList,
                setIsOpenHolidayList,
                holidayList,
                setHolidayList,
            }}
        >
            {children}
        </HolidaysContext.Provider>
    );
};

export default HolidaysContextProvider;
