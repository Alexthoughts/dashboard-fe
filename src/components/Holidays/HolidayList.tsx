import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useContext, useEffect } from 'react';
import { holidayObjectType } from '../../types/types';
import { getNearestHoliday, getWorkingDay } from './reusableFunctions';
import useLocation from '../../hooks/useLocation';
import axiosInstance from '../../api/axios';
import { HolidaysContext } from './HolidaysContext';

type HolidayListProps = {};

export const HolidayList: FC<HolidayListProps> = ({}) => {
    const { fetchLocation } = useLocation();
    const { holidayList, setHolidayList, isOpenHolidayList } = useContext(HolidaysContext);

    useEffect(() => {
        fetchHolidayList();
    }, []);

    const fetchHolidayList = async () => {
        const { country_code2 } = await fetchLocation();
        const holidayListResponse = await getHolidayList(country_code2);
        setHolidayList(holidayListResponse);
    };

    const getHolidayList = async (countryCode: string) => {
        const response = await axiosInstance.get(`holiday/get-holiday-list/${countryCode}`);
        return response.data.data;
    };

    const renderHolidayList = () => {
        const nearestHoliday = getNearestHoliday(holidayList);

        return holidayList.map((holiday: holidayObjectType) => {
            const workingDay = getWorkingDay(dayjs(holiday.date).day());
            const isNearestHoliday = holiday.date === nearestHoliday?.date;
            return (
                <Box
                    key={holiday.name}
                    sx={isNearestHoliday ? { fontWeight: 'bold' } : {}}
                >{`${dayjs(holiday.date).format('MMM DD')} ${workingDay} - ${holiday.name}`}</Box>
            );
        });
    };

    return (
        <Box
            className={`visible-header-detail ${isOpenHolidayList || 'hidden-header-detail'}`}
            sx={{
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '20px',
                position: 'absolute',
                top: '0px',
                left: '1rem',
                maxWidth: '30rem',
                zIndex: 99,
            }}
        >
            <div className="typography">{renderHolidayList()}</div>
        </Box>
    );
};
